using Pos.Api.DTO;
using Pos.Api.Entities;
using Riok.Mapperly.Abstractions;

namespace Pos.Api.Features.SalesPeriod.CashUp;

[Mapper]
public static partial class MapperStatic
{
    public static partial IQueryable<BillOrderItemDTO> ProjectToDto(this IQueryable<OrderItem> q);

    public static partial IQueryable<UserDTO> ProjectToDto(this IQueryable<Entities.User> q);
}
