using Pos.Api.Data;
using Pos.Api.Services;
using Microsoft.EntityFrameworkCore;

namespace Pos.Api.Features.TableBooking.Close;

public class Endpoint : Endpoint<Request, Pos.Api.Entities.TableBooking>
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
        Post("/tableBooking/close");
    }

    public override async Task HandleAsync(Request req, CancellationToken ct)
    {
        if (_user.UserId == null)
        {
            await Send.ForbiddenAsync();
            return;
        }

        Entities.TableBooking? entity = await _dbContext.TableBooking.FirstOrDefaultAsync(x => x.Id == req.TableBookingId && x.CloseDate == null);

        if (entity == null)
        {
            await Send.NotFoundAsync();
            return;
        }
        var totals = await TableBooking.SaveTotal(req.TableBookingId, _dbContext);
        // Has Outstanding Balance
        if (totals.Total - totals.TotalPayments > 0)
        {
            throw new Exception("Cannot close table with outstanding balance");
        }

        entity.CloseDate = DateTime.UtcNow;
        await _dbContext.SaveChangesAsync();

        await Send.OkAsync(entity);
    }
}
