using FluentValidation;

namespace Pos.Api.Features.Table.GetBooked;

public class Request
{
    public int OutletId { get; set; }
    public bool MyBooking { get; set; }

}

public class Validator : Validator<Request>
{
    public Validator()
    {
        RuleFor(v => v.OutletId).NotEmpty().WithMessage("OutletId is required");
    }
}
