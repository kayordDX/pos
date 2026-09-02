namespace Pos.Api.Entities;

public class Device : AuditableEntity
{
    public int Id { get; set; }
    public int OutletId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? KeyId { get; set; }
    public string? SecretHash { get; set; }
    public DateTime? RevokedAt { get; set; }

    public ICollection<Printer> Printers { get; set; } = [];
}
