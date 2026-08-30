using FluentValidation;

namespace Pos.Api.Features.PrintServiceKey.Revoke;

public class Request
{
    public int Id { get; set; }
}

public class Validator : Validator<Request>
{
    public Validator()
    {
        RuleFor(x => x.Id).GreaterThan(0);
    }
}
