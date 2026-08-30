using Pos.Api.Common.Extensions;
using Pos.Api.Common.Models;
using Pos.Api.Data;
using Pos.Api.DTO;
namespace Pos.Api.Features.Stock.Allocate.GetAll;

public class Endpoint : Endpoint<Request, PaginatedList<StockAllocateDTOBasic>>
{
    private readonly AppDbContext _dbContext;

    public Endpoint(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public override void Configure()
    {
        Get("/stock/allocate");
    }

    public override async Task HandleAsync(Request req, CancellationToken ct)
    {
        var results = await _dbContext.StockAllocate
            .Where(x => x.OutletId == req.OutletId)
            .ProjectToDtoBasic()
            .GetPagedAsync(req, ct);
        await Send.OkAsync(results);
    }
}
