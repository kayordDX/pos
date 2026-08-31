using Microsoft.AspNetCore.SignalR;
using Pos.Api.Hubs;
using Pos.Api.Services;
using QuestPDF.Infrastructure;

namespace Pos.Api.Common.Extensions;

public static class GeneralExtensions
{
    public static IServiceCollection ConfigureGeneral(this IServiceCollection services, IConfiguration configuration)
    {
        QuestPDF.Settings.License = LicenseType.Community;

        services.AddSingleton<CurrentUserService>();
        services.AddHttpClient<UserService>();
        services.AddTransient<IEmailSender, EmailService>();
        services.AddSingleton<IUserIdProvider, UserProvider>();
        services.AddSingleton<EncryptionService>();
        services.AddTransient<NotificationService>();

        return services;
    }
}
