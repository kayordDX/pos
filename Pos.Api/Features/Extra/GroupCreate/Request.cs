namespace Pos.Api.Features.Extra.GroupCreate;

public class Request
{
    public string Name { get; set; } = string.Empty;
    public bool IsGlobal { get; set; }
}
