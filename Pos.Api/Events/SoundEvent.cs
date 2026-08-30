namespace Pos.Api.Events;

public class SoundEvent
{
    public int OutletId { get; set; }
    public List<int>? DivisionIds { get; set; }
    public bool IsSilent { get; set; }
}