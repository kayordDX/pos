using Pos.Api.Data;
using Microsoft.EntityFrameworkCore;

namespace Pos.Api.Features.Outlet.List;

public class Endpoint : EndpointWithoutRequest<List<Pos.Api.Entities.Outlet>>
{
    private readonly AppDbContext _dbContext;

    public Endpoint(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public override void Configure()
    {
        Get("/outlet");
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var results = await _dbContext.Outlet.ToListAsync();
        await Send.OkAsync(results);
    }
}
