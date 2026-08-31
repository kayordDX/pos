using Pos.Api.DTO;

namespace Pos.Api.Features.Table.GetBooked;

public class Response
{
    public int Id { get; set; }
    public int TableId { get; set; }

    public string BookingName { get; set; } = string.Empty;
    public DateTime BookingDate { get; set; } = DateTime.UtcNow;
    public int SalesPeriodId { get; set; }

    public int StaffId { get; set; }
    public TableDto Table { get; set; } = default!;

    public UserDTO User { get; set; } = default!;
}
