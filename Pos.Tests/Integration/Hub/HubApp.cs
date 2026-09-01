using DotNet.Testcontainers.Builders;
using DotNet.Testcontainers.Containers;
using Microsoft.AspNetCore.Hosting;
using Testcontainers.PostgreSql;

namespace Integration.Hub;

// Standalone fixture for hub auth tests: the device-link (OTP) flow is
// anonymous, so these tests must not depend on a Firebase service account
// like the AppCollection fixture does.
[CollectionDefinition(nameof(HubCollection))]
public class HubCollection : ICollectionFixture<HubApp>;

public class HubApp : AppFixture<Program>
{
    private PostgreSqlContainer? postgreSqlContainer;
    private IContainer? redis;

    protected override async ValueTask PreSetupAsync()
    {
        postgreSqlContainer = new PostgreSqlBuilder("postgres:18")
            .WithDatabase("db")
            .WithUsername("db")
            .WithPassword("db")
            .WithPortBinding(25432, 5432)
            .Build();

        redis = new ContainerBuilder("docker.io/bitnami/redis:latest")
            .WithPortBinding(26379, 6379)
            .WithEnvironment("REDIS_PASSWORD", "4qWF6jAcW6e9PCeW")
            .WithWaitStrategy(Wait.ForUnixContainer().UntilInternalTcpPortIsAvailable(6379))
            .Build();

        await postgreSqlContainer.StartAsync();
        await redis.StartAsync();
    }

    protected override void ConfigureApp(IWebHostBuilder a)
    {
        // point the app at this fixture's containers (defaults point at AppCollection's ports)
        a.UseSetting(
            "ConnectionStrings:DefaultConnection",
            $"host=localhost;port={postgreSqlContainer!.GetMappedPublicPort(5432)};database=db;username=db;password=db"
        );
        a.UseSetting("ConnectionStrings:Redis", $"localhost:{redis!.GetMappedPublicPort(6379)},password=4qWF6jAcW6e9PCeW,ssl=False,abortConnect=False");
    }
}
