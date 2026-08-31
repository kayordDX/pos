using Pos.Api.Common.Extensions;
using Pos.Api.Common.Models;
using Pos.Api.Data;
using Pos.Api.Services;

namespace Pos.Api.Features.TableBooking.History;

public class Endpoint(AppDbContext dbContext, CurrentUserService user) : Endpoint<Request, PaginatedList<Response>>
{
    private readonly AppDbContext _dbContext = dbContext;
    private readonly CurrentUserService _user = user;

    public override void Configure()
    {
        Get("/tableBooking/myHistory");
    }

    public override async Task HandleAsync(Request r, CancellationToken ct)
    {
        var bookings = _dbContext.TableBooking.Where(x => x.UserId == _user.UserId).Where(x => x.CloseDate != null);

        if (r.TableBookingId > 0)
        {
            bookings = bookings.Where(x => x.Id.ToString().StartsWith(r.TableBookingId.ToString()));
        }

        var result = await bookings.OrderByDescending(x => x.CloseDate).ProjectToDto().GetPagedAsync(r, ct);

        await Send.OkAsync(result, ct);
    }
}
