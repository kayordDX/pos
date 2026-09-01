using System.Text.Json;
using Pos.Api.Features.Printer;
using Xunit;

namespace Unit.Print;

// The print-service (Go) sends DeviceInfo as camelCase JSON via ReportDeviceInfo.
// The hub re-serializes the bound DTO with JsonSerializerOptions.Web into the
// cache, where the DeviceInfoResults endpoint reads it back.
public class DeviceInfoReportTest
{
    private const string GoJson = """
        {
          "hostname": "printbox",
          "platform": "linux/arm64",
          "osVersion": "Debian GNU/Linux 12 (bookworm)",
          "goVersion": "go1.24.1",
          "appVersion": "v1.2.3",
          "numCpu": 4,
          "uptimeSeconds": 3600,
          "interfaces": [
            { "name": "eth0", "mac": "aa:bb:cc:dd:ee:ff", "ipv4": ["192.168.1.23"], "ipv6": ["fe80::1234"] },
            { "name": "wg0" }
          ]
        }
        """;

    [Fact]
    public void BindsGoJsonAndRoundTripsThroughCache()
    {
        DeviceInfoReport? report = JsonSerializer.Deserialize<DeviceInfoReport>(GoJson, JsonSerializerOptions.Web);

        Assert.NotNull(report);
        Assert.Equal("printbox", report.Hostname);
        Assert.Equal("linux/arm64", report.Platform);
        Assert.Equal(4, report.NumCpu);
        Assert.Equal(3600, report.UptimeSeconds);
        Assert.Equal(2, report.Interfaces.Count);
        Assert.Equal("eth0", report.Interfaces[0].Name);
        Assert.Equal("wg0", report.Interfaces[1].Name);
        Assert.Empty(report.Interfaces[1].Ipv4);

        string cached = JsonSerializer.Serialize(report, JsonSerializerOptions.Web);
        var readBack = JsonSerializer.Deserialize<Pos.Api.Features.Printer.DeviceInfoResults.Results>(cached, JsonSerializerOptions.Web);

        Assert.NotNull(readBack);
        Assert.Equal("printbox", readBack.Hostname);
        Assert.Equal("linux/arm64", readBack.Platform);
        Assert.Equal("Debian GNU/Linux 12 (bookworm)", readBack.OsVersion);
        Assert.Equal("v1.2.3", readBack.AppVersion);
        Assert.Equal(4, readBack.NumCpu);
        Assert.Equal(3600, readBack.UptimeSeconds);
        Assert.Equal(2, readBack.Interfaces.Count);
        Assert.Equal("wg0", readBack.Interfaces[1].Name);
        Assert.Contains("192.168.1.23", readBack.Interfaces[0].Ipv4);
    }
}
