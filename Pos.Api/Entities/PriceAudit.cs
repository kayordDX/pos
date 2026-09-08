namespace Pos.Api.Entities;

public class PriceAudit
{
    public long Id { get; set; }
    public PriceAuditEntityType EntityType { get; set; }
    public int EntityId { get; set; }
    public decimal OldPrice { get; set; }
    public decimal NewPrice { get; set; }
    public string? UserId { get; set; }
    public DateTime ChangedAt { get; set; } = DateTime.UtcNow;
}
