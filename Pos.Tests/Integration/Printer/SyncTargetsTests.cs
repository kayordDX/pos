using System.Collections.Concurrent;
using Microsoft.AspNetCore.Http.Connections;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.SignalR.Client;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Pos.Api.Data;
using Pos.Api.DTO;
using Pos.Api.Hubs;

namespace Integration.Printer;

[Collection(nameof(AppCollection))]
public class SyncTargetsTests(App app) : TestBase<App>
{
    // Distinct Firebase uid so the shared ClientAuth user stays non-manager.
    private const string ManagerUid = "printer-sync-targets-test";

    private static readonly SemaphoreSlim SetupLock = new(1, 1);
    private static bool managerReady;
    private static int outletId = -1;

    private HttpClient? _managerClient;

    protected override async ValueTask SetupAsync()
    {
        await EnsureManagerAsync();
        _managerClient ??= await CreateManagerClientAsync();
    }

    private async Task EnsureManagerAsync()
    {
        if (managerReady)
        {
            return;
        }

        await SetupLock.WaitAsync();
        try
        {
            if (managerReady)
            {
                return;
            }

            await using var scope = app.Services.CreateAsyncScope();
            var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            var outlet = await db.Outlet.FirstAsync(app.Context.CancellationToken);
            outletId = outlet.Id;

            if (!await db.UserOutlet.AnyAsync(x => x.UserId == ManagerUid, app.Context.CancellationToken))
            {
                await App.EnsureUserAsync(db, ManagerUid);

                var roleType = await db.RoleType.FirstAsync(x => x.Name == "manager", app.Context.CancellationToken);

                var role = new Pos.Api.Entities.Role
                {
                    Name = "Manager",
                    RoleTypeId = roleType.Id,
                    Description = "test manager",
                    OutletId = outlet.Id,
                };
                db.Role.Add(role);
                await db.SaveChangesAsync(app.Context.CancellationToken);

                db.UserOutlet.Add(
                    new Pos.Api.Entities.UserOutlet
                    {
                        UserId = ManagerUid,
                        OutletId = outlet.Id,
                        IsCurrent = true,
                    }
                );
                db.UserRoleOutlet.Add(
                    new Pos.Api.Entities.UserRoleOutlet
                    {
                        UserId = ManagerUid,
                        OutletId = outlet.Id,
                        RoleId = role.RoleId,
                    }
                );
                await db.SaveChangesAsync(app.Context.CancellationToken);
            }

            managerReady = true;
        }
        finally
        {
            SetupLock.Release();
        }
    }

    private async Task<HttpClient> CreateManagerClientAsync()
    {
        var userService = app.Services.GetRequiredService<Pos.Api.Services.UserService>();
        var token = await userService.GetIdToken(ManagerUid);
        return app.CreateClient(c => c.DefaultRequestHeaders.Authorization = new("Bearer", token.IdToken));
    }

    private async Task<DeviceDTO> CreateDeviceAsync(string name)
    {
        var (rsp, dto) = await _managerClient!.POSTAsync<Pos.Api.Features.Device.Create.Endpoint, Pos.Api.Features.Device.Create.Request, DeviceDTO>(
            new() { Name = name }
        );
        rsp.StatusCode.ShouldBe(HttpStatusCode.OK);
        dto.ShouldNotBeNull();
        return dto;
    }

    private async Task<PrinterDTO> CreatePrinterAsync(int deviceId, string name)
    {
        var (rsp, dto) = await _managerClient!.POSTAsync<Pos.Api.Features.Printer.Create.Endpoint, Pos.Api.Features.Printer.Create.Request, PrinterDTO>(
            new()
            {
                OutletId = outletId,
                DeviceId = deviceId,
                PrinterName = name,
                IPAddress = "10.0.0.61",
                Port = 9100,
                LineCharacters = 64,
            }
        );
        rsp.StatusCode.ShouldBe(HttpStatusCode.OK);
        dto.ShouldNotBeNull();
        return dto;
    }

    private async Task EditPrinterAsync(int printerId, int deviceId, string name, bool isEnabled)
    {
        var rsp = await _managerClient!.PUTAsync<Pos.Api.Features.Printer.Edit.Endpoint, Pos.Api.Features.Printer.Edit.Request>(
            new()
            {
                Id = printerId,
                DeviceId = deviceId,
                PrinterName = name,
                IPAddress = "10.0.0.61",
                Port = 9100,
                LineCharacters = 64,
                IsEnabled = isEnabled,
            }
        );
        rsp.StatusCode.ShouldBe(HttpStatusCode.NoContent);
    }

    private async Task<HubConnection> ConnectDeviceAsync(DeviceDTO device, ConcurrentQueue<List<PrinterTarget>> received)
    {
        var connection = new HubConnectionBuilder()
            .WithUrl(
                new Uri(app.Client.BaseAddress!, "printer-hub"),
                options =>
                {
                    options.AccessTokenProvider = async () => device.FullKey;
                    options.HttpMessageHandlerFactory = _ => app.Server.CreateHandler();
                    options.Transports = HttpTransportType.ServerSentEvents | HttpTransportType.LongPolling;
                }
            )
            .Build();

        connection.On<List<PrinterTarget>>("SyncPrinters", printers =>
        {
            received.Enqueue(printers.ToList());
            return Task.CompletedTask;
        });

        await connection.StartAsync(TestContext.Current.CancellationToken);
        return connection;
    }

