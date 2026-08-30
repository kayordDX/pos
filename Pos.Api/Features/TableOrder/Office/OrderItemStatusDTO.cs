using Humanizer;
using Pos.Api.DTO;

namespace Pos.Api.Features.TableOrder.Office;

public class OrderItemStatusDTO
{
    public int OrderItemStatusId { get; set; }
    public string Status { get; set; } = string.Empty;
}
