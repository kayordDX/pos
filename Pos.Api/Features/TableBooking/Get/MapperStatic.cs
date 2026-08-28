using Riok.Mapperly.Abstractions;

namespace Pos.Api.Features.TableBooking.Get;

[Mapper]
public static partial class MapperStatic
{
    public static partial IQueryable<Response> ProjectToDto(this IQueryable<Entities.TableBooking> q);
}
