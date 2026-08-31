using Pos.Api.Data;
using Microsoft.EntityFrameworkCore;

namespace Pos.Api.Features.Outlet.Counter.Delete;

public class Endpoint : Endpoint<Request, Guid>
{
    private readonly AppDbContext _dbContext;

    public Endpoint(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public override void Configure()
    {
        Delete("/outlet/counter/{deviceId}");
    }

    public override async Task HandleAsync(Request req, CancellationToken ct)
    {
        var entity = await _dbContext.OutletCounter.Where(x => x.Id == req.DeviceId).FirstOrDefaultAsync(ct);
        if (entity == null)
        {
            ValidationContext.Instance.ThrowError("Device not found");
        }

        _dbContext.OutletCounter.Remove(entity);
        await _dbContext.SaveChangesAsync();
        await Send.OkAsync(entity.Id);
    }
}
