using Pos.Api.Features.Manager.OrderView;

namespace Pos.Api.DTO;

public class StockAllocateDTO : StockAllocateDTOBasic
{
    public List<StockAllocateItemDTO>? StockAllocateItems { get; set; }
}
