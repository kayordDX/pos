using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Pos.Api.Common.Printer;
using Pos.Api.Data;
using Pos.Api.Services;

namespace Pos.Api.Features.PrintServiceKey.Revoke;

public class Endpoint : Endpoint<Request>
{
    private readonly AppDbContext _dbContext;
    private readonly UserService _userService;
    private readonly IMemoryCache _memoryCache;

    public Endpoint(AppDbContext dbContext, UserService userService, IMemoryCache memoryCache)
    {
        _dbContext = dbContext;
        _userService = userService;
        _memoryCache = memoryCache;
    }

    public override void Configure()
    {
        Post("/printerservicekey/revoke");
        Policies(Constants.Policy.Manager);
    }

    public override async Task HandleAsync(Request req, CancellationToken ct)
    {
        int outletId = await _userService.GetOutletId();
        var entity = await _dbContext.PrintServiceKey.Where(x => x.Id == req.Id && x.OutletId == outletId).FirstOrDefaultAsync(ct);

        if (entity == null)
        {
            await Send.NotFoundAsync(ct);
            return;
        }

        entity.RevokedAt = DateTime.UtcNow;
        await _dbContext.SaveChangesAsync(ct);

        _memoryCache.Remove(PrinterCacheKeys.Auth(entity.KeyId));
        _memoryCache.Remove(PrinterCacheKeys.LastSeenThrottle(entity.KeyId));

        await Send.NoContentAsync(ct);
    }
}
