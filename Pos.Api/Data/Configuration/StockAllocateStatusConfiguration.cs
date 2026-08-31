using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Pos.Api.Entities;

namespace Pos.Api.Data.Configuration;

public class StockAllocateStatusConfiguration : IEntityTypeConfiguration<StockAllocateStatus>
{
    public void Configure(EntityTypeBuilder<StockAllocateStatus> builder)
    {
        builder.Property(t => t.Id).UseIdentityColumn();
    }
}
