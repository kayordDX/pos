using Pos.Api.Data;
using Pos.Api.DTO;
using Pos.Api.Services;

namespace Pos.Api.Features.Device.Create;

public class Endpoint : Endpoint<Request, DeviceDTO>
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
        Post("/device");
        Policies(Constants.Policy.Manager);
    }

    public override async Task HandleAsync(Request req, CancellationToken ct)
    {
        int outletId = await _userService.GetOutletId();

        (string keyId, string secret, string secretHash) = await DeviceKeys.GenerateAsync(_dbContext, ct);
        var entity = new Entities.Device
        {
            OutletId = outletId,
            Name = req.Name,
            KeyId = keyId,
            SecretHash = secretHash,
        };

        await _dbContext.Device.AddAsync(entity, ct);
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
                PrinterCount = 0,
                FullKey = DeviceKeys.FormatFull(entity.KeyId!, secret),
            },
            ct
        );
    }
}
