using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Pos.Api.Common.Printer;
using Pos.Api.Data;
using Pos.Api.DTO;
using Pos.Api.Hubs;
using Pos.Api.Services;

namespace Pos.Api.Features.Printer.Create;

public class Endpoint : Endpoint<Request, PrinterDTO>
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
        Post("/printer");
    }

    public override async Task HandleAsync(Request req, CancellationToken ct)
    {
        bool deviceExists = await _dbContext.Device.AnyAsync(x => x.Id == req.DeviceId && x.OutletId == req.OutletId, ct);
        if (!deviceExists)
        {
            ValidationContext.Instance.ThrowError("Device does not exist for this outlet.");
        }

        Entities.Printer entity = new Entities.Printer()
        {
            OutletId = req.OutletId,
            Port = req.Port,
            PrinterName = req.PrinterName,
            IPAddress = req.IPAddress,
            IsEnabled = true,
            LineCharacters = req.LineCharacters,
            DeviceId = req.DeviceId,
        };
        await _dbContext.Printer.AddAsync(entity);
        await _dbContext.SaveChangesAsync(ct);

        _memoryCache.Remove(PrinterCacheKeys.Targets(req.OutletId, req.DeviceId));
        var targets = await _printerTargets.GetAsync(req.OutletId, req.DeviceId, ct);
        await _printerHub.Clients.Group(PrinterHub.DeviceGroup(req.OutletId, req.DeviceId)).SyncPrinters(targets);

        var result = await _dbContext.Printer.ProjectToDto().FirstOrDefaultAsync(x => x.Id == entity.Id, ct);
        if (result == null)
        {
            await Send.NotFoundAsync();
            return;
        }

        await Send.OkAsync(result);
    }
}
