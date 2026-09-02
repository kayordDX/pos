using System.Collections.Concurrent;

namespace Pos.Api.Hubs;

public class PrinterProbeCache
{
    private static readonly TimeSpan MaxAge = TimeSpan.FromMinutes(10);
    private readonly ConcurrentDictionary<int, PrinterProbeStatus> _cache = new();

    public void Set(int printerId, bool reachable, long latencyMs)
    {
        _cache[printerId] = new PrinterProbeStatus
        {
            Reachable = reachable,
            LatencyMs = latencyMs,
            UpdatedAt = DateTime.UtcNow,
        };
    }

    public PrinterProbeStatus? Get(int printerId)
    {
        if (!_cache.TryGetValue(printerId, out PrinterProbeStatus? status))
        {
            return null;
        }

        if (DateTime.UtcNow - status.UpdatedAt > MaxAge)
        {
            _cache.TryRemove(printerId, out _);
            return null;
        }

        return status;
    }

    public void Remove(int printerId)
    {
        _cache.TryRemove(printerId, out _);
    }
}

public class PrinterProbeStatus
{
    public bool Reachable { get; set; }
    public long LatencyMs { get; set; }
    public DateTime UpdatedAt { get; set; }
}
