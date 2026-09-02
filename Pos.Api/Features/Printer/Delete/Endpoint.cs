using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Pos.Api.Common.Printer;
using Pos.Api.Data;
using Pos.Api.Hubs;
using Pos.Api.Services;

namespace Pos.Api.Features.Printer.Delete;

public class Endpoint : Endpoint<Request>
{
    private readonly AppDbContext _dbContext;
    private readonly IMemoryCache _memoryCache;
    private readonly PrinterTargetService _printerTargets;
    private readonly IHubContext<PrinterHub, IPrinterHub> _printerHub;

    public Endpoint(AppDbContext dbContext, IMemoryCache memoryCache, PrinterTargetService printerTargets, IHubContext<PrinterHub, IPrinterHub> printerHub)
    {
        _dbContext = dbContext;
        _memoryCache = memoryCache;
        _printerTargets = printerTargets;
        _printerHub = printerHub;
    }

    public override void Configure()
    {
        Delete("/printer/{id}");
    }

    public override async Task HandleAsync(Request req, CancellationToken ct)
    {
        Entities.Printer? entity = await _dbContext.Printer.FirstOrDefaultAsync(x => x.Id == req.Id, ct);
        if (entity == null)
        {
            await Send.NotFoundAsync(ct);
            return;
        }

        _dbContext.Printer.Remove(entity);
        await _dbContext.SaveChangesAsync(ct);

        _memoryCache.Remove(PrinterCacheKeys.Targets(entity.OutletId, entity.DeviceId));
        var targets = await _printerTargets.GetAsync(entity.OutletId, entity.DeviceId, ct);
        await _printerHub.Clients.Group(PrinterHub.DeviceGroup(entity.OutletId, entity.DeviceId)).SyncPrinters(targets);

        await Send.NoContentAsync(ct);
    }
}
