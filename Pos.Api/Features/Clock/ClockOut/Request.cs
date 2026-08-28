using FluentValidation;

namespace Pos.Api.Features.Clock.ClockOut;

public class Request
{
    public int OutletId { get; set; }
}
