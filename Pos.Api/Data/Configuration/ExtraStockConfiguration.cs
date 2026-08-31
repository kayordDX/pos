using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Pos.Api.Entities;

namespace Pos.Api.Data.Configuration;

public class ExtraStockConfiguration : IEntityTypeConfiguration<ExtraStock>
{
    public void Configure(EntityTypeBuilder<ExtraStock> builder)
    {
        builder.HasKey(k => new { k.ExtraId, k.StockId });
    }
}
