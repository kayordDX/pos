using Microsoft.Extensions.Caching.Memory;
using Pos.Api.Common.Printer;

namespace Pos.Api.Features.Printer.ScanResults;

public class Endpoint : Endpoint<Request, Results>
{
    private readonly IMemoryCache _memoryCache;

    public Endpoint(IMemoryCache memoryCache)
    {
        _memoryCache = memoryCache;
    }

    public override void Configure()
    {
        Get("/printer/scan");
    }

    public override async Task HandleAsync(Request req, CancellationToken ct)
    {
        Results results = new();
        string? status = _memoryCache.Get<string>(PrinterCacheKeys.ScanStatus(req.OutletId, req.DeviceId));
        string? output = _memoryCache.Get<string>(PrinterCacheKeys.ScanResult(req.OutletId, req.DeviceId));

        results.Status = status;
        results.Output = output;

        await Send.OkAsync(results, ct);
    }
}
