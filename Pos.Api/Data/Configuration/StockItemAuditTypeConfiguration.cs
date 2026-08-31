using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Pos.Api.Entities;

namespace Pos.Api.Data.Configuration;

public class StockItemAuditTypeConfiguration : IEntityTypeConfiguration<StockItemAuditType>
{
    public void Configure(EntityTypeBuilder<StockItemAuditType> builder)
    {
        builder.Property(t => t.Id).UseIdentityColumn();
    }
}
