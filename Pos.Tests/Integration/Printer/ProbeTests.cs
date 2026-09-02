using Microsoft.AspNetCore.Http.Connections;
using Microsoft.AspNetCore.SignalR.Client;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Pos.Api.Data;
using Pos.Api.DTO;

namespace Integration.Printer;

[Collection(nameof(AppCollection))]
public class ProbeTests(App app) : TestBase<App>
{
    // Distinct Firebase uid so the shared ClientAuth user stays non-manager.
    private const string ManagerUid = "printer-probe-test";

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

                // The seed migration already provides the "manager" role type;
                // inserting a new one collides with the seeded identity range.
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
                IPAddress = "10.0.0.60",
                Port = 9100,
                LineCharacters = 64,
            }
        );
        rsp.StatusCode.ShouldBe(HttpStatusCode.OK);
        dto.ShouldNotBeNull();
        return dto;
    }

    private async Task<bool> ProbeAsync(int printerId)
    {
        var (rsp, res) = await _managerClient!.POSTAsync<Pos.Api.Features.Printer.Probe.Endpoint, Pos.Api.Features.Printer.Probe.Request, bool>(
            new() { PrinterId = printerId }
        );

        rsp.StatusCode.ShouldBe(HttpStatusCode.OK);
        return res;
    }

    [Fact]
    public async Task Probe_UnknownPrinter_ReturnsFalse()
    {
        (await ProbeAsync(999999)).ShouldBeFalse();
    }

    [Fact]
    public async Task Probe_PrinterOnLiveDevice_ReturnsTrue()
    {
        var device = await CreateDeviceAsync("Probe Pi");
        var printer = await CreatePrinterAsync(device.Id, "Probe Printer");

        // No device is connected over SignalR in tests — the hub send to an
        // empty group still succeeds, so accepted probes report true.
        (await ProbeAsync(printer.Id)).ShouldBeTrue();
    }

    [Fact]
    public async Task Probe_PrinterOnRevokedKeyDevice_ReturnsFalse()
    {
        var device = await CreateDeviceAsync("Revoked Probe Pi");
        var printer = await CreatePrinterAsync(device.Id, "Revoked Probe Printer");

        var revokeRsp = await _managerClient!.POSTAsync<Pos.Api.Features.Device.Key.Revoke.Endpoint, Pos.Api.Features.Device.Key.Revoke.Request>(
            new() { Id = device.Id }
        );
        revokeRsp.StatusCode.ShouldBe(HttpStatusCode.NoContent);

        (await ProbeAsync(printer.Id)).ShouldBeFalse();
    }

    private async Task<List<PrinterDTO>> GetPrinterListAsync()
    {
        var (rsp, list) = await _managerClient!.GETAsync<Pos.Api.Features.Printer.List.Endpoint, Pos.Api.Features.Printer.List.Request, List<PrinterDTO>>(
            new() { OutletId = outletId }
        );
        rsp.StatusCode.ShouldBe(HttpStatusCode.OK);
        return list;
    }

    [Fact]
    public async Task List_WithoutConnectedDevice_ReportsUnknownReachability()
    {
        var device = await CreateDeviceAsync("Offline List Pi");
        var printer = await CreatePrinterAsync(device.Id, "Offline List Printer");

        var item = (await GetPrinterListAsync()).First(x => x.Id == printer.Id);
        item.DeviceOnline.ShouldBeFalse();
        item.PrinterReachable.ShouldBeNull();
    }

    [Fact]
    public async Task List_Reachability_FollowsDeviceConnectionLifecycle()
    {
        var device = await CreateDeviceAsync("Lifecycle Probe Pi");
        var printer = await CreatePrinterAsync(device.Id, "Lifecycle Probe Printer");

        // Simulate the device agent: connect to /printer-hub with its key and
        // report a probe over the hub, like the periodic prober does.
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

        await connection.StartAsync(TestContext.Current.CancellationToken);
        try
        {
            await connection.InvokeAsync("ReportPrinterProbe", printer.Id, true, 12L, TestContext.Current.CancellationToken);

            var item = (await GetPrinterListAsync()).First(x => x.Id == printer.Id);
            item.DeviceOnline.ShouldBeTrue();
            item.PrinterReachable.ShouldBe(true);
        }
        finally
        {
            await connection.StopAsync(TestContext.Current.CancellationToken);
            await connection.DisposeAsync();
        }

        // OnDisconnectedAsync runs async — poll until the server drops the
        // device and invalidates its probe results.
        for (int attempt = 0; attempt < 20; attempt++)
        {
            var item = (await GetPrinterListAsync()).First(x => x.Id == printer.Id);
            if (!item.DeviceOnline && item.PrinterReachable == null)
            {
                return;
            }

            await Task.Delay(250, TestContext.Current.CancellationToken);
        }

        var final = (await GetPrinterListAsync()).First(x => x.Id == printer.Id);
        final.DeviceOnline.ShouldBeFalse();
        final.PrinterReachable.ShouldBeNull();
    }
}
