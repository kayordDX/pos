using System.Security.Claims;
using System.Text.Json;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Pos.Api.Common.Printer;
using Pos.Api.Data;
using Pos.Api.Events;

namespace Pos.Api.Hubs;

public interface IPrinterHub
{
    Task ReceivePrint(Features.Printer.PrintMessage message);
    Task SyncPrinters(List<PrinterTarget> printers);
    Task RequestDeviceInfo();
    Task RequestProbe(int printerId);
}

public class PrinterHub : Hub<IPrinterHub>
{
    private static readonly TimeSpan ScanCacheTtl = TimeSpan.FromMinutes(5);
    private static readonly TimeSpan TargetsCacheTtl = TimeSpan.FromMinutes(30);

    private readonly AppDbContext _dbContext;
    private readonly IMemoryCache _memoryCache;
    private readonly PrinterConnectionTracker _connectionTracker;
    private readonly PrinterProbeCache _probeCache;
    private readonly IHubContext<KayordHub, IKayordHub> _kayordHub;

    public PrinterHub(
        AppDbContext dbContext,
        IMemoryCache memoryCache,
        PrinterConnectionTracker connectionTracker,
        PrinterProbeCache probeCache,
        IHubContext<KayordHub, IKayordHub> kayordHub
    )
    {
        _dbContext = dbContext;
        _memoryCache = memoryCache;
        _connectionTracker = connectionTracker;
        _probeCache = probeCache;
        _kayordHub = kayordHub;
    }

    public override async Task OnConnectedAsync()
    {
        (int outletId, int deviceId, _) = GetIdentity();

        await Groups.AddToGroupAsync(Context.ConnectionId, OutletGroup(outletId));
        await Groups.AddToGroupAsync(Context.ConnectionId, DeviceGroup(outletId, deviceId));

        _connectionTracker.Connected(outletId, deviceId);

        var printers = await GetPrinterTargetsAsync(outletId, deviceId, Context.ConnectionAborted);
        await Clients.Caller.SyncPrinters(printers);
        await BroadcastDeviceStateAsync(outletId, deviceId, Context.ConnectionAborted);

        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        if (TryGetIdentity(out int outletId, out int deviceId))
        {
            _connectionTracker.Disconnected(outletId, deviceId);

            // Probe results were observed by this device. Once it is fully gone
            // they are stale by definition — drop them so the UI reports
            // unknown instead of "reachable" for up to the cache TTL.
            if (!_connectionTracker.IsOnline(outletId, deviceId))
            {
                var printers = await GetPrinterTargetsAsync(outletId, deviceId, Context.ConnectionAborted);
                foreach (var printer in printers)
                {
                    _probeCache.Remove(printer.PrinterId);
                }
            }

            await BroadcastDeviceStateAsync(outletId, deviceId, Context.ConnectionAborted);
        }

        await base.OnDisconnectedAsync(exception);
    }

    public Task ReportScanStarted()
    {
        (int outletId, int deviceId, _) = GetIdentity();
        _memoryCache.Set(PrinterCacheKeys.ScanStatus(outletId, deviceId), $"Scan started at {DateTime.UtcNow:O}", ScanCacheTtl);
        _memoryCache.Remove(PrinterCacheKeys.ScanResult(outletId, deviceId));
        return Task.CompletedTask;
    }

    public Task ReportScanResult(string output)
    {
        (int outletId, int deviceId, _) = GetIdentity();
        _memoryCache.Remove(PrinterCacheKeys.ScanStatus(outletId, deviceId));
        _memoryCache.Set(PrinterCacheKeys.ScanResult(outletId, deviceId), output, ScanCacheTtl);
        return Task.CompletedTask;
    }

    public Task ReportPrintResult(string jobId, bool ok, string detail)
    {
        (int outletId, int deviceId, _) = GetIdentity();
        if (string.IsNullOrWhiteSpace(jobId))
        {
            return Task.CompletedTask;
        }

        _memoryCache.Set(
            PrinterCacheKeys.PrintResult(outletId, deviceId, jobId),
            new Features.Printer.PrintResult
            {
                JobId = jobId,
                Ok = ok,
                Detail = detail,
            },
            ScanCacheTtl
        );
        return Task.CompletedTask;
    }

