using Microsoft.Extensions.Caching.Memory;
using Pos.Api.Common.Printer;

namespace Pos.Api.Features.Printer.PrintResults;

public class Endpoint : Endpoint<Request, PrintResult>
{
    private readonly IMemoryCache _memoryCache;

    public Endpoint(IMemoryCache memoryCache)
    {
        _memoryCache = memoryCache;
    }

    public override void Configure()
    {
        Get("/printer/print-result");
    }

    public override async Task HandleAsync(Request req, CancellationToken ct)
    {
        // Results live for the same 5 minutes as scan results; a missing or
        // expired job reads back as an empty result.
        PrintResult result =
            _memoryCache.Get<PrintResult>(PrinterCacheKeys.PrintResult(req.OutletId, req.DeviceId, req.JobId)) ?? new PrintResult { JobId = req.JobId };

        await Send.OkAsync(result, ct);
    }
}
