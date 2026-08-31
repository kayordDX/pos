namespace Pos.Api.Features.TableOrder.GetBasket;

public class BillMenuItemDTO
{
    public int MenuItemId { get; set; }
    public string Name { get; set; } = string.Empty;
    public decimal Price { get; set; }
}
