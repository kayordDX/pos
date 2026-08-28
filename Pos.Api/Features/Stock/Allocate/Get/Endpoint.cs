using Pos.Api.Data;
using Pos.Api.DTO;
using Microsoft.EntityFrameworkCore;
namespace Pos.Api.Features.Stock.Allocate.Get;

public class Endpoint : Endpoint<Request, StockAllocateDTO>
{
    private readonly AppDbContext _dbContext;

    public Endpoint(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public override void Configure()
    {
        Get("/stock/allocate/{Id}");
    }

    public override async Task HandleAsync(Request req, CancellationToken ct)
    {
        var results = await _dbContext.StockAllocate
            .Where(x => x.Id == req.Id)
            .ProjectToDto()
            .FirstOrDefaultAsync(ct);

        if (results == null)
        {
            await Send.NotFoundAsync();
            return;
        }

        await Send.OkAsync(results);
    }
}
