using FluentValidation;

namespace Pos.Api.Features.Outlet.Counter.Delete;

public class Request
{
    public Guid DeviceId { get; set; }
}

public class Validator : Validator<Request>
{
    public Validator()
    {
        RuleFor(v => v.DeviceId).NotEmpty().WithMessage("DeviceId is required");
    }
}