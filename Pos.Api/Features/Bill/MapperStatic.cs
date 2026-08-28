using Pos.Api.Entities;
using Riok.Mapperly.Abstractions;
using Pos.Api.DTO;


namespace Pos.Api.Features.Bill;

[Mapper]
public static partial class MapperStatic
{
    public static partial IQueryable<BillOrderItemDTO> ProjectToDto(this IQueryable<OrderItem> q);

}