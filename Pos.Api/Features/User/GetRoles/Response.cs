namespace Pos.Api.Features.User.GetRoles;

public class Response
{
    public List<string> Roles { get; set; } = new List<string>();
    public string ErrorMessage { get; set; } = string.Empty;
}
