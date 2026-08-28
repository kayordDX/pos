using Pos.Api.Data;
using Pos.Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace Pos.Api.Features.Order.ClearBasket;

public class Endpoint : Endpoint<Request, Pos.Api.Entities.OrderItem>
{
    private readonly AppDbContext _dbContext;

    public Endpoint(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public override void Configure()
    {
        Delete("/order/clearBasket");
    }

    public override async Task HandleAsync(Request req, CancellationToken ct)
    {
        List<OrderItem>? entities = await _dbContext.OrderItem.Where(x => x.TableBookingId == req.TableBookingId && x.OrderItemStatusId == 1).ToListAsync(ct);
        if (entities != null)
        {
            _dbContext.RemoveRange(entities);
            await _dbContext.SaveChangesAsync(ct);
            await Send.OkAsync();
        }
        else
        {
            await Send.NotFoundAsync();
        }
    }
}
