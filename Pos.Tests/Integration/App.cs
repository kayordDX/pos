using DotNet.Testcontainers.Builders;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Pos.Api.Data;
using Pos.Api.Services;
using Testcontainers.PostgreSql;

namespace Integration;

// Define a collection that all integration tests belong to - ensures single fixture instance
[CollectionDefinition(nameof(AppCollection))]
public class AppCollection : ICollectionFixture<App>;

public class App : AppFixture<Program>
{
    // Firebase test account minted via UserService.GetIdToken.
    public const string ClientAuthUid = "92jlIC3p9uUavQOw5Pf5bX61ck13";

    private PostgreSqlContainer? postgreSqlContainer;
    private DotNet.Testcontainers.Containers.IContainer? redis;
    public HttpClient ClientAuth = new HttpClient();

    protected override async ValueTask PreSetupAsync()
    {
        postgreSqlContainer = new PostgreSqlBuilder("postgres:18").WithDatabase("db").WithUsername("db").WithPassword("db").WithPortBinding(5432, true).Build();

        redis = new ContainerBuilder("docker.io/bitnami/redis:latest")
            .WithPortBinding(6379, true)
            .WithEnvironment("REDIS_PASSWORD", "4qWF6jAcW6e9PCeW")
            .WithWaitStrategy(Wait.ForUnixContainer().UntilInternalTcpPortIsAvailable(6379))
            .Build();

        await postgreSqlContainer.StartAsync();
        await redis.StartAsync();
    }

    protected override void ConfigureApp(IWebHostBuilder a)
    {
        // Point the app at this fixture's containers. Random host ports keep
        // concurrent per-class test hosts from colliding (and keep tests off
        // the local aspire database).
        a.UseSetting(
            "ConnectionStrings:DefaultConnection",
            $"host=localhost;port={postgreSqlContainer!.GetMappedPublicPort(5432)};database=db;username=db;password=db"
        );
        a.UseSetting("ConnectionStrings:Redis", $"localhost:{redis!.GetMappedPublicPort(6379)},password=4qWF6jAcW6e9PCeW,ssl=False,abortConnect=False");
    }

    protected override async ValueTask SetupAsync()
    {
        // The seeded database has no row for the Firebase test account, but
        // endpoints resolve the outlet via user_outlet — create the user and a
        // non-manager ("front") outlet link so ClientAuth stays non-manager.
        await using (var scope = Services.CreateAsyncScope())
        {
            var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            if (!await db.UserOutlet.AnyAsync(x => x.UserId == ClientAuthUid))
            {
                await EnsureUserAsync(db, ClientAuthUid);

                var outlet = await db.Outlet.FirstAsync();
                var front = await db.RoleType.FirstAsync(x => x.Name == "front");

                var role = new Pos.Api.Entities.Role
                {
                    Name = "Front",
                    RoleTypeId = front.Id,
                    Description = "test front user",
                    OutletId = outlet.Id,
                };
                db.Role.Add(role);
                await db.SaveChangesAsync();

                db.UserOutlet.Add(
                    new Pos.Api.Entities.UserOutlet
                    {
                        UserId = ClientAuthUid,
                        OutletId = outlet.Id,
                        IsCurrent = true,
                    }
                );
                db.UserRoleOutlet.Add(
                    new Pos.Api.Entities.UserRoleOutlet
                    {
                        UserId = ClientAuthUid,
                        OutletId = outlet.Id,
                        RoleId = role.RoleId,
                    }
                );
                await db.SaveChangesAsync();
            }
        }

        var userService = Services.GetRequiredService<UserService>();
        var apiKey = await userService.GetIdToken(ClientAuthUid);
        var adminClient = CreateClient(c =>
        {
            c.DefaultRequestHeaders.Authorization = new("Bearer", apiKey.IdToken);
        });
        ClientAuth = adminClient;
    }

    public static async Task EnsureUserAsync(AppDbContext db, string userId)
    {
        if (!await db.User.AnyAsync(x => x.UserId == userId))
        {
            db.User.Add(
                new Pos.Api.Entities.User
                {
                    UserId = userId,
                    Email = $"{userId}@test.local",
                    Name = userId,
                    IsActive = true,
                }
            );
            await db.SaveChangesAsync();
        }
    }

    protected override ValueTask TearDownAsync()
    {
        ClientAuth.Dispose();
        return ValueTask.CompletedTask;
    }
}
