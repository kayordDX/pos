using Riok.Mapperly.Abstractions;

namespace Pos.Api.Features.Table.GetBooked;

[Mapper]
public static partial class MapperStatic
{
    public static partial IQueryable<Response> ProjectToDto(this IQueryable<Entities.TableBooking> q);
}
