using FluentValidation;

namespace Pos.Api.Features.Printer.PrintResults;

public class Request
{
    public int OutletId { get; set; }
    public int DeviceId { get; set; }
    public string JobId { get; set; } = string.Empty;
}

public class Validator : Validator<Request>
{
    public Validator()
    {
        RuleFor(v => v.OutletId).NotEmpty().WithMessage("OutletId is required");
        RuleFor(v => v.DeviceId).NotEmpty().WithMessage("DeviceId is required");
        RuleFor(v => v.JobId).NotEmpty().WithMessage("JobId is required");
    }
}
