using System.Globalization;
using Microsoft.EntityFrameworkCore;
using Pos.Api.Common.Extensions;
using Pos.Api.Data;
using Pos.Api.DTO;
using Pos.Api.Services;

namespace Pos.Api.Features.SalesPeriod.CashUp;

public class Endpoint : Endpoint<Request, CashUp>
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
        Get("/salesperiod/cashup");
    }

    public override async Task HandleAsync(Request req, CancellationToken ct)
    {
        CashUp cashUp = new();

        Entities.SalesPeriod? sp = await _dbContext.SalesPeriod.FirstOrDefaultAsync(x => x.Id == req.SalesPeriodId);
        if (sp == null)
        {
            await Send.NotFoundAsync();
            return;
        }

        List<TableCashUp> salesPeriodTableCashUps = new();
        List<UserCashUp> salesPeriodUserCashUps = new();
        UserCashUp userCashUp = new();
        cashUp.TableCount = 0;
        List<TableBookingDTO> bookings = new();
        var userIdsCashedUp = await _dbContext
            .CashUp.AsNoTracking()
            .Where(x => x.SalesPeriodId == req.SalesPeriodId && x.SignOffDate != null)
            .Select(rd => rd.UserId)
            .ToListAsync(ct);
        if (req.UserId == string.Empty)
            bookings = await _dbContext
                .TableBooking.Where(x => x.SalesPeriodId == req.SalesPeriodId)
                .Where(oi => !userIdsCashedUp.Contains(oi.UserId))
                .ProjectToDto()
                .ToListAsync();
        else
            bookings = await _dbContext.TableBooking.Where(x => x.SalesPeriodId == req.SalesPeriodId).ProjectToDto().ToListAsync();
        cashUp.OpenTableCount = bookings.Where(x => x.CloseDate == null).Count();

        var paymentStatusIds = await _dbContext
            .OrderItemStatus.AsNoTracking()
            .Where(x => x.IsBillable == true)
            .Select(rd => rd.OrderItemStatusId)
            .ToListAsync(ct);

        int[] bookingIds = [.. bookings.Select(b => b.Id)];
        var orderItemsByBooking = (
            await _dbContext
                .OrderItem.AsNoTracking()
                .Where(x => paymentStatusIds.Contains(x.OrderItemStatusId) && bookingIds.Contains(x.TableBookingId))
                .ProjectToDto()
                .ToListAsync(ct)
        )
            .ApplySnapshots()
            .ToLookup(x => x.TableBookingId);
        var paymentsByBooking = (
            await _dbContext.Payment.AsNoTracking().Where(x => bookingIds.Contains(x.TableBookingId)).Include(x => x.PaymentType).ToListAsync(ct)
        ).ToLookup(x => x.TableBookingId);

        foreach (TableBookingDTO tb in bookings)
        {
            cashUp.TableCount++;
            TableCashUp tableCashUp = new();
            tableCashUp.Total = 0;

            tableCashUp.UserId = tb.UserId;

            tableCashUp.OrderItems = [.. orderItemsByBooking[tb.Id]];
            tableCashUp.PaymentsReceived = [.. paymentsByBooking[tb.Id]];

            tableCashUp.Total += tableCashUp.OrderItems.Sum(item => item.MenuItem.Price);

            tableCashUp.Total += tableCashUp
                .OrderItems.Where(item => item.OrderItemOptions != null)
                .Sum(item => item.OrderItemOptions!.Sum(option => option.Option.Price));

            tableCashUp.Total += tableCashUp
                .OrderItems.Where(item => item.OrderItemExtras != null)
                .Sum(item => item.OrderItemExtras!.Sum(extra => extra.Extra.Price));

            tableCashUp.TablePaymentTotal += tableCashUp.PaymentsReceived.Where(item => item.TableBookingId! == tb.Id).Sum(item => item.Amount);
            tableCashUp.Balance = tableCashUp.Total - tableCashUp.TablePaymentTotal;
            tableCashUp.Balance = tableCashUp.Balance < 0 ? 0 : tableCashUp.Balance;
            tableCashUp.User = tb.User;
            salesPeriodTableCashUps.Add(tableCashUp);
        }
        var distinctUserIds = salesPeriodTableCashUps.Select(cashUp => cashUp.UserId).Distinct();
        foreach (string? userId in distinctUserIds)
        {
            if (userId != null)
            {
                UserCashUp u = new();
                u.UserId = userId;
                var scash = salesPeriodTableCashUps.FirstOrDefault(x => x.UserId == userId) ?? new();
                u.User = scash.User ?? new();
                u.UserTotal += salesPeriodTableCashUps.Where(item => item.UserId! == userId).Sum(item => item.Total);
                u.UserBalance += salesPeriodTableCashUps.Where(item => item.UserId! == userId).Sum(item => item.Balance);
                u.UserPaymentTotal += salesPeriodTableCashUps.Where(item => item.UserId! == userId).Sum(item => item.TablePaymentTotal);
                u.TableCashUps.AddRange(salesPeriodTableCashUps.Where(item => item.UserId! == userId).ToList());

                u.UserTipTotal = u.UserPaymentTotal - u.UserTotal;
                salesPeriodUserCashUps.Add(u);
            }
        }
        cashUp.UserCashUps.AddRange(salesPeriodUserCashUps);
        cashUp.CashUpBalance += salesPeriodUserCashUps.Sum(item => item.UserBalance);
        cashUp.CashUpTotal += salesPeriodUserCashUps.Sum(item => item.UserTotal);
        cashUp.CashUpTotalPayments += cashUp.UserCashUps.Sum(item => item.UserPaymentTotal);
        cashUp.SalesPeriodId = req.SalesPeriodId;
        cashUp.UserId = req.UserId;
        await Send.OkAsync(cashUp);
    }
}
