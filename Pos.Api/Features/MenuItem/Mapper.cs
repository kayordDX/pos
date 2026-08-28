using Riok.Mapperly.Abstractions;

namespace Pos.Api.Features.MenuItem;

[Mapper]
public static partial class Mapper
{
    public static partial IQueryable<MenuItemAdminDTO> ProjectToAdminDto(this IQueryable<Entities.MenuItem> q);
}