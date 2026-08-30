using Pos.Api.Features.TableOrder.Office;

namespace Pos.Api.Features.TableOrder.Office.TableBased.Front;

public class Response
{
    public List<TableBookingDTO>? Tables { get; set; }
    public DateTime LastRefresh { get; set; }
    public int PendingTables { get; set; }
    public int PendingItems { get; set; }
}
