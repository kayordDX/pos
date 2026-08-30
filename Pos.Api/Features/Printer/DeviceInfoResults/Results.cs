namespace Pos.Api.Features.Printer.DeviceInfoResults;

public class Results
{
    public string? Hostname { get; set; }
    public string? Platform { get; set; }
    public string? OsVersion { get; set; }
    public string? GoVersion { get; set; }
    public string? AppVersion { get; set; }
    public int NumCpu { get; set; }
    public long UptimeSeconds { get; set; }
    public List<DeviceInterface> Interfaces { get; set; } = [];

    public class DeviceInterface
    {
        public string Name { get; set; } = string.Empty;
        public string Mac { get; set; } = string.Empty;
        public List<string> Ipv4 { get; set; } = [];
        public List<string> Ipv6 { get; set; } = [];
    }
}
