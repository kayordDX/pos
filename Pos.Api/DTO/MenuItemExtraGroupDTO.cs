namespace Pos.Api.DTO;

public class MenuItemExtraGroupDTO
{
    public int MenuItemId { get; set; }
    public int ExtraGroupId { get; set; }
    public ExtraGroupDTO ExtraGroup { get; set; } = default!;
}
