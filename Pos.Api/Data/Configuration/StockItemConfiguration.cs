using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Pos.Api.Entities;

namespace Pos.Api.Data.Configuration;

public class StockItemConfiguration : IEntityTypeConfiguration<StockItem>
{
    public void Configure(EntityTypeBuilder<StockItem> builder)
    {
        builder.Property(t => t.Id).UseIdentityColumn();
        // Make sure we cannot have duplicate items
        builder.HasIndex(e => new { e.StockId, e.DivisionId }).IsUnique();
    }
}
