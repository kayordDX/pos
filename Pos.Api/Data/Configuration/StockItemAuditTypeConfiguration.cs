using Pos.Api.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Pos.Api.Data.Configuration;

public class StockItemAuditTypeConfiguration : IEntityTypeConfiguration<StockItemAuditType>
{
    public void Configure(EntityTypeBuilder<StockItemAuditType> builder)
    {
        builder.Property(t => t.Id).UseIdentityColumn();
    }
}
