using Microsoft.EntityFrameworkCore;
using Pos.Api.Data;
using Pos.Api.Entities;
using Pos.Api.Services;

namespace Pos.Api.Features.TableOrder.AddItems;

public class Endpoint(AppDbContext dbContext, CurrentUserService cu) : Endpoint<Request, OrderItem>
{
    private readonly AppDbContext _dbContext = dbContext;
    private readonly CurrentUserService _cu = cu;

    public override void Configure()
    {
        Post("/order/addItems");
    }

    public override async Task HandleAsync(Request req, CancellationToken ct)
    {
        var tableBooking = await _dbContext.TableBooking.Include(x => x.SalesPeriod).FirstOrDefaultAsync(x => x.Id == req.TableBookingId, ct);

        if (tableBooking == null)
        {
            throw new Exception("No booking found");
        }
        else
        {
            if (tableBooking.CloseDate != null)
            {
                ValidationContext.Instance.ThrowError("Table is closed");
            }
        }

        int tableBookingOutletId = tableBooking.SalesPeriod.OutletId;

        Dictionary<int, Entities.MenuItem> menuItemsById = new();
        OrderItem orderItem = new();
        foreach (Order order in req.Orders)
        {
            if (!menuItemsById.TryGetValue(order.MenuItemId, out Entities.MenuItem? menuItem))
            {
                menuItem = await _dbContext
                    .MenuItem.Include(x => x.MenuSection)!
                        .ThenInclude(x => x.Menu)
                    .FirstOrDefaultAsync(x => x.MenuItemId == order.MenuItemId, ct);

                if (menuItem == null)
                {
                    await Send.NotFoundAsync(ct);
                    return;
                }

                menuItemsById[order.MenuItemId] = menuItem;
            }

            for (int q = 1; q <= order.Quantity; q++)
            {
                int menuOutletId = menuItem.MenuSection.Menu.OutletId;

                if (tableBookingOutletId != menuOutletId)
                {
                    throw new Exception("Outlet mismatch");
                }

                List<Entities.Option> Options = [];

                orderItem = new OrderItem()
                {
                    TableBookingId = req.TableBookingId,
                    MenuItemId = order.MenuItemId,
                    OrderItemStatusId = 1,
                    Note = order.Note,
                    UserId = _cu.UserId,
                };

                if (order.OptionIds != null)
                {
                    List<OrderItemOption> orderItemOptions = [];

                    foreach (var i in order.OptionIds)
                    {
                        OrderItemOption o = new() { OrderItemId = orderItem.OrderItemId, OptionId = i };
                        orderItemOptions.Add(o);
                    }
                    orderItem.OrderItemOptions = orderItemOptions;
                }
                if (order.ExtraIds != null)
                {
                    List<OrderItemExtra> orderItemExtra = [];
                    foreach (int i in order.ExtraIds)
                    {
                        OrderItemExtra e = new() { OrderItemId = orderItem.OrderItemId, ExtraId = i };
                        orderItemExtra.Add(e);
                    }
                    orderItem.OrderItemExtras = orderItemExtra;
                }

                await _dbContext.OrderItem.AddAsync(orderItem, ct);
            }
        }

        await _dbContext.SaveChangesAsync(ct);

        if (orderItem.OrderItemId > 0)
            await Send.NoContentAsync(ct);
        else
            await Send.ErrorsAsync(500, ct);
    }
}
