using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Pos.Api.Common.Printer;
using Pos.Api.Data;
using Pos.Api.DTO;
using Pos.Api.Hubs;
using Pos.Api.Services;

namespace Pos.Api.Features.Printer.Edit;

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
        Put("/printer");
    }

    public override async Task HandleAsync(Request req, CancellationToken ct)
    {
        Entities.Printer? entity = await _dbContext.Printer.FirstOrDefaultAsync(x => x.Id == req.Id, ct);
        if (entity == null)
        {
            await Send.NotFoundAsync(ct);
            return;
        }

        bool deviceExists = await _dbContext.Device.AnyAsync(x => x.Id == req.DeviceId && x.OutletId == entity.OutletId, ct);
        if (!deviceExists)
        {
            ValidationContext.Instance.ThrowError("Device does not exist for this outlet.");
        }

        int previousDeviceId = entity.DeviceId;

        entity.Port = req.Port;
        entity.PrinterName = req.PrinterName;
        entity.IPAddress = req.IPAddress;
        entity.LineCharacters = req.LineCharacters;
        entity.IsEnabled = req.IsEnabled;
        entity.DeviceId = req.DeviceId;

        await _dbContext.SaveChangesAsync(ct);

        _memoryCache.Remove(PrinterCacheKeys.Targets(entity.OutletId, entity.DeviceId));
        if (previousDeviceId != entity.DeviceId)
        {
            _memoryCache.Remove(PrinterCacheKeys.Targets(entity.OutletId, previousDeviceId));
        }

        await SyncTargetsAsync(entity.OutletId, entity.DeviceId, ct);
        if (previousDeviceId != entity.DeviceId)
        {
            await SyncTargetsAsync(entity.OutletId, previousDeviceId, ct);
        }

        await Send.NoContentAsync(ct);
    }

    private async Task SyncTargetsAsync(int outletId, int deviceId, CancellationToken ct)
    {
        var targets = await _printerTargets.GetAsync(outletId, deviceId, ct);
        await _printerHub.Clients.Group(PrinterHub.DeviceGroup(outletId, deviceId)).SyncPrinters(targets);
    }
}
