namespace Pos.Api.Entities;

public class OrderItemExtra
{
    public int OrderItemExtraId { get; set; }
    public int OrderItemId { get; set; }
    public OrderItem OrderItem { get; set; } = default!;
    public int ExtraId { get; set; }
    public Extra Extra { get; set; } = default!;
    public decimal Price { get; set; }
    public string Name { get; set; } = string.Empty;
}
