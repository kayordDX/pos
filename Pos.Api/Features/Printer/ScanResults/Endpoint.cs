using Pos.Api.Common.Printer;
using Pos.Api.Services;
using Microsoft.Extensions.Caching.Memory;

namespace Pos.Api.Features.Printer.ScanResults;

public class Endpoint : Endpoint<Request, Results>
{
    private readonly RedisClient _redisClient;
    private readonly IMemoryCache _memoryCache;

    public Endpoint(RedisClient redisClient, IMemoryCache memoryCache)
    {
        _redisClient = redisClient;
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

        if (status == null)
        {
            status = await _redisClient.GetValueAsync($"status-print:{req.OutletId}:{req.DeviceId}");
        }

        if (output == null)
        {
            output = await _redisClient.GetValueAsync($"result-print:{req.OutletId}:{req.DeviceId}");
        }

        results.Status = status;
        results.Output = output;

        await Send.OkAsync(results);
    }
}
