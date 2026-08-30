namespace Pos.Api.Features.TableOrder.UpdateGroupOrder;

public class Request
{
    public int OrderGroupId { get; set; }
    public int OrderItemStatusId { get; set; }
    public string? DivisionIds { get; set; }
}
