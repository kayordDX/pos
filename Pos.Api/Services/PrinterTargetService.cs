using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Pos.Api.Common.Printer;
using Pos.Api.Data;
using Pos.Api.Hubs;

namespace Pos.Api.Services;

public class PrinterTargetService
{
    private static readonly TimeSpan CacheTtl = TimeSpan.FromMinutes(30);

    private readonly AppDbContext _dbContext;
    private readonly IMemoryCache _memoryCache;

    public PrinterTargetService(AppDbContext dbContext, IMemoryCache memoryCache)
    {
        _dbContext = dbContext;
        _memoryCache = memoryCache;
    }

    // Cached because it is read on every hub connect/disconnect. Evict
    // PrinterCacheKeys.Targets after any printer assignment change.
    public async Task<List<PrinterTarget>> GetAsync(int outletId, int deviceId, CancellationToken ct = default)
    {
        string cacheKey = PrinterCacheKeys.Targets(outletId, deviceId);
        if (_memoryCache.TryGetValue(cacheKey, out List<PrinterTarget>? cachedTargets) && cachedTargets != null)
        {
            return cachedTargets;
        }

        var printers = await _dbContext
            .Printer.Where(x => x.OutletId == outletId && x.DeviceId == deviceId && x.IsEnabled == true)
            .OrderBy(x => x.PrinterName)
            .Select(x => new PrinterTarget
            {
                PrinterId = x.Id,
                Name = x.PrinterName,
                IPAddress = x.IPAddress,
                Port = x.Port,
            })
            .ToListAsync(ct);

        _memoryCache.Set(cacheKey, printers, CacheTtl);

        return printers;
    }
}
