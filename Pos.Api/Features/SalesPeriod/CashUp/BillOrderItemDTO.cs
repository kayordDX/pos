using Pos.Api.DTO;

namespace Pos.Api.Features.SalesPeriod.CashUp;

public class BillOrderItemDTO
{
    public int OrderItemId { get; set; }
    public int TableBookingId { get; set; }
    public TableBookingDTO TableBooking { get; set; } = default!;
    public int MenuItemId { get; set; }
    public BillMenuItemDTO MenuItem { get; set; } = default!;
    public decimal UnitPrice { get; set; }
    public string Name { get; set; } = string.Empty;
    public List<OrderItemOptionDTO>? OrderItemOptions { get; set; }
    public List<OrderItemExtraDTO>? OrderItemExtras { get; set; }
    public string UserId { get; set; } = string.Empty;
    public string? Note { get; set; }
}
