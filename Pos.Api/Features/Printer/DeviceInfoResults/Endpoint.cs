using System.Text.Json;
using Microsoft.Extensions.Caching.Memory;
using Pos.Api.Common.Printer;

namespace Pos.Api.Features.Printer.DeviceInfoResults;

public class Endpoint : Endpoint<Request, Results>
{
    private readonly IMemoryCache _memoryCache;

    public Endpoint(IMemoryCache memoryCache)
    {
        _memoryCache = memoryCache;
    }

    public override void Configure()
    {
        Get("/printer/device-info");
    }

    public override async Task HandleAsync(Request req, CancellationToken ct)
    {
        Results results = new();
        string? json = _memoryCache.Get<string>(PrinterCacheKeys.DeviceInfo(req.OutletId, req.DeviceId));

        if (!string.IsNullOrEmpty(json))
        {
            // The device reports Go JSON; case-insensitive matching absorbs any
            // difference between Go and C# naming conventions. A malformed
            // report is treated like a missing one.
            try
            {
                var reported = JsonSerializer.Deserialize<Results>(json, JsonSerializerOptions.Web);
                if (reported != null)
                {
                    results = reported;
                }
            }
            catch (JsonException)
            {
                // ignore
            }
        }

        await Send.OkAsync(results, ct);
    }
}
