using Pos.Api.Common.Models;

namespace Pos.Api.Features.Stock.Order.GetAll;

public class Request : QueryModel
{
    public int OutletId { get; set; }
}
