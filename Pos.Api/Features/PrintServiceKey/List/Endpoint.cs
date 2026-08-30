using Pos.Api.DTO;
using Pos.Api.Services;
using Microsoft.EntityFrameworkCore;

namespace Pos.Api.Features.PrintServiceKey.List;

public class Endpoint : EndpointWithoutRequest<List<PrintServiceKeyDTO>>
{
    private readonly Data.AppDbContext _dbContext;
    private readonly UserService _userService;

    public Endpoint(Data.AppDbContext dbContext, UserService userService)
    {
        _dbContext = dbContext;
        _userService = userService;
    }

    public override void Configure()
    {
        Get("/printerservicekey");
        Policies(Constants.Policy.Manager);
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        int outletId = await _userService.GetOutletId();
        var results = await _dbContext.PrintServiceKey
            .AsNoTracking()
            .Where(x => x.OutletId == outletId)
            .OrderByDescending(x => x.Created)
            .Select(x => new PrintServiceKeyDTO
            {
                Id = x.Id,
                KeyId = x.KeyId,
                Name = x.Name,
                DeviceId = x.DeviceId,
                MaskedKey = PrintServiceKeyMask.MaskKey(x.KeyId),
                LastSeenAt = x.LastSeenAt,
                RevokedAt = x.RevokedAt,
                Created = x.Created
            })
            .ToListAsync(ct);

        await Send.OkAsync(results, ct);
    }
}
