using Pos.Api.Common.Models;

namespace Pos.Api.Features.Stock.GetAllDivision;

public class Request : QueryModel
{
    public int DivisionId { get; set; }
}
