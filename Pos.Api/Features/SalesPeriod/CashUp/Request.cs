using FluentValidation;

namespace Pos.Api.Features.SalesPeriod.CashUp;

public class Request
{
    public int SalesPeriodId { get; set; } = default!;
    public string UserId { get; set; } = string.Empty;

}