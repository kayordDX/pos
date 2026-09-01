using System.Security.Cryptography;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using Pos.Api.Data;
using Pos.Api.DTO;
using Pos.Api.Services;

namespace Pos.Api.Features.PrintServiceKey.Create;

public class Endpoint : Endpoint<Request, PrintServiceKeyDTO>
{
    private readonly AppDbContext _dbContext;
    private readonly UserService _userService;

    public Endpoint(AppDbContext dbContext, UserService userService)
    {
        _dbContext = dbContext;
        _userService = userService;
    }

    public override void Configure()
    {
        Post("/printerservicekey");
        Policies(Constants.Policy.Manager);
    }

    public override async Task HandleAsync(Request req, CancellationToken ct)
    {
        int outletId = await _userService.GetOutletId();

        // Keys are always bound to the caller's current outlet and device 1 (the
        // scan/device-info features address a connected print device by this exact
        // identity, so a key bound to any other outlet/device can never receive them).

        string keyId = await GenerateKeyIdAsync(ct);
        byte[] secretBytes = RandomNumberGenerator.GetBytes(32);
        string secret = WebEncoders.Base64UrlEncode(secretBytes);

        var entity = new Pos.Api.Entities.PrintServiceKey
        {
            OutletId = outletId,
            DeviceId = 1,
            KeyId = keyId,
            SecretHash = Convert.ToHexString(SHA256.HashData(secretBytes)),
            Name = req.Name,
        };

        await _dbContext.PrintServiceKey.AddAsync(entity, ct);
        await _dbContext.SaveChangesAsync(ct);

        await Send.OkAsync(
            new PrintServiceKeyDTO
            {
                Id = entity.Id,
                KeyId = entity.KeyId,
                Name = entity.Name,
                DeviceId = entity.DeviceId,
                MaskedKey = PrintServiceKeyMask.MaskKey(entity.KeyId),
                LastSeenAt = entity.LastSeenAt,
                RevokedAt = entity.RevokedAt,
                Created = entity.Created,
                FullKey = $"kpos_{entity.KeyId}.{secret}",
            },
            ct
        );
    }

    private async Task<string> GenerateKeyIdAsync(CancellationToken ct)
    {
        while (true)
        {
            string keyId = $"pk_{Convert.ToHexString(RandomNumberGenerator.GetBytes(4)).ToLowerInvariant()}";
            bool exists = await _dbContext.PrintServiceKey.AnyAsync(x => x.KeyId == keyId, ct);
            if (!exists)
            {
                return keyId;
            }
        }
    }
}
