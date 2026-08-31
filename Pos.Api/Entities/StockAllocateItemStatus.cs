namespace Pos.Api.Entities;

public class StockAllocateItemStatus : AuditableEntity
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
}
