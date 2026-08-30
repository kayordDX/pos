using Pos.Api.Common.Models;

namespace Pos.Api.Features.TableBooking.HistoryUser;

public class Request : QueryModel
{
    public string UserId { get; set; } = string.Empty;
    public int CashUpUserId { get; set; }
    public int TableBookingId { get; set; }
    public int OutletId { get; set; }
}
