using Pos.Api.Data;

namespace Pos.Api.Features.StockCategory.Create;

public class Endpoint : Endpoint<Request, Pos.Api.Entities.StockCategory>
{
    private readonly AppDbContext _dbContext;

    public Endpoint(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public override void Configure()
    {
        Post("/stockCategory");
    }

    public override async Task HandleAsync(Request req, CancellationToken ct)
    {
        Pos.Api.Entities.StockCategory entity = new Pos.Api.Entities.StockCategory()
        {
            Name = req.Name,
            ParentId = req.ParentId,
            OutletId = req.OutletId
        };
        await _dbContext.StockCategory.AddAsync(entity);
        await _dbContext.SaveChangesAsync();

        var result = await _dbContext.StockCategory.FindAsync(entity.Id);
        if (result == null)
        {
            await Send.NotFoundAsync();
            return;
        }

        await Send.OkAsync(result);
    }
}
