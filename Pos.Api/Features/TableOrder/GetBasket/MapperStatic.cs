using Pos.Api.Entities;
using Riok.Mapperly.Abstractions;

namespace Pos.Api.Features.TableOrder.GetBasket;

[Mapper]
public static partial class MapperStatic
{
    public static partial IQueryable<BillOrderItemDTO> ProjectToDto(this IQueryable<OrderItem> q);
}
