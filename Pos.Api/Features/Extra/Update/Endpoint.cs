using Microsoft.EntityFrameworkCore;
using Pos.Api.Data;
using Pos.Api.Entities;
using Pos.Api.Services;

namespace Pos.Api.Features.Extra.Update;

public class Endpoint : Endpoint<Request>
{
    private readonly AppDbContext _dbContext;
    private readonly RedisClient _redisClient;
    private readonly CurrentUserService _cu;

    public Endpoint(AppDbContext dbContext, RedisClient redisClient, CurrentUserService cu)
    {
        _dbContext = dbContext;
        _redisClient = redisClient;
        _cu = cu;
    }

    public override void Configure()
    {
        Put("/extra");
    }

    public override async Task HandleAsync(Request req, CancellationToken ct)
    {
        Entities.Extra? extraEntity = await _dbContext.Extra.FindAsync(req.ExtraId);
        if (extraEntity == null)
        {
            throw new Exception("Sorry, the princess is in another castle.");
        }

        if (req.ExtraGroupId != extraEntity.ExtraGroupId)
        {
            Entities.ExtraGroup? extraGroup = await _dbContext.ExtraGroup.FirstOrDefaultAsync(x => x.ExtraGroupId == req.ExtraGroupId);
            if (extraGroup == null)
            {
                throw new Exception("Extra Group not found");
            }
        }

        decimal oldPrice = extraEntity.Price;
        extraEntity.Name = req.Name;
        extraEntity.Price = req.Price;
        extraEntity.PositionId = req.PositionId;
        extraEntity.ExtraGroupId = req.ExtraGroupId;
        extraEntity.OutletId = req.OutletId;

        if (oldPrice != extraEntity.Price)
        {
            _dbContext.PriceAudit.Add(
                new PriceAudit
                {
                    EntityType = PriceAuditEntityType.Extra,
                    EntityId = extraEntity.ExtraId,
                    OldPrice = oldPrice,
                    NewPrice = extraEntity.Price,
                    UserId = _cu.UserId,
                }
            );
        }
        await _dbContext.SaveChangesAsync();
        await Send.NoContentAsync();
        // await Helper.ClearCacheOutlet(_dbContext, _redisClient, req.OutletId);
    }
}
