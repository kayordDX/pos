using Pos.Api.Data;
using Microsoft.EntityFrameworkCore;

namespace Pos.Api.Features.Outlet.List;

public class Endpoint(AppDbContext dbContext) : EndpointWithoutRequest<List<Entities.Outlet>>
{
    private readonly AppDbContext _dbContext = dbContext;

    public override void Configure()
    {
        Get("/outlet");
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var results = await _dbContext.Outlet.ToListAsync(ct);
        await Send.OkAsync(results, ct);
    }
}
