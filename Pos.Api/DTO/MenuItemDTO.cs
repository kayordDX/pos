namespace Pos.Api.DTO;

using Pos.Api.Entities;

public class MenuItemDTO
{
    public int MenuItemId { get; set; }
    public int MenuSectionId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public int Position { get; set; }
    public ICollection<Tag>? Tags { get; set; }
    public int DivisionId { get; set; }
    public List<MenuItemOptionGroupDTO> MenuItemOptionGroups { get; set; } = [];
    public List<MenuItemExtraGroupDTO> MenuItemExtraGroups { get; set; } = [];
}
