namespace Pos.Api.Events;

public class PaymentCompletedEvent : IEvent
{
    public string PaymentReference { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public string UserId { get; set; } = string.Empty;
    public int TableBookingId { get; set; }
}
