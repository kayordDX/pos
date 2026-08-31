using Humanizer;
using Pos.Api.DTO;

namespace Pos.Api.Features.Manager.OrderView;

public class OrderItemStatusDTO
{
    public int OrderItemStatusId { get; set; }
    public string Status { get; set; } = string.Empty;
}
