using Microsoft.EntityFrameworkCore;
using Pos.Api.Data;
using Pos.Api.Entities;
using Pos.Api.Features.Role;
using Pos.Api.Services;

namespace Pos.Api.Features.TableOrder.Office.TableBased.Back;

public class Endpoint(AppDbContext dbContext, CurrentUserService cu) : Endpoint<Request, Response>
{
    private readonly AppDbContext _dbContext = dbContext;
    private readonly CurrentUserService _cu = cu;

    public override void Configure()
    {
        Get("/backOffice/getOrders");
    }

    public override async Task HandleAsync(Request req, CancellationToken ct)
    {
        UserOutlet? userOutlet = await _dbContext.UserOutlet.FirstOrDefaultAsync(x => x.UserId == _cu.UserId && x.IsCurrent == true, ct);
        if (userOutlet == null)
        {
            await Send.NotFoundAsync(ct);
            return;
        }

        List<int> divisionIds = await RoleHelper.GetDivisionsForRoles(req.RoleIds, _dbContext, userOutlet.OutletId, _cu.UserId);

        var statusIds = _dbContext
            .OrderItemStatus.Where(x => x.IsBackOffice && x.IsComplete != true && x.IsCancelled != true)
            .Select(rd => rd.OrderItemStatusId)
            .ToList();

        var result = await _dbContext.TableBooking.Where(x => x.SalesPeriod.OutletId == userOutlet.Id && x.CloseDate == null).ProjectToDto().ToListAsync(ct);

        result.ForEach(dto =>
        {
            dto.OrderItems = [.. dto.OrderItems!.Where(oi => statusIds.Contains(oi.OrderItemStatusId) && divisionIds.Contains(oi.MenuItem.DivisionId))];
        });

        result =
        [
            .. result
                .Where(x => x.OrderItems?.Count > 0)
                .Where(x => x.CloseDate == null && x.OrderItems!.Any(y => y.OrderItemStatusId != 1 && y.OrderItemStatusId != 6)),
        ];

        Response response = new()
        {
            LastRefresh = DateTime.Now,
            PendingItems = result.Sum(n => n.OrderItems?.Count) ?? 0,
            PendingTables = result.Count,
            Tables = result,
        };
        await Send.OkAsync(response, ct);
    }
}
