namespace Pos.Api.Entities;

public class OrderItemOption
{
    public int OrderItemOptionId { get; set; }
    public int OrderItemId { get; set; }
    public OrderItem OrderItem { get; set; } = default!;
    public int OptionId { get; set; }
    public Option Option { get; set; } = default!;
    public decimal Price { get; set; }
    public string Name { get; set; } = string.Empty;
}
