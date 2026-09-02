using Microsoft.EntityFrameworkCore;
using Pos.Api.Data;
using Pos.Api.DTO;
using Pos.Api.Hubs;
using Pos.Api.Services;

namespace Pos.Api.Features.Printer.List;

public class Endpoint : Endpoint<Request, List<PrinterDTO>>
{
    private readonly AppDbContext _dbContext;
    private readonly PrinterConnectionTracker _connectionTracker;
    private readonly PrinterProbeCache _probeCache;

    public Endpoint(AppDbContext dbContext, PrinterConnectionTracker connectionTracker, PrinterProbeCache probeCache)
    {
        _dbContext = dbContext;
        _connectionTracker = connectionTracker;
        _probeCache = probeCache;
    }

    public override void Configure()
    {
        Get("/printer/{outletId}");
    }

    public override async Task HandleAsync(Request r, CancellationToken ct)
    {
        var result = await _dbContext
            .Printer.Where(x => x.OutletId == r.OutletId)
            .OrderByDescending(x => x.IsEnabled)
            .ThenBy(x => x.PrinterName)
            .ProjectToDto()
            .ToListAsync(ct);

        result.ForEach(x =>
        {
            // Realtime device status comes from the SignalR connection tracker.
            bool online = _connectionTracker.IsOnline(x.OutletId, x.DeviceId);
            x.IsConnected = online;
            x.DeviceOnline = online;
            x.PrinterReachable = _probeCache.Get(x.Id)?.Reachable;
        });

        await Send.OkAsync(result, ct);
    }
}
