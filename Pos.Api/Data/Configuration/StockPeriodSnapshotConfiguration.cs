using Pos.Api.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Pos.Api.Data.Configuration;

public class StockPeriodSnapshotConfiguration : IEntityTypeConfiguration<StockPeriodSnapshot>
{
    public void Configure(EntityTypeBuilder<StockPeriodSnapshot> builder)
    {
        builder.HasKey(k => k.StockItemId);
        builder.Property(t => t.StockItemId).ValueGeneratedNever();
    }
}
