using Microsoft.EntityFrameworkCore;
using Pos.Api.Data;
using Pos.Api.Services;

namespace Pos.Api.Features.User.Validate;

public class Endpoint(AppDbContext dbContext, CurrentUserService cu) : Endpoint<Request, Response>
{
    private readonly AppDbContext _dbContext = dbContext;
    private readonly CurrentUserService _cu = cu;

    public override void Configure()
    {
        Post("/user/validate");
    }

    public override async Task HandleAsync(Request req, CancellationToken ct)
    {
        var userId = _cu.UserId;
        if (string.IsNullOrEmpty(userId))
        {
            await Send.UnauthorizedAsync(ct);
            return;
        }

        var user = await _dbContext.User.FirstOrDefaultAsync(x => x.UserId == userId, ct);
        if (user == null)
        {
            await _dbContext.User.AddAsync(
                new Entities.User
                {
                    Email = req.Email,
                    UserId = userId,
                    Image = req.Image ?? "",
                    Name = req.Name,
                    IsActive = true,
                },
                ct
            );
            await _dbContext.SaveChangesAsync(ct);
        }
        else
        {
            user.Email = req.Email;
            user.Image = req.Image ?? "";
            user.Name = req.Name;
            await _dbContext.SaveChangesAsync(ct);
        }

        Response r = new() { UserId = userId };
        await Send.OkAsync(r, ct);
    }
}
