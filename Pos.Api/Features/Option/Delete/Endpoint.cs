using Microsoft.EntityFrameworkCore;
using Pos.Api.Data;
using Pos.Api.Entities;
using Pos.Api.Services;

namespace Pos.Api.Features.Option.Delete;

public class Endpoint : Endpoint<Request>
{
    private readonly AppDbContext _dbContext;

    public Endpoint(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public override void Configure()
    {
        Delete("/option/{id}");
    }

    public override async Task HandleAsync(Request req, CancellationToken ct)
    {
        Entities.Option? option = await _dbContext.Option.FindAsync(req.Id);

        if (option != null)
        {
            _dbContext.Option.Remove(option);
            await _dbContext.SaveChangesAsync();
        }
        else
        {
            throw new Exception("Extra Not Found");
        }
    }
}
