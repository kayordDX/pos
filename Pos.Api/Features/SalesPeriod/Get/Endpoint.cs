using Microsoft.EntityFrameworkCore;
using Pos.Api.Data;
using Pos.Api.Features.SalesPeriod.Create;

namespace Pos.Api.Features.SalesPeriod.Get;

public class Endpoint : Endpoint<Request, Pos.Api.Entities.SalesPeriod>
{
    private readonly AppDbContext _dbContext;

    public Endpoint(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public override void Configure()
    {
        Get("/salesPeriod/{outletId}");
    }

    public override async Task HandleAsync(Request r, CancellationToken ct)
    {
        var result = await _dbContext.SalesPeriod.FirstOrDefaultAsync(x => x.OutletId == r.OutletId && x.StartDate != null && x.EndDate == null);
        if (result == null)
        {
            await Send.NotFoundAsync();
            return;
        }
        await Send.OkAsync(result);
    }
}
