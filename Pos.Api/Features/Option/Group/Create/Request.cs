namespace Pos.Api.Features.Option.Group.Create;

public class Request
{
    public string Name { get; set; } = string.Empty;
    public int MinSelections { get; set; }
    public int MaxSelections { get; set; }
    public int OutletId { get; set; }
}
