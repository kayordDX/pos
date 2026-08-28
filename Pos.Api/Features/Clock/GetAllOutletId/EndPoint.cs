using Pos.Api.Data;
using Microsoft.EntityFrameworkCore;

namespace Pos.Api.Features.Clock.GetAllOutletId;

public class Endpoint(AppDbContext dbContext) : Endpoint<Request, List<Entities.User>>
{
    private readonly AppDbContext _dbContext = dbContext;

    public override void Configure()
    {
        Get("/clock/list");
    }

    public override async Task HandleAsync(Request req, CancellationToken ct)
    {
        List<Entities.User> staffList = [];
        List<Entities.User> preStaffList = [];

        if (req.StatusId == 1) // Clocked Out
        {
            // Get staff who are clocked in
            var clockedInStaff = await _dbContext.Clock
                .Where(c => c.OutletId == req.OutletId && c.EndDate == null)
                .Select(c => c.User)
                .ToListAsync(ct);

        }
        else if (req.StatusId == 2) // Clocked In
        {
            staffList = await _dbContext.Clock
                .Where(c => c.OutletId == req.OutletId && c.EndDate == null)
                .Select(c => c.User)
                .ToListAsync(ct);
        }

        await Send.OkAsync(staffList, ct);
    }
}
