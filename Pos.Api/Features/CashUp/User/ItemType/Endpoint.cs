using Microsoft.EntityFrameworkCore;
using Pos.Api.Data;

namespace Pos.Api.Features.CashUp.User.ItemType;

public class Endpoint : Endpoint<Request, List<Entities.CashUpUserItemType>>
{
    private readonly AppDbContext _dbContext;

    public Endpoint(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public override void Configure()
    {
        Get("/cashUp/user/itemType");
    }

    public override async Task HandleAsync(Request r, CancellationToken ct)
    {
        var result = await _dbContext.CashUpUserItemType.Where(x => x.IsAuto == r.IsAuto).ToListAsync();
        await Send.OkAsync(result);
    }
}
