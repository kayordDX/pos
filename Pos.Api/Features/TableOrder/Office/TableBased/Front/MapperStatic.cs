using Pos.Api.Features.TableOrder.Office;
using Riok.Mapperly.Abstractions;

namespace Pos.Api.Features.TableOrder.Office.TableBased.Front;

[Mapper]
public static partial class MapperStatic
{
    public static partial IQueryable<TableBookingDTO> ProjectToDto(this IQueryable<Entities.TableBooking> q);

    public static partial IQueryable<TableDTO> ProjectToDto(this IQueryable<Entities.Table> q);

    public static partial IQueryable<OrderItemStatusDTO> ProjectToDto(this IQueryable<Entities.OrderItemStatus> q);
}
