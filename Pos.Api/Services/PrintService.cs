using System.Text.Json;
using Microsoft.AspNetCore.SignalR;
using Pos.Api.Features.Printer;
using Pos.Api.Hubs;
using StackExchange.Redis;

namespace Pos.Api.Services;

public class PrintService
{
    private readonly RedisClient _redisClient;
    private readonly IHubContext<PrinterHub, IPrinterHub> _hub;
    private readonly IConfiguration _configuration;

    public PrintService(RedisClient redisClient, IHubContext<PrinterHub, IPrinterHub> hub, IConfiguration configuration)
    {
        _redisClient = redisClient;
        _hub = hub;
        _configuration = configuration;
    }

    public async Task Print(int outletId, int deviceId, PrintMessage printMessage)
    {
        string transport = (_configuration.GetValue<string>("Print:Transport") ?? "redis").ToLowerInvariant();

        // The device echoes this back via ReportPrintResult; with transport
        // "both" the same id also lets the server dedup double delivery.
        printMessage.JobId ??= Guid.NewGuid().ToString("N");

        string printInstructionsSerialized = JsonSerializer.Serialize(printMessage);

        if (transport is "redis" or "both")
        {
            var subscriber = await _redisClient.GetSubscriber();
            RedisChannel channel = new($"print:{outletId}:{deviceId}", RedisChannel.PatternMode.Auto);
            await subscriber.PublishAsync(channel, printInstructionsSerialized);
        }

        if (transport is "signalr" or "both")
        {
            await _hub.Clients.Group(PrinterHub.DeviceGroup(outletId, deviceId)).ReceivePrint(printMessage);
        }
    }

    // Matches print-service's RequestDeviceInfo receiver method — the device
    // answers with ReportDeviceInfo. Delivered over the hub only.
    public Task RequestDeviceInfo(int outletId, int deviceId)
    {
        return _hub.Clients.Group(PrinterHub.DeviceGroup(outletId, deviceId)).RequestDeviceInfo();
    }

    // Matches print-service's RequestProbe receiver method — the device dials
    // the printer immediately instead of waiting for the probe interval and
    // answers via ReportPrinterProbe (which broadcasts PrinterStatusChanged).
    public Task RequestProbe(int outletId, int deviceId, int printerId)
    {
        return _hub.Clients.Group(PrinterHub.DeviceGroup(outletId, deviceId)).RequestProbe(printerId);
    }
}
