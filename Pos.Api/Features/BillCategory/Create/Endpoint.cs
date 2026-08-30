using Pos.Api.Data;

namespace Pos.Api.Features.BillCategory.Create;

public class Endpoint : Endpoint<Request, Entities.BillCategory>
{
    private readonly AppDbContext _dbContext;

    public Endpoint(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public override void Configure()
    {
        Post("/billCategory");
    }

    public override async Task HandleAsync(Request req, CancellationToken ct)
    {
        Pos.Api.Entities.BillCategory entity = new Pos.Api.Entities.BillCategory()
        {
            Name = req.Name,
            OutletId = req.OutletId
        };
        await _dbContext.BillCategory.AddAsync(entity);
        await _dbContext.SaveChangesAsync();
    }
}
