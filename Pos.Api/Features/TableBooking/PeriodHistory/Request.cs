using Pos.Api.Common.Models;

namespace Pos.Api.Features.TableBooking.PeriodHistory;

public class Request : QueryModel
{
    public int TableBookingId { get; set; }
    public int SalesPeriodId { get; set; }
}
