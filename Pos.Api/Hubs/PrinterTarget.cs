namespace Pos.Api.Hubs;

public class PrinterTarget
{
    public int PrinterId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string IPAddress { get; set; } = string.Empty;
    public int Port { get; set; }
}
