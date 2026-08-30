namespace Pos.Api.Entities;

public class PrintServiceKey : AuditableEntity
{
    public int Id { get; set; }
    public int OutletId { get; set; }
    public int DeviceId { get; set; } = 1;
    public string KeyId { get; set; } = string.Empty;
    public string SecretHash { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public DateTime? RevokedAt { get; set; }
    public DateTime? LastSeenAt { get; set; }
}
