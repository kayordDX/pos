using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Pos.Api.Entities;

namespace Pos.Api.Data.Configuration;

public class StockOrderItemConfiguration : IEntityTypeConfiguration<StockOrderItem>
{
    public void Configure(EntityTypeBuilder<StockOrderItem> builder)
    {
        builder.HasKey(k => new { k.StockOrderId, k.StockId });
    }
}
