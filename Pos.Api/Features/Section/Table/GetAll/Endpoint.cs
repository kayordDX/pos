using Microsoft.EntityFrameworkCore;
using Pos.Api.Data;

namespace Pos.Api.Features.Section.Table.GetAll;

public class Endpoint : Endpoint<Request, List<Pos.Api.Entities.Table>>
{
    private readonly AppDbContext _dbContext;

    public Endpoint(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public override void Configure()
    {
        Get("/section/tables");
    }

    public override async Task HandleAsync(Request req, CancellationToken ct)
    {
        var tables = await _dbContext.Table.Where(s => s.SectionId == req.SectionId && s.IsDeleted != true).OrderBy(x => x.Name).ToListAsync();

        await Send.OkAsync(tables);
    }
}
