using FluentValidation;

namespace Pos.Api.Features.Section.Table.GetAll;

public class Request
{
    public int SectionId { get; set; }
}

public class Validator : Validator<Request>
{
    public Validator()
    {
        RuleFor(v => v.SectionId).GreaterThan(0).WithMessage("SectionId must be greater than 0");
    }
}
