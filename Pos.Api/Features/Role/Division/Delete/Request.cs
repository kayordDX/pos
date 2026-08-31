using FluentValidation;

namespace Pos.Api.Features.Role.Division.Delete;

public class Request
{
    public int RoleId { get; set; }
    public int DivisionId { get; set; }
}
