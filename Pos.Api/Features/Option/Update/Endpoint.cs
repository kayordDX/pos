using Pos.Api.Data;
using Pos.Api.Entities;
using Pos.Api.Services;

namespace Pos.Api.Features.Option.Update;

public class Endpoint : Endpoint<Request>
{
    private readonly AppDbContext _dbContext;
    private readonly CurrentUserService _cu;

    public Endpoint(AppDbContext dbContext, CurrentUserService cu)
    {
        _dbContext = dbContext;
        _cu = cu;
    }

    public override void Configure()
    {
        Put("/option");
    }

    public override async Task HandleAsync(Request req, CancellationToken ct)
    {
        Entities.Option? optionEntity = await _dbContext.Option.FindAsync(req.OptionId);
        if (optionEntity == null)
        {
            throw new Exception("Sorry, the princess is in another castle.");
        }

        decimal oldPrice = optionEntity.Price;
        optionEntity.Name = req.Name;
        optionEntity.Price = req.Price;
        optionEntity.PositionId = req.PositionId;
        optionEntity.OptionGroupId = req.OptionGroupId;

        if (oldPrice != optionEntity.Price)
        {
            _dbContext.PriceAudit.Add(
                new PriceAudit
                {
                    EntityType = PriceAuditEntityType.Option,
                    EntityId = optionEntity.OptionId,
                    OldPrice = oldPrice,
                    NewPrice = optionEntity.Price,
                    UserId = _cu.UserId,
                }
            );
        }
        await _dbContext.SaveChangesAsync();
        await Send.NoContentAsync();
    }
}
