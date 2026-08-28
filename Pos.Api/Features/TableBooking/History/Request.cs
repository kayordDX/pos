using Pos.Api.Common.Models;

namespace Pos.Api.Features.TableBooking.History;

public class Request : QueryModel
{
    public int TableBookingId { get; set; }
}
