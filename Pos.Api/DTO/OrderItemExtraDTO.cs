using Pos.Api.Entities;

namespace Pos.Api.DTO;

public class OrderItemExtraDTO
{
    public int OrderItemExtraId { get; set; }
    public int OrderItemId { get; set; }
    public int ExtraId { get; set; }
    public ExtraDTO Extra { get; set; } = default!;
}
