using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Pos.Api.Entities;

namespace Pos.Api.Data.Configuration;

public class PriceAuditConfiguration : IEntityTypeConfiguration<PriceAudit>
{
    public void Configure(EntityTypeBuilder<PriceAudit> builder)
    {
        builder.HasIndex(i => new
        {
            i.EntityType,
            i.EntityId,
            i.ChangedAt,
        });
    }
}
