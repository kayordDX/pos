using System.Security.Claims;
using System.Security.Cryptography;
using System.Text.Encodings.Web;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;
using Pos.Api.Common.Printer;
using Pos.Api.Data;

namespace Pos.Api.Features.Auth;

public class PrinterKeyAuthenticationHandler : AuthenticationHandler<AuthenticationSchemeOptions>
{
    private static readonly TimeSpan AuthCacheTtl = TimeSpan.FromMinutes(5);

    private readonly AppDbContext _dbContext;
    private readonly IMemoryCache _memoryCache;

    public PrinterKeyAuthenticationHandler(
        IOptionsMonitor<AuthenticationSchemeOptions> options,
        ILoggerFactory logger,
        UrlEncoder encoder,
        AppDbContext dbContext,
        IMemoryCache memoryCache
    )
        : base(options, logger, encoder)
    {
        _dbContext = dbContext;
        _memoryCache = memoryCache;
    }

    protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
    {
        string? token = GetToken();
        if (string.IsNullOrWhiteSpace(token) || !token.StartsWith("kpos_", StringComparison.Ordinal))
        {
            return AuthenticateResult.NoResult();
        }

        int separatorIndex = token.IndexOf('.');
        if (separatorIndex <= 5 || separatorIndex == token.Length - 1)
        {
            return AuthenticateResult.Fail("Invalid printer key format.");
        }

        string prefixedKeyId = token[..separatorIndex];
        string keyId = prefixedKeyId["kpos_".Length..];
        string secret = token[(separatorIndex + 1)..];

        byte[] secretBytes;
        try
        {
            secretBytes = WebEncoders.Base64UrlDecode(secret);
        }
        catch (FormatException)
        {
            return AuthenticateResult.Fail("Invalid printer key secret.");
        }

        var cachedKey = await GetValidatedKeyAsync(keyId);
        if (cachedKey == null)
        {
            return AuthenticateResult.Fail("Invalid printer key.");
        }

        string secretHash = Convert.ToHexString(SHA256.HashData(secretBytes));
        if (!CryptographicOperations.FixedTimeEquals(Convert.FromHexString(secretHash), Convert.FromHexString(cachedKey.SecretHash)))
        {
            return AuthenticateResult.Fail("Invalid printer key.");
        }

        var claims = new[]
        {
            new Claim(Constants.Claim.OutletId, cachedKey.OutletId.ToString()),
            new Claim(Constants.Claim.DeviceId, cachedKey.DeviceId.ToString()),
            new Claim(Constants.Claim.KeyId, cachedKey.KeyId),
        };
        var identity = new ClaimsIdentity(claims, Scheme.Name);
        var principal = new ClaimsPrincipal(identity);
        var ticket = new AuthenticationTicket(principal, Scheme.Name);

        return AuthenticateResult.Success(ticket);
    }

    private string? GetToken()
    {
        string authorization = Request.Headers.Authorization.ToString().Trim();
        if (!string.IsNullOrWhiteSpace(authorization))
        {
            const string bearerPrefix = "Bearer ";
            if (authorization.StartsWith(bearerPrefix, StringComparison.OrdinalIgnoreCase))
            {
                return authorization[bearerPrefix.Length..].Trim();
            }

            return authorization;
        }

        string queryToken = Request.Query["access_token"].ToString().Trim();
        return string.IsNullOrWhiteSpace(queryToken) ? null : queryToken;
    }

    private async Task<ValidatedKey?> GetValidatedKeyAsync(string keyId)
    {
        if (_memoryCache.TryGetValue(PrinterCacheKeys.Auth(keyId), out ValidatedKey? cachedKey) && cachedKey != null)
        {
            return cachedKey;
        }

        var key = await _dbContext
            .Device.AsNoTracking()
            .Where(x => x.KeyId == keyId)
            .Select(x => new ValidatedKey
            {
                OutletId = x.OutletId,
                DeviceId = x.Id,
                KeyId = x.KeyId!,
                SecretHash = x.SecretHash!,
                RevokedAt = x.RevokedAt,
            })
            .FirstOrDefaultAsync();

        if (key == null || key.RevokedAt != null || key.SecretHash.Length == 0)
        {
            return null;
        }

        _memoryCache.Set(PrinterCacheKeys.Auth(keyId), key, new MemoryCacheEntryOptions { SlidingExpiration = AuthCacheTtl });

        return key;
    }

    private class ValidatedKey
    {
        public int OutletId { get; set; }
        public int DeviceId { get; set; }
        public string KeyId { get; set; } = string.Empty;
        public string SecretHash { get; set; } = string.Empty;
        public DateTime? RevokedAt { get; set; }
    }
}
