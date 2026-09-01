using Microsoft.EntityFrameworkCore;
using Pos.Api.Data;
using Pos.Api.Entities;

namespace Pos.Api.Features.Menu.GetOutletMenu;

public class GetOutletMenusEndpoint : Endpoint<Request, List<Pos.Api.Entities.Menu>>
{
    private readonly AppDbContext _dbContext;

    public GetOutletMenusEndpoint(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public override void Configure()
    {
        Get("/menu/outletMenus");
    }

    public override async Task HandleAsync(Request req, CancellationToken ct)
    {
        var menus = await _dbContext
            .Menu.AsNoTracking()
            .Where(m => m.OutletId == req.OutletId)
            .Include(m => m.MenuSections!)
                .ThenInclude(s => s.MenuItems!)
                    .ThenInclude(mi => mi.Tags)
            .Include(m => m.MenuSections!)
                .ThenInclude(s => s.SubMenuSections!)
                    .ThenInclude(ss => ss.MenuItems!)
                        .ThenInclude(mi => mi.Tags)
            .AsSplitQuery()
            .ToListAsync();

        await Send.OkAsync(menus);
    }
}
