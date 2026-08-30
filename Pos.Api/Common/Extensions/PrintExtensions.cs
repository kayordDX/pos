using Pos.Api.Services;
using StackExchange.Redis;

namespace Pos.Api.Common.Extensions;

public static class PrintExtensions
{
    public static IServiceCollection ConfigurePrint(this IServiceCollection services)
    {
        services.AddSingleton<PrintService>();
        return services;
    }
}
