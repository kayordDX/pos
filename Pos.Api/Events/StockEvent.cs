namespace Pos.Api.Events;

public class StockEvent : IEvent
{
    public List<int> OrderItemIds { get; set; } = new();
    public bool IsReverse { get; set; }
}
