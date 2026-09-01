using Microsoft.EntityFrameworkCore;
using Pos.Api.Data;
using Pos.Api.Features.Bill;
using Pos.Api.Services;

namespace Pos.Api.Features.CashUp.User.Get;

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
        Get("/cashUp/user/{outletId}");
    }

    public override async Task HandleAsync(Request req, CancellationToken ct)
    {
        if (_user.UserId == null)
        {
            await Send.ForbiddenAsync();
            return;
        }

        List<string> userIds = await _dbContext
            .TableBooking.Include(x => x.SalesPeriod)
            .Where(x => x.CashUpUserId == null && x.SalesPeriod.OutletId == req.OutletId)
            .Select(x => x.UserId)
            .Distinct()
            .ToListAsync();

        Response responses = new() { Items = new() };

        Entities.SalesPeriod? salesPeriod = await _dbContext.SalesPeriod.FirstOrDefaultAsync(x => x.OutletId == req.OutletId && x.EndDate == null);
        if (salesPeriod != null)
        {
            var todoItems = await GetUserCashUpItems(userIds, salesPeriod.Id, _dbContext, req.OutletId);
            responses.Items.AddRange(todoItems);

            var cashedUpUserIds = await _dbContext
                .CashUpUser.Where(x => x.OutletId == req.OutletId)
                .Where(x => x.SalesPeriodId == salesPeriod.Id)
                .Select(x => x.UserId)
                .ToListAsync();

            var cashedUpItems = await GetUserCashUpItems(cashedUpUserIds, salesPeriod.Id, _dbContext, req.OutletId, true);
            responses.Items.AddRange(cashedUpItems);
        }
        responses.TotalPayments = responses.Items.Sum(x => x.Payments);
        responses.TotalTips = responses.Items.Sum(x => x.Tips);
        responses.TotalSales = responses.Items.Sum(x => x.Sales);

        await Send.OkAsync(responses);
    }

    public static async Task<List<Items>> GetUserCashUpItems(
        List<string> userIds,
        int salesPeriodId,
        AppDbContext _dbContext,
        int outletId,
        bool isCashedUp = false
    )
    {
        List<Items> items = new();
        if (userIds.Count == 0)
        {
            return items;
        }

        var bookingQuery = _dbContext.TableBooking.AsNoTracking().Where(x => x.SalesPeriodId == salesPeriodId && userIds.Contains(x.UserId));

        bookingQuery = isCashedUp ? bookingQuery.Where(x => x.CashUpUserId != null) : bookingQuery.Where(x => x.CashUpUserId == null);

        var bookingsByUser = (await bookingQuery.ToListAsync()).ToLookup(x => x.UserId);

        Dictionary<string, Entities.User> usersById = await _dbContext
            .User.AsNoTracking()
            .Where(x => userIds.Contains(x.UserId))
            .ToDictionaryAsync(x => x.UserId);

        Dictionary<string, int> cashUpUserIdsByUser = new();
        if (isCashedUp)
        {
            List<Entities.CashUpUser> cashUps = await _dbContext
                .CashUpUser.AsNoTracking()
                .Where(x => x.OutletId == outletId && x.SalesPeriodId == salesPeriodId && userIds.Contains(x.UserId))
                .ToListAsync();
            foreach (Entities.CashUpUser c in cashUps)
            {
                if (!cashUpUserIdsByUser.ContainsKey(c.UserId))
                {
                    cashUpUserIdsByUser[c.UserId] = c.Id;
                }
            }
        }

        foreach (string userId in userIds)
        {
            if (!usersById.TryGetValue(userId, out Entities.User? u))
            {
                continue;
            }

            decimal sales = 0;
            decimal tips = 0;
            decimal totalPayments = 0;
            int openTableCount = 0;

            foreach (var b in bookingsByUser[userId])
            {
                sales += b.Total ?? 0;
                tips += b.TotalTips ?? 0;
                totalPayments += b.TotalPayments ?? 0;
                openTableCount += b.CloseDate == null ? 1 : 0;
            }

            items.Add(
                new Items
                {
                    Sales = sales,
                    Tips = tips,
                    Payments = totalPayments,
                    User = u,
                    UserId = u.UserId,
                    OpenTableCount = openTableCount,
                    CashUpUserId = cashUpUserIdsByUser.GetValueOrDefault(userId),
                }
            );
        }
        return items;
    }
}
