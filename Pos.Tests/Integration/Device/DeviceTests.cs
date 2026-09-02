using System.Net;
using System.Security.Cryptography;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Pos.Api.Data;
using Pos.Api.DTO;

namespace Integration.Device;

[Collection(nameof(AppCollection))]
public class DeviceTests(App app) : TestBase<App>
{
    // Distinct Firebase uid so the shared ClientAuth user (used by other tests
    // to assert "not a manager") stays non-manager.
    private const string ManagerUid = "device-manager-test";

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

    [Fact]
    public async Task CreateDevice_ReturnsFullKeyOnce_AndPersistsHashOnly()
    {
        var dto = await CreateDeviceAsync("Front Desk Pi");

        dto.Id.ShouldBeGreaterThan(0);
        dto.Name.ShouldBe("Front Desk Pi");
        dto.FullKey.ShouldStartWith("kpos_pk_");
        dto.FullKey.ShouldContain(".");
        dto.MaskedKey.ShouldStartWith("kpos_pk_");

        string[] parts = dto.FullKey!.Split('.');
        string keyId = parts[0]["kpos_".Length..];
        string secret = parts[1];

        await using var scope = app.Services.CreateAsyncScope();
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        var entity = await db.Device.AsNoTracking().FirstAsync(x => x.Id == dto.Id, app.Context.CancellationToken);

        entity.KeyId.ShouldBe(keyId);
        // The plaintext secret is never stored — only its SHA-256 hash.
        entity.SecretHash.ShouldBe(Convert.ToHexString(SHA256.HashData(WebEncoders.Base64UrlDecode(secret))));
        entity.RevokedAt.ShouldBeNull();
    }

    [Fact]
    public async Task ListDevices_MasksKey_AndCountsPrinters()
    {
        var dto = await CreateDeviceAsync("List Pi");

        var (rsp, list) = await _managerClient!.GETAsync<Pos.Api.Features.Device.List.Endpoint, List<DeviceDTO>>();
        rsp.StatusCode.ShouldBe(HttpStatusCode.OK);

        var item = list.First(x => x.Id == dto.Id);
        item.MaskedKey.ShouldStartWith("kpos_pk_");
        item.FullKey.ShouldBeNull(); // one-off key never leaks on list
        item.PrinterCount.ShouldBe(0);
        item.RevokedAt.ShouldBeNull();
    }

    [Fact]
    public async Task DeleteDevice_CascadesPrintersAndKey()
    {
        var dto = await CreateDeviceAsync("Cascade Pi");

        // Any authenticated user may add a printer to an existing device.
        var (printerRsp, _) = await app.ClientAuth.POSTAsync<
            Pos.Api.Features.Printer.Create.Endpoint,
            Pos.Api.Features.Printer.Create.Request,
            Pos.Api.DTO.PrinterDTO
        >(
            new()
            {
                OutletId = outletId,
                DeviceId = dto.Id,
                PrinterName = "Cascade Printer",
                IPAddress = "10.0.0.50",
                Port = 9100,
                LineCharacters = 64,
            }
        );
        printerRsp.StatusCode.ShouldBe(HttpStatusCode.OK);

        await using (var scope = app.Services.CreateAsyncScope())
        {
            var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            (await db.Printer.CountAsync(x => x.DeviceId == dto.Id, app.Context.CancellationToken)).ShouldBe(1);
            (await db.Device.AnyAsync(x => x.Id == dto.Id, app.Context.CancellationToken)).ShouldBeTrue();
        }

        var deleteRsp = await _managerClient!.DELETEAsync<Pos.Api.Features.Device.Delete.Endpoint, Pos.Api.Features.Device.Delete.Request>(
            new() { Id = dto.Id }
        );
        deleteRsp.StatusCode.ShouldBe(HttpStatusCode.NoContent);

        await using (var scope = app.Services.CreateAsyncScope())
        {
            var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            (await db.Device.AnyAsync(x => x.Id == dto.Id, app.Context.CancellationToken)).ShouldBeFalse();
            (await db.Printer.CountAsync(x => x.DeviceId == dto.Id, app.Context.CancellationToken)).ShouldBe(0);
        }
    }

