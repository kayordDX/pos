using Pos.Api.Data;
using Pos.Api.Entities;
using Pos.Api.Services;

namespace Pos.Api.Features.AdjustmentTypeOutlet.Create;

public class Endpoint(AppDbContext dbContext, RedisClient redisClient, UserService userService) : Endpoint<Request, Pos.Api.Entities.Menu>
{
    private readonly AppDbContext _dbContext = dbContext;
    private readonly RedisClient _redisClient = redisClient;
    private readonly UserService _userService = userService;

    public override void Configure()
    {
        Post("/adjustmentType");
    }

    public override async Task HandleAsync(Request req, CancellationToken ct)
    {
        if (!await _userService.IsManager(req.OutletId))
        {
            await Send.ForbiddenAsync(ct);
            return;
        }

        var adjustmentTypeEntity = new AdjustmentType { Name = req.Name, Description = req.Description };

        await _dbContext.AdjustmentType.AddAsync(adjustmentTypeEntity, ct);

        await _dbContext.SaveChangesAsync(ct);
        var adjustmentTypeOutlet = new Entities.AdjustmentTypeOutlet { OutletId = req.OutletId, AdjustmentTypeId = adjustmentTypeEntity.AdjustmentTypeId };
        await _dbContext.AdjustmentTypeOutlet.AddAsync(adjustmentTypeOutlet, ct);

        await _dbContext.SaveChangesAsync(ct);
        CashUpUserItemType cashUpUserItemType = new()
        {
            AdjustmentTypeId = adjustmentTypeEntity.AdjustmentTypeId,
            CashUpUserItemRule = Common.Enums.CashUpUserItemRule.Adjustment,
            AffectsGrossBalance = false,
            Position = 99,
            IsAuto = true,
            ItemType = adjustmentTypeEntity.Name,
        };

        await _dbContext.CashUpUserItemType.AddAsync(cashUpUserItemType, ct);
        await _dbContext.SaveChangesAsync(ct);

        await Helper.ClearCacheOutlet(_dbContext, _redisClient, req.OutletId);
    }
}