    // Polls until any received snapshot satisfies the predicate (the connect
    // sync may race with StartAsync, and pushes race with the edit request).
    private static async Task WaitForSnapshotAsync(ConcurrentQueue<List<PrinterTarget>> received, Func<List<PrinterTarget>, bool> predicate)
    {
        for (int attempt = 0; attempt < 50; attempt++)
        {
            if (received.Any(predicate))
            {
                return;
            }

            await Task.Delay(100, TestContext.Current.CancellationToken);
        }

        throw new TimeoutException("No SyncPrinters snapshot matched the expected state.");
    }

    [Fact]
    public async Task Connect_OnlyReceivesEnabledPrinters()
    {
        var device = await CreateDeviceAsync("Sync Pi");
        var enabled = await CreatePrinterAsync(device.Id, "Sync Enabled");
        var disabled = await CreatePrinterAsync(device.Id, "Sync Disabled");
        await EditPrinterAsync(disabled.Id, device.Id, disabled.PrinterName, isEnabled: false);

        var received = new ConcurrentQueue<List<PrinterTarget>>();
        var connection = await ConnectDeviceAsync(device, received);
        try
        {
            await WaitForSnapshotAsync(received, list => list.Any(x => x.PrinterId == enabled.Id));
            received.All(list => list.All(x => x.PrinterId != disabled.Id)).ShouldBeTrue();
        }
        finally
        {
            await connection.DisposeAsync();
        }
    }

    [Fact]
    public async Task Edit_DisablePrinter_PushesUpdateAndRejectsProbe()
    {
        var device = await CreateDeviceAsync("Sync Disable Pi");
        var printer = await CreatePrinterAsync(device.Id, "Sync Disable Printer");

        var received = new ConcurrentQueue<List<PrinterTarget>>();
        var connection = await ConnectDeviceAsync(device, received);
        try
        {
            await WaitForSnapshotAsync(received, list => list.Any(x => x.PrinterId == printer.Id));

            await EditPrinterAsync(printer.Id, device.Id, printer.PrinterName, isEnabled: false);

            await WaitForSnapshotAsync(received, list => list.All(x => x.PrinterId != printer.Id));

            // The targets set no longer includes the printer, so probes for it
            // must be rejected the same way as unassigned printers.
            await Assert.ThrowsAnyAsync<HubException>(
                () => connection.InvokeAsync("ReportPrinterProbe", printer.Id, true, 12L, TestContext.Current.CancellationToken)
            );
        }
        finally
        {
            await connection.DisposeAsync();
        }
    }

    [Fact]
    public async Task Edit_MovePrinter_PushesToOldAndNewDevice()
    {
        var deviceA = await CreateDeviceAsync("Sync Move Pi A");
        var deviceB = await CreateDeviceAsync("Sync Move Pi B");
        var printer = await CreatePrinterAsync(deviceA.Id, "Sync Move Printer");

        var receivedA = new ConcurrentQueue<List<PrinterTarget>>();
        var connectionA = await ConnectDeviceAsync(deviceA, receivedA);
        var receivedB = new ConcurrentQueue<List<PrinterTarget>>();
        var connectionB = await ConnectDeviceAsync(deviceB, receivedB);
        try
        {
            await WaitForSnapshotAsync(receivedA, list => list.Any(x => x.PrinterId == printer.Id));

            await EditPrinterAsync(printer.Id, deviceB.Id, printer.PrinterName, isEnabled: true);

            await WaitForSnapshotAsync(receivedA, list => list.All(x => x.PrinterId != printer.Id));
            await WaitForSnapshotAsync(receivedB, list => list.Any(x => x.PrinterId == printer.Id));
        }
        finally
        {
            await connectionA.DisposeAsync();
            await connectionB.DisposeAsync();
        }
    }

    [Fact]
    public async Task Delete_Printer_PushesUpdate()
    {
        var device = await CreateDeviceAsync("Sync Delete Pi");
        var printer = await CreatePrinterAsync(device.Id, "Sync Delete Printer");

        var received = new ConcurrentQueue<List<PrinterTarget>>();
        var connection = await ConnectDeviceAsync(device, received);
        try
        {
            await WaitForSnapshotAsync(received, list => list.Any(x => x.PrinterId == printer.Id));

            var rsp = await _managerClient!.DELETEAsync<Pos.Api.Features.Printer.Delete.Endpoint, Pos.Api.Features.Printer.Delete.Request>(
                new() { Id = printer.Id }
            );
            rsp.StatusCode.ShouldBe(HttpStatusCode.NoContent);

            await WaitForSnapshotAsync(received, list => list.All(x => x.PrinterId != printer.Id));
        }
        finally
        {
            await connection.DisposeAsync();
        }
    }
}
