using System.Security.Cryptography;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using Pos.Api.Data;

namespace Pos.Api.Features.Device;

public static class DeviceKeys
{
    public static string Mask(string keyId)
    {
        int prefixLength = Math.Min(keyId.Length, 7);
        return $"kpos_{keyId[..prefixLength]}…";
    }

    public static string FormatFull(string keyId, string secret) => $"kpos_{keyId}.{secret}";

    public static async Task<(string KeyId, string Secret, string SecretHash)> GenerateAsync(AppDbContext dbContext, CancellationToken ct)
    {
        byte[] secretBytes = RandomNumberGenerator.GetBytes(32);
        string secret = WebEncoders.Base64UrlEncode(secretBytes);
        string secretHash = Convert.ToHexString(SHA256.HashData(secretBytes));

        while (true)
        {
            string keyId = $"pk_{Convert.ToHexString(RandomNumberGenerator.GetBytes(4)).ToLowerInvariant()}";
            bool exists = await dbContext.Device.AnyAsync(x => x.KeyId == keyId, ct);
            if (!exists)
            {
                return (keyId, secret, secretHash);
            }
        }
    }
}
