using FluentValidation;

namespace Pos.Api.Features.Printer.DeviceInfo;

public class Request
{
    public int DeviceId { get; set; } = 1;
}

public class Validator : Validator<Request>
{
    public Validator()
    {
        RuleFor(x => x.DeviceId).GreaterThan(0).WithMessage("DeviceId is required");
    }
}
