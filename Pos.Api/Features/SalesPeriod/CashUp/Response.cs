using Pos.Api.DTO;
using Pos.Api.Entities;

namespace Pos.Api.Features.SalesPeriod.CashUp;

public class Response
{
    public List<BillOrderItemDTO> OrderItems { get; set; } = new List<BillOrderItemDTO>();
    public decimal Total { get; set; } = 0;
    public List<Payment> PaymentsReceived { get; set; } = new List<Payment>();
    public decimal Balance { get; set; } = 0;
    public string UserId { get; set; } = string.Empty;
}
