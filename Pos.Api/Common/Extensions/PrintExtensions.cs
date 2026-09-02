using Pos.Api.Services;

namespace Pos.Api.Common.Extensions;

public static class PrintExtensions
{
    public static IServiceCollection ConfigurePrint(this IServiceCollection services)
    {
        services.AddSingleton<PrintService>();
        services.AddSingleton<Hubs.PrinterConnectionTracker>();
        services.AddSingleton<Hubs.PrinterProbeCache>();
        services.AddScoped<PrinterTargetService>();
        return services;
    }
}
