namespace Pos.Api.Features.Stock.OrderItem.Create;

public class Request
{
    public int StockOrderId { get; set; }
    public int StockId { get; set; }
    public decimal OrderAmount { get; set; }
    public decimal Price { get; set; }
}
