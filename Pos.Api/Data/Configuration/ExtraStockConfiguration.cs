using Pos.Api.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Pos.Api.Data.Configuration;

public class ExtraStockConfiguration : IEntityTypeConfiguration<ExtraStock>
{
    public void Configure(EntityTypeBuilder<ExtraStock> builder)
    {
        builder
         .HasKey(k => new { k.ExtraId, k.StockId });
    }
}
