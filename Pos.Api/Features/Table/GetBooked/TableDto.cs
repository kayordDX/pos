namespace Pos.Api.Features.Table.GetMyBooked;

public class TableDto
{
    public int TableId { get; set; }
    public string Name { get; set; } = string.Empty;

    public SectionDto Section { get; set; } = default!;
}
