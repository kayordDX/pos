using Microsoft.EntityFrameworkCore;
using Pos.Api.Common.Extensions;
using Pos.Api.Common.Models;
using Pos.Api.Data;
using Pos.Api.Features.TableBooking.History;
using Pos.Api.Services;

namespace Pos.Api.Features.TableBooking.HistoryAll;

public class Endpoint(AppDbContext dbContext, UserService user) : Endpoint<Request, PaginatedList<Response>>
{
    private readonly AppDbContext _dbContext = dbContext;
    private readonly UserService _user = user;

    public override void Configure()
    {
        Get("/tableBooking/history/all");
        Policies(Constants.Policy.Manager);
    }

    public override async Task HandleAsync(Request req, CancellationToken ct)
    {
        int outletId = await _user.GetOutletId();
        var booking = _dbContext.TableBooking.Where(x => x.SalesPeriod.OutletId == outletId).AsNoTracking();

        if (req.StartDate.HasValue)
        {
            booking = booking.Where(x => x.CloseDate >= req.StartDate.Value);
        }
        req.EndDate ??= req.StartDate;
        if (req.EndDate.HasValue)
        {
            booking = booking.Where(x => x.CloseDate <= req.EndDate.Value.AddDays(1).AddSeconds(-1));
        }

        if (req.TableBookingId > 0)
        {
            booking = booking.Where(x => x.Id.ToString().StartsWith(req.TableBookingId.ToString()));
        }

        var result = await booking.OrderByDescending(x => x.CloseDate).ProjectToDto().GetPagedAsync(req, ct);

        await Send.OkAsync(result, ct);
    }
}
