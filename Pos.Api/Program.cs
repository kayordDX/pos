using Microsoft.AspNetCore.Authorization;
using Pos.Api;
using Pos.Api.Common.Extensions;
using Pos.Api.Common.Extensions.Cors;
using Pos.Api.Common.Extensions.Health;
using Pos.Api.Hubs;
using TickerQ.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);
builder.Services.ConfigureApi();
builder.Services.ConfigureRedis(builder.Configuration);
builder.Services.ConfigureConfig(builder.Configuration);
builder.Services.ConfigurePrint();

builder.Logging.ConfigureLogging();
builder.Services.ConfigureTelemetry();

var factory = LoggerFactory.Create(builder =>
{
    builder.AddConsole();
});
var logger = factory.CreateLogger<Program>();
builder.Services.ConfigureFirebase(builder.Environment, logger);

builder.Services.ConfigureHalo(builder.Configuration);
builder.Services.ConfigureWhatsapp(builder.Configuration);
builder.Services.ConfigureAI(builder.Configuration);

var corsSection = builder.Configuration.GetSection("Cors");
builder.Services.ConfigureCors(corsSection.Get<string[]>() ?? [""]);

builder.Services.ConfigureAuth(builder.Configuration);
builder.Services.ConfigureEF(builder.Configuration, builder.Environment);
builder.Services.ConfigureHealth(builder.Configuration);
builder.Services.ConfigureTickerQ(builder.Configuration);

builder.Services.ConfigureGeneral(builder.Configuration);

builder.Services.AddSignalR().AddStackExchangeRedis(builder.Configuration.GetConnectionString("Redis")!);

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    var appConfig = builder.Configuration.GetSection("App");
    var encKey = appConfig["EncryptionKey"];
    var encSalt = appConfig["EncryptionSalt"];
    if (string.IsNullOrEmpty(encKey) || encKey == "Your16CharKeyHere")
        throw new InvalidOperationException("App:EncryptionKey must be set to a secure value for non-development environments.");
    if (string.IsNullOrEmpty(encSalt) || encSalt == "Your16CharSaltHere")
        throw new InvalidOperationException("App:EncryptionSalt must be set to a secure value for non-development environments.");
}

await app.Services.ApplyMigrations(app.Environment, app.Lifetime.ApplicationStopping);

app.UseCorsKayord();
app.UseAuthentication();
app.UseAuthorization();
app.UseApi();
app.UseHealth();
app.MapHub<KayordHub>("/hub").RequireAuthorization();
app.MapHub<PrinterHub>("/printer-hub").RequireAuthorization(new AuthorizeAttribute { AuthenticationSchemes = Constants.Policy.PrinterKeyScheme });
app.UseTickerQ();
app.Run();

public partial class Program { }
