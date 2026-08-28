using Pos.Api.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Pos.Api.Data.Configuration;

public class StockAllocateItemConfiguration : IEntityTypeConfiguration<StockAllocateItem>
{
    public void Configure(EntityTypeBuilder<StockAllocateItem> builder)
    {
        builder.Property(t => t.Id).UseIdentityColumn();
    }
}
