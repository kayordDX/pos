using Microsoft.EntityFrameworkCore;
using Pos.Api.Data;
using Pos.Api.Services;

namespace Pos.Api.Features.Table.GetBooked;

public class Endpoint(AppDbContext dbContext, CurrentUserService cu) : Endpoint<Request, List<Response>>
{
    private readonly AppDbContext _dbContext = dbContext;
    private readonly CurrentUserService _cu = cu;

    public override void Configure()
    {
        Get("/table/booked");
    }

    public override async Task HandleAsync(Request req, CancellationToken ct)
    {
        List<Response> results = [];
        if (req.MyBooking)
        {
            //current bookings
            results = await _dbContext
                .TableBooking.Where(booking => booking.Table.Section.OutletId == req.OutletId && booking.UserId == _cu.UserId && booking.CloseDate == null)
                .Where(x => x.Table.Section.OutletId == req.OutletId)
                .OrderBy(x => x.Table.Position)
                .ProjectToDto()
                .ToListAsync(ct);
        }
        else
        {
            results = await _dbContext
                .TableBooking.Where(booking => booking.Table.Section.OutletId == req.OutletId && booking.UserId != _cu.UserId && booking.CloseDate == null)
                .Where(x => x.Table.Section.OutletId == req.OutletId)
                .OrderBy(x => x.Table.Position)
                .ProjectToDto()
                .ToListAsync(ct);
        }
        await Send.OkAsync(results, ct);
    }
}
