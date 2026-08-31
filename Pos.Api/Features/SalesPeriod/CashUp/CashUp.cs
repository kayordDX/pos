using Pos.Api.DTO;
using Pos.Api.Entities;

namespace Pos.Api.Features.SalesPeriod.CashUp;

public class CashUp : Entities.CashUp
{
    public List<UserCashUp> UserCashUps { get; set; } = new List<UserCashUp>();
}
