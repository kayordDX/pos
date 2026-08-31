using Microsoft.EntityFrameworkCore;
using Pos.Api.Common.Extensions;
using Pos.Api.Common.Models;
using Pos.Api.Data;
using Pos.Api.DTO;

namespace Pos.Api.Features.Stock.Order.GetAll;

public class Endpoint : Endpoint<Request, PaginatedList<StockOrderResponseDTO>>
{
    private readonly AppDbContext _dbContext;

    public Endpoint(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public override void Configure()
    {
        Get("/stock/order");
        Policies(Constants.Policy.Manager);
    }

    public override async Task HandleAsync(Request req, CancellationToken ct)
    {
        var results = await _dbContext
            .StockOrder.Where(x => x.OutletId == req.OutletId)
            .Select(x => new StockOrderResponseDTO()
            {
                Id = x.Id,
                DivisionId = x.DivisionId,
                DivisionName = x.Division.DivisionName,
                SupplierId = x.SupplierId,
                SupplierName = x.Supplier.Name,
                StockOrderStatusId = x.StockOrderStatusId,
                StockOrderStatusName = x.StockOrderStatus.Name,
                OrderDate = x.OrderDate,
                OrderNumber = x.OrderNumber,
                OutletId = x.OutletId,
                Total = x.StockOrderItems!.Sum(x => x.Price),
                Created = x.Created,
            })
            .GetPagedAsync(req, ct);
        await Send.OkAsync(results);
    }
}
