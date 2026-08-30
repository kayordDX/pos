using Pos.Api.Data;
using Pos.Api.Entities;
using Pos.Api.Services;
using Microsoft.EntityFrameworkCore;


namespace Pos.Api.Features.Option.Group.Delete;

public class Endpoint : Endpoint<Request>
{
    private readonly AppDbContext _dbContext;

    public Endpoint(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public override void Configure()
    {
        Delete("/option/group/{id}");
    }

    public override async Task HandleAsync(Request req, CancellationToken ct)
    {
        Entities.Option? existingOption = await _dbContext.Option.FirstOrDefaultAsync(x => x.OptionGroupId == req.Id);
        if (existingOption != null)
        {
            throw new Exception("Cannot Delete Group Containing Options");
        }

        OptionGroup? optionGroup = await _dbContext.OptionGroup.FindAsync(req.Id);

        if (optionGroup != null)
        {
            _dbContext.OptionGroup.Remove(optionGroup);
            await _dbContext.SaveChangesAsync();
        }
        else
        {
            throw new Exception("Option Not Found");
        }
    }
}


