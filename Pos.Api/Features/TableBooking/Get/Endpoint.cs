using Microsoft.EntityFrameworkCore;
using Pos.Api.Data;
using Pos.Api.Services;

namespace Pos.Api.Features.TableBooking.Get;

public class Endpoint : Endpoint<Request, Response>
{
    private readonly AppDbContext _dbContext;
    private readonly CurrentUserService _user;

    public Endpoint(AppDbContext dbContext, CurrentUserService user)
    {
        _dbContext = dbContext;
        _user = user;
    }

    public override void Configure()
    {
        Get("/tableBooking/{id}");
    }

    public override async Task HandleAsync(Request req, CancellationToken ct)
    {
        var result = await _dbContext.TableBooking.Where(x => x.Id == req.Id).ProjectToDto().FirstOrDefaultAsync();

        if (result == null)
        {
            await Send.NotFoundAsync();
            return;
        }

        await Send.OkAsync(result);
    }
}
