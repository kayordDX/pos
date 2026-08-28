using Pos.Api.Features.Manager.OrderView;

namespace Pos.Api.DTO;

public class StockItemDTO
{
    public DivisionDTO Division { get; set; } = default!;
    public decimal Threshold { get; set; }
    public decimal Actual { get; set; }
}
