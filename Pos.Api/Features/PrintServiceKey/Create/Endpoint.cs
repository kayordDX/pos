using System.Security.Cryptography;
using Pos.Api.Data;
using Pos.Api.DTO;
using Pos.Api.Services;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;

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
        if (req.OutletId != outletId)
        {
            await Send.ForbiddenAsync(ct);
            return;
        }

        string keyId = await GenerateKeyIdAsync(ct);
        byte[] secretBytes = RandomNumberGenerator.GetBytes(32);
        string secret = WebEncoders.Base64UrlEncode(secretBytes);

        var entity = new Pos.Api.Entities.PrintServiceKey
        {
            OutletId = outletId,
            DeviceId = req.DeviceId,
            KeyId = keyId,
            SecretHash = Convert.ToHexString(SHA256.HashData(secretBytes)),
            Name = req.Name
        };

        await _dbContext.PrintServiceKey.AddAsync(entity, ct);
        await _dbContext.SaveChangesAsync(ct);

        await Send.OkAsync(new PrintServiceKeyDTO
        {
            Id = entity.Id,
            KeyId = entity.KeyId,
            Name = entity.Name,
            DeviceId = entity.DeviceId,
            MaskedKey = PrintServiceKeyMask.MaskKey(entity.KeyId),
            LastSeenAt = entity.LastSeenAt,
            RevokedAt = entity.RevokedAt,
            Created = entity.Created,
            FullKey = $"kpos_{entity.KeyId}.{secret}"
        }, ct);
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
