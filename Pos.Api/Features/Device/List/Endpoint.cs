using Microsoft.EntityFrameworkCore;
using Pos.Api.Data;
using Pos.Api.DTO;
using Pos.Api.Hubs;
using Pos.Api.Services;

namespace Pos.Api.Features.Device.List;

public class Endpoint(Data.AppDbContext dbContext, UserService userService, PrinterConnectionTracker connectionTracker)
    : EndpointWithoutRequest<List<DeviceDTO>>
{
    private readonly Data.AppDbContext _dbContext = dbContext;
    private readonly UserService _userService = userService;
    private readonly PrinterConnectionTracker _connectionTracker = connectionTracker;

    public override void Configure()
    {
        Get("/device");
        Policies(Constants.Policy.Manager);
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        int outletId = await _userService.GetOutletId();

        var results = await _dbContext
            .Device.AsNoTracking()
            .Where(x => x.OutletId == outletId)
            .OrderByDescending(x => x.Created)
            .Select(x => new DeviceDTO
            {
                Id = x.Id,
                OutletId = x.OutletId,
                Name = x.Name,
                MaskedKey = x.KeyId == null ? null : DeviceKeys.Mask(x.KeyId),
                RevokedAt = x.RevokedAt,
                Created = x.Created,
                PrinterCount = x.Printers.Count,
            })
            .ToListAsync(ct);

        results.ForEach(x => x.IsOnline = _connectionTracker.IsOnline(x.OutletId, x.Id));

        await Send.OkAsync(results, ct);
    }
}
