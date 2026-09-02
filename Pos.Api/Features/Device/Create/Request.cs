using FluentValidation;

namespace Pos.Api.Features.Device.Create;

public class Request
{
    public string Name { get; set; } = string.Empty;
}

public class Validator : Validator<Request>
{
    public Validator()
    {
        RuleFor(x => x.Name).NotEmpty().MaximumLength(200);
    }
}
