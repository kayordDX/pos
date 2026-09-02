using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Pos.Api.Common.Printer;
using Pos.Api.Data;
using Pos.Api.DTO;
using Pos.Api.Services;

namespace Pos.Api.Features.Device.Key.Rotate;

public class Endpoint : Endpoint<Request, DeviceDTO>
{
    private readonly AppDbContext _dbContext;
    private readonly UserService _userService;
    private readonly IMemoryCache _memoryCache;

    public Endpoint(AppDbContext dbContext, UserService userService, IMemoryCache memoryCache)
    {
        _dbContext = dbContext;
        _userService = userService;
        _memoryCache = memoryCache;
    }

    public override void Configure()
    {
        Post("/device/{id}/key/rotate");
        Policies(Constants.Policy.Manager);
    }

    public override async Task HandleAsync(Request req, CancellationToken ct)
    {
        int outletId = await _userService.GetOutletId();

        var entity = await _dbContext.Device.FirstOrDefaultAsync(x => x.Id == req.Id && x.OutletId == outletId, ct);
        if (entity == null)
        {
            await Send.NotFoundAsync(ct);
            return;
        }

        // The old key stops validating immediately (auth cache entry removed);
        // any already-connected device keeps working until it reconnects.
        if (entity.KeyId != null)
        {
            _memoryCache.Remove(PrinterCacheKeys.Auth(entity.KeyId));
        }

        (string keyId, string secret, string secretHash) = await DeviceKeys.GenerateAsync(_dbContext, ct);
        entity.KeyId = keyId;
        entity.SecretHash = secretHash;
        entity.RevokedAt = null;
        await _dbContext.SaveChangesAsync(ct);

        await Send.OkAsync(
            new DeviceDTO
            {
                Id = entity.Id,
                OutletId = entity.OutletId,
                Name = entity.Name,
                MaskedKey = DeviceKeys.Mask(entity.KeyId!),
                RevokedAt = entity.RevokedAt,
                Created = entity.Created,
                FullKey = DeviceKeys.FormatFull(entity.KeyId!, secret),
            },
            ct
        );
    }
}
