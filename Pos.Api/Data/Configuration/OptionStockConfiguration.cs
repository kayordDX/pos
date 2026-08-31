using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Pos.Api.Entities;

namespace Pos.Api.Data.Configuration;

public class OptionStockConfiguration : IEntityTypeConfiguration<OptionStock>
{
    public void Configure(EntityTypeBuilder<OptionStock> builder)
    {
        builder.HasKey(k => new { k.OptionId, k.StockId });
    }
}
