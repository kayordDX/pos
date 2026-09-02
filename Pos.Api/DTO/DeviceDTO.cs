namespace Pos.Api.DTO;

public class DeviceDTO
{
    public int Id { get; set; }
    public int OutletId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? MaskedKey { get; set; }
    public DateTime? RevokedAt { get; set; }
    public DateTime Created { get; set; }
    public int PrinterCount { get; set; }
    public bool IsOnline { get; set; }

    // Present only on create/rotate responses; never persisted or listed.
    public string? FullKey { get; set; }
}