    // The device reports a typed object (print-service model.DeviceInfo); it is
    // stored as JSON so the DeviceInfoResults endpoint can read it unchanged.
    public Task ReportDeviceInfo(Features.Printer.DeviceInfoReport info)
    {
        (int outletId, int deviceId, _) = GetIdentity();
        _memoryCache.Set(PrinterCacheKeys.DeviceInfo(outletId, deviceId), JsonSerializer.Serialize(info, JsonSerializerOptions.Web), ScanCacheTtl);
        return Task.CompletedTask;
    }

    public async Task ReportPrinterProbe(int printerId, bool reachable, long latencyMs)
    {
        (int outletId, int deviceId, _) = GetIdentity();
        var printers = await GetPrinterTargetsAsync(outletId, deviceId, Context.ConnectionAborted);

        if (!printers.Any(x => x.PrinterId == printerId))
        {
            throw new HubException("Printer not assigned to this device.");
        }

        _probeCache.Set(printerId, reachable, latencyMs);

        await _kayordHub
            .Clients.Group(KayordOutletGroup(outletId))
            .PrinterStatusChanged(
                new PrinterStatusChangedEvent
                {
                    OutletId = outletId,
                    PrinterId = printerId,
                    Reachable = reachable,
                    Online = _connectionTracker.IsOnline(outletId, deviceId),
                }
            );
    }

    public static string DeviceGroup(int outletId, int deviceId) => $"printer-outlet-{outletId}-device-{deviceId}";

    public static string OutletGroup(int outletId) => $"printer-outlet-{outletId}";

    private static string KayordOutletGroup(int outletId) => $"outlet:{outletId}";

    private (int OutletId, int DeviceId, string KeyId) GetIdentity()
    {
        if (!TryGetIdentity(out int outletId, out int deviceId, out string keyId))
        {
            throw new HubException("Missing printer identity.");
        }

        return (outletId, deviceId, keyId);
    }

    private bool TryGetIdentity(out int outletId, out int deviceId)
    {
        var result = TryGetIdentity(out outletId, out deviceId, out _);
        return result;
    }

    private bool TryGetIdentity(out int outletId, out int deviceId, out string keyId)
    {
        outletId = 0;
        deviceId = 0;
        keyId = string.Empty;

        string? outlet = Context.User?.FindFirstValue(Constants.Claim.OutletId);
        string? device = Context.User?.FindFirstValue(Constants.Claim.DeviceId);
        keyId = Context.User?.FindFirstValue(Constants.Claim.KeyId) ?? string.Empty;

        return int.TryParse(outlet, out outletId) && int.TryParse(device, out deviceId) && !string.IsNullOrWhiteSpace(keyId);
    }

    private async Task<List<PrinterTarget>> GetPrinterTargetsAsync(int outletId, int deviceId, CancellationToken ct)
    {
        string cacheKey = PrinterCacheKeys.Targets(outletId, deviceId);
        if (_memoryCache.TryGetValue(cacheKey, out List<PrinterTarget>? cachedTargets) && cachedTargets != null)
        {
            return cachedTargets;
        }

        var printers = await _dbContext
            .Printer.Where(x => x.OutletId == outletId && x.DeviceId == deviceId)
            .OrderBy(x => x.PrinterName)
            .Select(x => new PrinterTarget
            {
                PrinterId = x.Id,
                Name = x.PrinterName,
                IPAddress = x.IPAddress,
                Port = x.Port,
            })
            .ToListAsync(ct);

        _memoryCache.Set(cacheKey, printers, TargetsCacheTtl);

        return printers;
    }

    private async Task BroadcastDeviceStateAsync(int outletId, int deviceId, CancellationToken ct)
    {
        var printers = await GetPrinterTargetsAsync(outletId, deviceId, ct);
        bool online = _connectionTracker.IsOnline(outletId, deviceId);

        foreach (var printer in printers)
        {
            await _kayordHub
                .Clients.Group(KayordOutletGroup(outletId))
                .PrinterStatusChanged(
                    new PrinterStatusChangedEvent
                    {
                        OutletId = outletId,
                        PrinterId = printer.PrinterId,
                        Reachable = _probeCache.Get(printer.PrinterId)?.Reachable,
                        Online = online,
                    }
                );
        }
    }
}
