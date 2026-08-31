using Pos.Api.DTO;

namespace Pos.Api.Features.TableOrder.Office.OrderBased.Back;

public class OrderGroupDTO
{
    public int OrderGroupId { get; set; }
    public DateTime LastDate { get; set; }
    public int Priority { get; set; }
    public TableBookingDTO? TableBooking { get; set; }
    public int TableBookingId { get; set; }
    public List<OrderItemDTO>? OrderItems { get; set; }
}
