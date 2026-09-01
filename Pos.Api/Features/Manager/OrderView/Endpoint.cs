using Microsoft.EntityFrameworkCore;
using Pos.Api.Data;
using Pos.Api.Entities;
using Pos.Api.Features.Role;
using Pos.Api.Services;

namespace Pos.Api.Features.Manager.OrderView;

public class Endpoint : Endpoint<Request, List<Response>>
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
        Get("/manager/viewOrders");
        Policies(Constants.Policy.Manager);
    }

    public override async Task HandleAsync(Request req, CancellationToken ct)
    {
        UserOutlet? userOutlet = await _dbContext.UserOutlet.FirstOrDefaultAsync(x => x.UserId == _cu.UserId && x.IsCurrent == true);
        if (userOutlet == null)
        {
            await Send.NotFoundAsync();
            return;
        }

        UserRoleOutlet? userRole = await _dbContext.UserRoleOutlet.FirstOrDefaultAsync(x => x.UserId == _cu.UserId && x.OutletId == userOutlet.OutletId);
        if (userRole == null)
        {
            await Send.NotFoundAsync();
            return;
        }
        Entities.Role? role = await _dbContext.Role.AsNoTracking().Include(x => x.RoleType).FirstOrDefaultAsync(x => x.RoleId == userRole.RoleId);
        if (role == null)
        {
            await Send.NotFoundAsync();
            return;
        }

        List<int> divisionIds = await RoleHelper.GetDivisionsForRoles(req.RoleIds, _dbContext, userOutlet.OutletId, _cu.UserId);

        List<Response> responses = [];

        var statusIds = await _dbContext
            .OrderItemStatus.Where(x => x.IsBackOffice && x.IsComplete != true && x.IsCancelled != true)
            .Select(rd => rd.OrderItemStatusId)
            .ToListAsync(ct);

        List<Entities.Division> divisions =
            divisionIds.Count == 0 ? [] : await _dbContext.Division.AsNoTracking().Where(x => divisionIds.Contains(x.DivisionId)).ToListAsync(ct);

        // Single load of open bookings for the outlet, copied and filtered per division below.
        List<TableBookingDTO> openBookings = await _dbContext
            .TableBooking.AsNoTracking()
            .Where(x => x.SalesPeriod.OutletId == userOutlet.OutletId && x.CloseDate == null)
            .AsSplitQuery()
            .TagWith("pos:manager-view-orders")
            .ProjectToDto()
            .ToListAsync(ct);

        foreach (Entities.Division division in divisions)
        {
            List<TableBookingDTO> result = openBookings
                .Select(dto => new TableBookingDTO
                {
                    Id = dto.Id,
                    TableId = dto.TableId,
                    Table = dto.Table,
                    User = dto.User,
                    BookingName = dto.BookingName,
                    BookingDate = dto.BookingDate,
                    CloseDate = dto.CloseDate,
                    OrderItems = dto.OrderItems!.Where(oi => statusIds.Contains(oi.OrderItemStatusId) && oi.MenuItem.DivisionId == division.DivisionId)
                        .ToList(),
                })
                .ToList();

            if (role.RoleType.isBackOffice)
                result = result
                    .Where(x => x.OrderItems!.Any())
                    .Where(x => x.CloseDate == null && x.OrderItems!.Any(y => y.OrderItemStatusId != 1 && y.OrderItemStatusId != 6))
                    .ToList();
            if (role.RoleType.isFrontLine)
                result = result
                    .Where(x => x.OrderItems!.Any())
                    .Where(y =>
                        y.User.UserId == _cu.UserId && y.CloseDate == null && y.OrderItems!.Any(x => x.OrderItemStatusId != 1 && x.OrderItemStatusId != 6)
                    )
                    .ToList();

            Response response = new()
            {
                LastRefresh = DateTime.Now,
                PendingItems = result.Sum(n => n.OrderItems?.Count) ?? 0,
                PendingTables = result.Count,
                Tables = result,
                Division = division,
            };
            responses.Add(response);
        }
        await Send.OkAsync(responses);
    }
}
