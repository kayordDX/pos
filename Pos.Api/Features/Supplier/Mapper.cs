using Pos.Api.DTO;
using Riok.Mapperly.Abstractions;

namespace Pos.Api.Features.Supplier;

[Mapper]
public static partial class Mapper
{
    public static partial IQueryable<SupplierDTO> ProjectToDto(this IQueryable<Entities.Supplier> q);
}