using Pos.Api.DTO;

namespace Pos.Api.Common.Extensions;

public static class BillSnapshotExtensions
{
    public static List<Features.TableOrder.GetBill.BillOrderItemDTO> ApplySnapshots(this List<Features.TableOrder.GetBill.BillOrderItemDTO> items)
    {
        foreach (var item in items)
        {
            item.MenuItem.Price = item.UnitPrice;
            item.MenuItem.Name = item.Name;
            ApplyOptionExtras(item.OrderItemOptions, item.OrderItemExtras);
        }
        return items;
    }

    public static List<Features.TableOrder.GetBasket.BillOrderItemDTO> ApplySnapshots(this List<Features.TableOrder.GetBasket.BillOrderItemDTO> items)
    {
        foreach (var item in items)
        {
            item.MenuItem.Price = item.UnitPrice;
            item.MenuItem.Name = item.Name;
            ApplyOptionExtras(item.OrderItemOptions, item.OrderItemExtras);
        }
        return items;
    }

    public static List<Features.Bill.BillOrderItemDTO> ApplySnapshots(this List<Features.Bill.BillOrderItemDTO> items)
    {
        foreach (var item in items)
        {
            item.MenuItem.Price = item.UnitPrice;
            item.MenuItem.Name = item.Name;
            ApplyOptionExtras(item.OrderItemOptions, item.OrderItemExtras);
        }
        return items;
    }

    public static List<Features.SalesPeriod.CashUp.BillOrderItemDTO> ApplySnapshots(this List<Features.SalesPeriod.CashUp.BillOrderItemDTO> items)
    {
        foreach (var item in items)
        {
            item.MenuItem.Price = item.UnitPrice;
            item.MenuItem.Name = item.Name;
            ApplyOptionExtras(item.OrderItemOptions, item.OrderItemExtras);
        }
        return items;
    }

    private static void ApplyOptionExtras(List<OrderItemOptionDTO>? options, List<OrderItemExtraDTO>? extras)
    {
        if (options != null)
        {
            foreach (var option in options)
            {
                option.Option.Price = option.Price;
                option.Option.Name = option.Name;
            }
        }
        if (extras != null)
        {
            foreach (var extra in extras)
            {
                extra.Extra.Price = extra.Price;
                extra.Extra.Name = extra.Name;
            }
        }
    }
}
