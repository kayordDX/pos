using Pos.Api.Data;

namespace Pos.Api.Features.Business.Create;

public class Endpoint : Endpoint<Request, Pos.Api.Entities.Business>
{
    private readonly AppDbContext _dbContext;

    public Endpoint(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public override void Configure()
    {
        Post("/business");
    }

    public override async Task HandleAsync(Request req, CancellationToken ct)
    {
        Pos.Api.Entities.Business entity = new Pos.Api.Entities.Business() { Name = req.Name };
        await _dbContext.Business.AddAsync(entity);
        await _dbContext.SaveChangesAsync();

        var result = await _dbContext.Business.FindAsync(entity.Id);
        if (result == null)
        {
            await Send.NotFoundAsync();
            return;
        }

        await Send.OkAsync(result);
    }
}
