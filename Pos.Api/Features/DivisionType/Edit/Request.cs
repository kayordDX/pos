using FluentValidation;

namespace Pos.Api.Features.DivisionType.Edit;

public class Request
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
}

public class Validator : Validator<Request>
{
    public Validator()
    {
        RuleFor(v => v.Name).NotEmpty().WithMessage("Name is required");
    }
}
