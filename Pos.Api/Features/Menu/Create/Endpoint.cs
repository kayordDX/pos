using Pos.Api.Data;
using Pos.Api.Services;


namespace Pos.Api.Features.Menu.Create;

public class Endpoint : Endpoint<Request, Pos.Api.Entities.Menu>
{
    private readonly AppDbContext _dbContext;
    private readonly RedisClient _redisClient;

    public Endpoint(AppDbContext dbContext, RedisClient redisClient)
    {
        _dbContext = dbContext;
        _redisClient = redisClient;
    }

    public override void Configure()
    {
        Post("/menu");
    }

    public override async Task HandleAsync(Request req, CancellationToken ct)
    {
        var menuEntity = new Entities.Menu
        {
            OutletId = req.OutletId,
            Name = req.Name,
            Position = req.Position,
        };

        await _dbContext.Menu.AddAsync(menuEntity);
        await _dbContext.SaveChangesAsync();

        await Helper.ClearCacheOutlet(_dbContext, _redisClient, req.OutletId);
    }
}
