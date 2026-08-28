using Pos.Api.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Pos.Api.Data.Configuration;

public class OptionStockConfiguration : IEntityTypeConfiguration<OptionStock>
{
    public void Configure(EntityTypeBuilder<OptionStock> builder)
    {
        builder
            .HasKey(k => new { k.OptionId, k.StockId });
    }
}
