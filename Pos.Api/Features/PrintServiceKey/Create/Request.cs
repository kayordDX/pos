using FluentValidation;

namespace Pos.Api.Features.PrintServiceKey.Create;

public class Request
{
    public int OutletId { get; set; }
    public int DeviceId { get; set; } = 1;
    public string Name { get; set; } = string.Empty;
}

public class Validator : Validator<Request>
{
    public Validator()
    {
        RuleFor(x => x.OutletId).GreaterThan(0);
        RuleFor(x => x.DeviceId).GreaterThan(0);
        RuleFor(x => x.Name).NotEmpty().MaximumLength(200);
    }
}
