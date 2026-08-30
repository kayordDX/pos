namespace Pos.Api.Common.Printer;

public static class PrinterCacheKeys
{
    public static string Auth(string keyId) => $"printerkey:{keyId}";
    public static string LastSeenThrottle(string keyId) => $"printerkey:lastseen:{keyId}";
    public static string ScanStatus(int outletId, int deviceId) => $"scan-status:{outletId}:{deviceId}";
    public static string ScanResult(int outletId, int deviceId) => $"scan-result:{outletId}:{deviceId}";
    public static string DeviceInfo(int outletId, int deviceId) => $"device-info:{outletId}:{deviceId}";
    public static string Targets(int outletId, int deviceId) => $"printer-targets:{outletId}:{deviceId}";
}
