using Pos.Api.Data;
using Pos.Api.Features.Business.Create;
using Microsoft.EntityFrameworkCore;

namespace Pos.Api.Features.Business.Get;

public class Endpoint : Endpoint<Request, Pos.Api.Entities.Business>
{
    private readonly AppDbContext _dbContext;

    public Endpoint(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public override void Configure()
    {
        Get("/business/{id}");
    }

    public override async Task HandleAsync(Request r, CancellationToken ct)
    {
        var result = await _dbContext.Business.FindAsync(r.Id);
        if (result == null)
        {
            await Send.NotFoundAsync();
            return;
        }
        await Send.OkAsync(result);
    }
}
