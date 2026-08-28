using Pos.Api.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Pos.Api.Data.Configuration;

public class StockOrderConfiguration : IEntityTypeConfiguration<StockOrder>
{
    public void Configure(EntityTypeBuilder<StockOrder> builder)
    {
        builder.Property(t => t.Id).UseIdentityColumn();
    }
}
