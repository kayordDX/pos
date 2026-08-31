namespace Pos.Api;

public static class Constants
{
    public static class Policy
    {
        public const string Manager = "manager";
        public const string Feature = "feature";
        public const string PrinterKeyScheme = "PrinterKey";
    }

    public static class RateLimitPolicy
    {
        public const string PinLogin = "pin-login";
    }

    public static class Claim
    {
        public const string OutletId = "outlet_id";
        public const string DeviceId = "device_id";
        public const string KeyId = "key_id";
    }
}
