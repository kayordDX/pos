using FluentValidation;

namespace Pos.Api.Features.Printer.Probe;

public class Request
{
    public int PrinterId { get; set; }
}

public class Validator : Validator<Request>
{
    public Validator()
    {
        RuleFor(x => x.PrinterId).GreaterThan(0).WithMessage("PrinterId is required");
    }
}
