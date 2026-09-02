namespace Pos.Api.DTO;

public class OrderItemOptionDTO
{
    public int OrderItemOptionId { get; set; }
    public int OrderItemId { get; set; }
    public int OptionId { get; set; }
    public OptionDTO Option { get; set; } = default!;
    public decimal Price { get; set; }
    public string Name { get; set; } = string.Empty;
}
