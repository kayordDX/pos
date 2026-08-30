using Pos.Api.Data;
using Microsoft.EntityFrameworkCore;

namespace Pos.Api.Features.Section.List;

public class Endpoint : Endpoint<Request, List<Pos.Api.Entities.Section>>
{
    private readonly AppDbContext _dbContext;

    public Endpoint(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public override void Configure()
    {
        Get("/section");
    }

    public override async Task HandleAsync(Request req, CancellationToken ct)
    {
        var sections = await _dbContext.Section
            .Where(s => s.OutletId == req.OutletId && s.IsDeleted == false)
            .OrderBy(x => x.Name)
            .ToListAsync();

        await Send.OkAsync(sections);
    }
}
