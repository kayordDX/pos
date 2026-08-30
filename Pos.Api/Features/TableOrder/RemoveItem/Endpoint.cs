using Pos.Api.Data;
using Pos.Api.Entities;

namespace Pos.Api.Features.TableOrder.RemoveItem;

public class Endpoint : Endpoint<Request, Response>
{
    private readonly AppDbContext _dbContext;

    public Endpoint(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public override void Configure()
    {
        Post("/order/removeItem");
    }

    public override async Task HandleAsync(Request req, CancellationToken ct)
    {
        OrderItem? entity = await _dbContext.OrderItem.FindAsync(req.OrderItemId);
        if (entity != null)
        {
            _dbContext.Remove(entity);
            await _dbContext.SaveChangesAsync();
            await Send.OkAsync(new Response() { IsSuccess = true });
        }
        else
        {
            await Send.OkAsync(new Response() { IsSuccess = false });
        }
    }
}