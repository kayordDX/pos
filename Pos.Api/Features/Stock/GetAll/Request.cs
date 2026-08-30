using Pos.Api.Common.Models;

namespace Pos.Api.Features.Stock.GetAll;

public class Request : QueryModel
{
    public int OutletId { get; set; }
}
