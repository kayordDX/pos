namespace Pos.Api.Features.Printer;

// Mirrors what the device reports via PrinterHub.ReportPrintResult.
public class PrintResult
{
    public string JobId { get; set; } = string.Empty;
    public bool Ok { get; set; }
    public string Detail { get; set; } = string.Empty;
}
