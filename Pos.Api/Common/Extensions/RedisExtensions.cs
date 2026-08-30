using Pos.Api.Services;
using StackExchange.Redis;

namespace Pos.Api.Common.Extensions;

public static class RedisExtensions
{
    public static IServiceCollection ConfigureRedis(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddStackExchangeRedisCache(o =>
        {
            o.Configuration = configuration.GetConnectionString("Redis");
        });

        services.AddSingleton<RedisClient>();
        return services;
    }
}
