namespace Pos.Api.Features.PrintServiceKey;

public static class PrintServiceKeyMask
{
    public static string MaskKey(string keyId)
    {
        int prefixLength = Math.Min(keyId.Length, 7);
        return $"kpos_{keyId[..prefixLength]}…";
    }
}
