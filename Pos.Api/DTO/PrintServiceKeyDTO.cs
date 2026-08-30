namespace Pos.Api.DTO;

public class PrintServiceKeyDTO
{
    public int Id { get; set; }
    public string KeyId { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public int DeviceId { get; set; }
    public string MaskedKey { get; set; } = string.Empty;
    public DateTime? LastSeenAt { get; set; }
    public DateTime? RevokedAt { get; set; }
    public DateTime Created { get; set; }
    public string? FullKey { get; set; }
}
