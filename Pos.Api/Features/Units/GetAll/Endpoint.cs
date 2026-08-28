using Pos.Api.Data;
using Pos.Api.Entities;
using Microsoft.EntityFrameworkCore;
namespace Pos.Api.Features.Units.GetAll;

public class Endpoint : EndpointWithoutRequest<List<Unit>>
{
    private readonly AppDbContext _dbContext;

    public Endpoint(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public override void Configure()
    {
        Get("/unit");
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var results = await _dbContext.Unit.ToListAsync(ct);
        await Send.OkAsync(results);
    }
}



