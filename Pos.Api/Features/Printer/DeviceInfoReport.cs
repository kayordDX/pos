namespace Pos.Api.Features.Printer;

// Mirrors print-service internal/model.DeviceInfo (Go). The device sends
// this via ReportDeviceInfo; casing differences are absorbed by the
// case-insensitive SignalR JSON binding.
public class DeviceInfoReport
{
    public string Hostname { get; set; } = string.Empty;
    public string Platform { get; set; } = string.Empty;
    public string? OsVersion { get; set; }
    public string? GoVersion { get; set; }
    public string? AppVersion { get; set; }
    public int NumCpu { get; set; }
    public long UptimeSeconds { get; set; }
    public List<DeviceInterface> Interfaces { get; set; } = [];

    public class DeviceInterface
    {
        public string Name { get; set; } = string.Empty;
        public string? Mac { get; set; }
        public List<string> Ipv4 { get; set; } = [];
        public List<string> Ipv6 { get; set; } = [];
    }
}
