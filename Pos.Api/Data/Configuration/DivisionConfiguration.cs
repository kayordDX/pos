using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Pos.Api.Entities;

namespace Pos.Api.Data.Configuration;

public class DivisionConfiguration : IEntityTypeConfiguration<Division>
{
    public void Configure(EntityTypeBuilder<Division> builder)
    {
        builder.Property(t => t.DivisionId).UseIdentityColumn();
        builder.HasIndex(e => new { e.DivisionName, e.OutletId }).IsUnique().HasFilter("\"is_deleted\" = false");
    }
}
