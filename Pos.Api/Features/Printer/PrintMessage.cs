namespace Pos.Api.Features.Printer;

public class PrintMessage
{
    public string? Action { get; set; }
    public string PrinterName { get; set; } = string.Empty;
    public string IPAddress { get; set; } = "10.0.0.3";
    public int Port { get; set; } = 9100;
    public List<byte[]> PrintInstructions { get; set; } = [];

    // Echoed back by the device via ReportPrintResult for tracking/dedup.
    // Assigned by PrintService when empty; empty means the device skips reporting.
    public string? JobId { get; set; }
}
