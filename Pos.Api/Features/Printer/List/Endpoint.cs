using Microsoft.EntityFrameworkCore;
using Pos.Api.Data;
using Pos.Api.DTO;
using Pos.Api.Hubs;
using Pos.Api.Services;

namespace Pos.Api.Features.Printer.List;

public class Endpoint : Endpoint<Request, List<PrinterDTO>>
{
    private readonly AppDbContext _dbContext;
    private readonly RedisClient _redisClient;
    private readonly PrinterConnectionTracker _connectionTracker;
    private readonly PrinterProbeCache _probeCache;

    public Endpoint(AppDbContext dbContext, RedisClient redisClient, PrinterConnectionTracker connectionTracker, PrinterProbeCache probeCache)
    {
        _dbContext = dbContext;
        _redisClient = redisClient;
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
            .ToListAsync();

        if (result.Count > 0)
        {
            try
            {
                // Get subscribed printers for outlet
                var db = await _redisClient.GetDatabaseAsync();
                var subscribedPrinters = await db.ExecuteAsync("PUBSUB", "CHANNELS", $"print:{r.OutletId}:*");

                List<string> printerChannels = ((StackExchange.Redis.RedisValue[]?)subscribedPrinters)?.Select(x => x.ToString())?.ToList() ?? [];

                List<int> onlineDevices = [];
                foreach (var channel in printerChannels)
                {
                    var subCount = await db.ExecuteAsync("PUBSUB", "NUMSUB", channel);
                    var subCountList = ((StackExchange.Redis.RedisValue[]?)subCount)?.Select(x => x.ToString()).ToList() ?? [];
                    // Consider a printer connected if it has at least one subscriber. NUMSUB returns
                    // [channel, count], and duplicates/lingering subscriptions can push the count above 1.
                    if (
                        subCountList.Count > 1
                        && int.TryParse(subCountList[1], out int subscriberCount)
                        && subscriberCount > 0
                        && int.TryParse(channel.Replace($"print:{r.OutletId}:", ""), out int deviceId)
                    )
                    {
                        onlineDevices.Add(deviceId);
                    }
                }
                result.ForEach(x => x.IsConnected = onlineDevices.Contains(x.DeviceId));
            }
            catch (Exception ex)
            {
                Logger.LogError(ex, ex.Message);
            }
        }

        result.ForEach(x =>
        {
            x.DeviceOnline = _connectionTracker.IsOnline(x.OutletId, x.DeviceId);
            x.PrinterReachable = _probeCache.Get(x.Id)?.Reachable;
        });

        await Send.OkAsync(result);
    }
}
