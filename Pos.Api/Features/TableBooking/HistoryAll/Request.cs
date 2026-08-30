using Pos.Api.Common.Models;

namespace Pos.Api.Features.TableBooking.HistoryAll;

public class Request : QueryModel
{
    public int TableBookingId { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
}
