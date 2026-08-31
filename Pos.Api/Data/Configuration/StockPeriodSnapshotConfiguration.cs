using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Pos.Api.Entities;

namespace Pos.Api.Data.Configuration;

public class StockPeriodSnapshotConfiguration : IEntityTypeConfiguration<StockPeriodSnapshot>
{
    public void Configure(EntityTypeBuilder<StockPeriodSnapshot> builder)
    {
        builder.HasKey(k => k.StockItemId);
        builder.Property(t => t.StockItemId).ValueGeneratedNever();
    }
}
