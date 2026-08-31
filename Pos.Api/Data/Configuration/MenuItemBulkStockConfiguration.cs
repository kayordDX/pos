using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Pos.Api.Entities;

namespace Pos.Api.Data.Configuration;

public class MenuItemBulkStockConfiguration : IEntityTypeConfiguration<MenuItemBulkStock>
{
    public void Configure(EntityTypeBuilder<MenuItemBulkStock> builder)
    {
        builder.HasKey(k => new { k.MenuItemId, k.StockId });
    }
}
