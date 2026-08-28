using Riok.Mapperly.Abstractions;

namespace Pos.Api.Features.Table.GetAvailable;

[Mapper]
public static partial class MapperStatic
{
    public static partial IQueryable<Response> ProjectToDto(this IQueryable<Entities.Table> q);
}
