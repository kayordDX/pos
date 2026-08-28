using FluentValidation;

namespace Pos.Api.Features.Business.Create;

public class Request
{
    public string Name { get; set; } = string.Empty;
}

public class Validator : Validator<Request>
{
    public Validator()
    {
        RuleFor(v => v.Name).NotEmpty().WithMessage("Name is required");
    }
}
