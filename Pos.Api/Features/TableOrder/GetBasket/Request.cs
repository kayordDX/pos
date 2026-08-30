using FluentValidation;

namespace Pos.Api.Features.TableOrder.GetBasket;

public class Request
{
    public int TableBookingId { get; set; } = default!;
}
