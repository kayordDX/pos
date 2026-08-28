var builder = DistributedApplication.CreateBuilder(args);

var postgres = builder.AddPostgres("postgres").WithDataVolume().WithHostPort(5432);

var posDB = postgres.AddDatabase("kayord");

var cache = builder.AddRedis("cache");

// var mailpit = builder
//     .AddContainer("mailpit", "axllent/mailpit")
//     .WithEnvironment("MP_MAX_MESSAGES", "5000")
//     .WithEnvironment("MP_SMTP_AUTH_ACCEPT_ANY", "1")
//     .WithEnvironment("MP_SMTP_AUTH_ALLOW_INSECURE", "1")
//     .WithHttpEndpoint(port: 8025, targetPort: 8025, name: "http")
//     .WithEndpoint(port: 1025, targetPort: 1025, name: "smtp");

var web = builder.AddViteApp("web", "../client").WithPnpm().WithEnvironment("BROWSER", "none");
web.WithEndpoint(
    "http",
    e =>
    {
        e.Port = 5173;
        e.TargetPort = 5173;
        e.IsProxied = false;
    }
);

#pragma warning disable ASPIREBROWSERLOGS001
web = web.WithBrowserLogs();
#pragma warning restore ASPIREBROWSERLOGS001

var api = builder
    .AddProject("api", "../Pos.Api/Pos.Api.csproj")
    .WithReference(posDB)
    .WithReference(cache)
    .WithEnvironment("ConnectionStrings__DefaultConnection", posDB)
    .WithEnvironment("ConnectionStrings__Redis", cache)
    .WaitFor(postgres)
    .WithEnvironment("Cors__0", web.GetEndpoint("http"))
    .WithExternalHttpEndpoints()
    .WithHttpHealthCheck("/health");

web = web.WithReference(api)
    .WaitFor(api)
    .WithEnvironment("PUBLIC_API_URL", api.GetEndpoint("http"));

builder.Build().Run();
