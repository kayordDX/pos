using FluentValidation;

namespace Pos.Api.Features.Printer.Scan;

public class Request
{
    public int DeviceId { get; set; } = 1;
    public string IPAddress { get; set; } = string.Empty;
    public int Port { get; set; } = 9100;
}

public class Validator : Validator<Request>
{
    public Validator()
    {
        RuleFor(x => x.DeviceId).GreaterThan(0).WithMessage("DeviceId is required");
        RuleFor(x => x.IPAddress).NotEmpty().WithMessage("IPAddress is required")
            .MaximumLength(64).WithMessage("IPAddress must be 64 characters or fewer");
        RuleFor(x => x.Port).InclusiveBetween(1, 65535).WithMessage("Port must be between 1 and 65535");
    }
}
