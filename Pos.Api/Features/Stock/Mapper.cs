using Pos.Api.DTO;
using Riok.Mapperly.Abstractions;

namespace Pos.Api.Features.Stock;

[Mapper]
public static partial class Mapper
{
    public static partial IQueryable<StockDTO> ProjectToDto(this IQueryable<Entities.Stock> q);
    public static partial IQueryable<StockOrderDTO> ProjectToDto(this IQueryable<Entities.StockOrder> q);
    public static partial IQueryable<StockAllocateDTO> ProjectToDto(this IQueryable<Entities.StockAllocate> q);
    public static partial IQueryable<StockAllocateDTOBasic> ProjectToDtoBasic(this IQueryable<Entities.StockAllocate> q);
    public static partial IQueryable<StockOrderItemStatusDTO> ProjectToDto(this IQueryable<Entities.StockOrderItemStatus> q);
}
