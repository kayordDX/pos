namespace Pos.Api.Events;

public class PrinterStatusChangedEvent
{
    public int OutletId { get; set; }
    public int PrinterId { get; set; }
    public bool? Reachable { get; set; }
    public bool Online { get; set; }
}
