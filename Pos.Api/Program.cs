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

await app.Services.ApplyMigrations(app.Environment, app.Lifetime.ApplicationStopping);

app.UseCorsKayord();
app.UseAuthentication();
app.UseAuthorization();
app.UseApi();
app.UseHealth();
// Authorization is enforced per hub method ([Authorize] on the class) so that
// unauthenticated devices can connect for the device-link (OTP) flow.
app.MapHub<KayordHub>("/hub");
app.MapHub<PrinterHub>("/printer-hub").RequireAuthorization(new AuthorizeAttribute { AuthenticationSchemes = Constants.Policy.PrinterKeyScheme });
app.UseTickerQ();
app.Run();

public partial class Program { }
