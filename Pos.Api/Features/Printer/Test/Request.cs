using FluentValidation;

namespace Pos.Api.Features.Printer.Test;

public class Request
{
    public int PrinterId { get; set; }
}

public class Validator : Validator<Request>
{
    public Validator()
    {
        RuleFor(v => v.PrinterId).NotEmpty().WithMessage("PrinterId is required");
    }
}