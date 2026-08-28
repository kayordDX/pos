using FluentValidation;

namespace Pos.Api.Features.Table.GetMyBooked;

public class Request
{
    public int OutletId { get; set; }
    public bool myBooking { get; set; }

}

public class Validator : Validator<Request>
{
    public Validator()
    {
        RuleFor(v => v.OutletId).NotEmpty().WithMessage("OutletId is required");
    }
}
