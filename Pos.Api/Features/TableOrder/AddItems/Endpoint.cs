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
                    .Include(x => x.BillCategory)
                    .FirstOrDefaultAsync(x => x.MenuItemId == order.MenuItemId, ct);

                if (menuItem == null)
                {
                    await Send.NotFoundAsync(ct);
                    return;
                }

                menuItemsById[order.MenuItemId] = menuItem;
            }

            Dictionary<int, Entities.Option>? optionsById = null;
            if (order.OptionIds != null)
            {
                optionsById = await _dbContext
                    .Option.AsNoTracking()
                    .Where(x => order.OptionIds.Contains(x.OptionId))
                    .ToDictionaryAsync(x => x.OptionId, ct);
            }
            Dictionary<int, Entities.Extra>? extrasById = null;
            if (order.ExtraIds != null)
            {
                extrasById = await _dbContext.Extra.AsNoTracking().Where(x => order.ExtraIds.Contains(x.ExtraId)).ToDictionaryAsync(x => x.ExtraId, ct);
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
                    UnitPrice = menuItem.Price,
                    Name = menuItem.Name,
                    BillCategoryId = menuItem.BillCategoryId,
                    BillCategoryName = menuItem.BillCategory?.Name ?? "Other",
                    OrderItemStatusId = 1,
                    Note = order.Note,
                    UserId = _cu.UserId,
                };

                if (order.OptionIds != null && optionsById != null)
                {
                    List<OrderItemOption> orderItemOptions = [];

                    foreach (var i in order.OptionIds)
                    {
                        OrderItemOption o = new() { OrderItemId = orderItem.OrderItemId, OptionId = i };
                        if (optionsById.TryGetValue(i, out Entities.Option? option))
                        {
                            o.Price = option.Price;
                            o.Name = option.Name;
                        }
                        orderItemOptions.Add(o);
                    }
                    orderItem.OrderItemOptions = orderItemOptions;
                }
                if (order.ExtraIds != null && extrasById != null)
                {
                    List<OrderItemExtra> orderItemExtra = [];
                    foreach (int i in order.ExtraIds)
                    {
                        OrderItemExtra e = new() { OrderItemId = orderItem.OrderItemId, ExtraId = i };
                        if (extrasById.TryGetValue(i, out Entities.Extra? extra))
                        {
                            e.Price = extra.Price;
                            e.Name = extra.Name;
                        }
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