    [Fact]
    public async Task RotateKey_ReplacesKey_AndClearsRevocation()
    {
        var created = await CreateDeviceAsync("Rotate Pi");
        string originalKeyId = created.FullKey!.Split('.')[0]["kpos_".Length..];

        var (rotateRsp, rotated) = await _managerClient!.POSTAsync<
            Pos.Api.Features.Device.Key.Rotate.Endpoint,
            Pos.Api.Features.Device.Key.Rotate.Request,
            DeviceDTO
        >(new() { Id = created.Id });
        rotateRsp.StatusCode.ShouldBe(HttpStatusCode.OK);
        rotated.Id.ShouldBe(created.Id);
        rotated.RevokedAt.ShouldBeNull();
        rotated.FullKey.ShouldStartWith("kpos_pk_");
        string rotatedKeyId = rotated.FullKey!.Split('.')[0]["kpos_".Length..];
        rotatedKeyId.ShouldNotBe(originalKeyId);

        await using (var scope = app.Services.CreateAsyncScope())
        {
            var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            var entity = await db.Device.AsNoTracking().FirstAsync(x => x.Id == created.Id, app.Context.CancellationToken);
            entity.KeyId.ShouldBe(rotatedKeyId);
            entity.RevokedAt.ShouldBeNull();

            // Revoke the rotated key, then rotate again: revocation must clear.
            entity.RevokedAt = DateTime.UtcNow;
            await db.SaveChangesAsync(app.Context.CancellationToken);
        }

        var (rotateAgainRsp, rotatedAgain) = await _managerClient!.POSTAsync<
            Pos.Api.Features.Device.Key.Rotate.Endpoint,
            Pos.Api.Features.Device.Key.Rotate.Request,
            DeviceDTO
        >(new() { Id = created.Id });
        rotateAgainRsp.StatusCode.ShouldBe(HttpStatusCode.OK);
        rotatedAgain.RevokedAt.ShouldBeNull();

        await using var finalScope = app.Services.CreateAsyncScope();
        var finalDb = finalScope.ServiceProvider.GetRequiredService<AppDbContext>();
        var finalEntity = await finalDb.Device.AsNoTracking().FirstAsync(x => x.Id == created.Id, app.Context.CancellationToken);
        finalEntity.RevokedAt.ShouldBeNull();
        finalEntity.KeyId.ShouldNotBe(rotatedKeyId);
    }

    [Fact]
    public async Task RevokeKey_SetsRevokedAt_DeviceRemains()
    {
        var dto = await CreateDeviceAsync("Revoke Pi");

        var revokeRsp = await _managerClient!.POSTAsync<Pos.Api.Features.Device.Key.Revoke.Endpoint, Pos.Api.Features.Device.Key.Revoke.Request>(
            new() { Id = dto.Id }
        );
        revokeRsp.StatusCode.ShouldBe(HttpStatusCode.NoContent);

        await using var scope = app.Services.CreateAsyncScope();
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        var entity = await db.Device.AsNoTracking().FirstAsync(x => x.Id == dto.Id, app.Context.CancellationToken);
        entity.RevokedAt.ShouldNotBeNull();
        entity.KeyId.ShouldNotBeNull();
    }

    [Fact]
    public async Task Delete_And_KeyActions_ReturnNotFound_ForMissingDevice()
    {
        var deleteRsp = await _managerClient!.DELETEAsync<Pos.Api.Features.Device.Delete.Endpoint, Pos.Api.Features.Device.Delete.Request>(
            new() { Id = 999999 }
        );
        deleteRsp.StatusCode.ShouldBe(HttpStatusCode.NotFound);

        var rotateRsp = await _managerClient!.POSTAsync<Pos.Api.Features.Device.Key.Rotate.Endpoint, Pos.Api.Features.Device.Key.Rotate.Request>(
            new() { Id = 999999 }
        );
        rotateRsp.StatusCode.ShouldBe(HttpStatusCode.NotFound);
    }

    [Fact]
    public async Task CreatePrinter_Rejects_DeviceFromAnotherOutlet()
    {
        await using var scope = app.Services.CreateAsyncScope();
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        var otherOutlet = await db.Outlet.Where(x => x.Id != outletId).FirstOrDefaultAsync(app.Context.CancellationToken);
        if (otherOutlet == null)
        {
            return; // single-outlet seed cannot exercise cross-outlet rejection
        }

        var dto = await CreateDeviceAsync("Other Outlet Pi");

        var (printerRsp, _) = await app.ClientAuth.POSTAsync<
            Pos.Api.Features.Printer.Create.Endpoint,
            Pos.Api.Features.Printer.Create.Request,
            Pos.Api.DTO.PrinterDTO
        >(
            new()
            {
                OutletId = otherOutlet.Id,
                DeviceId = dto.Id,
                PrinterName = "Cross Outlet",
                IPAddress = "10.0.0.51",
                Port = 9100,
                LineCharacters = 64,
            }
        );
        printerRsp.StatusCode.ShouldBeOneOf(HttpStatusCode.BadRequest, HttpStatusCode.NotFound);
    }
}
