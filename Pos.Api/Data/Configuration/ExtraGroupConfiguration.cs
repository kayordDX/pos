using Pos.Api.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Pos.Api.Data.Configuration;

public class ExtraGroupConfiguration : IEntityTypeConfiguration<ExtraGroup>
{
    public void Configure(EntityTypeBuilder<ExtraGroup> builder)
    {
        builder.Property(t => t.ExtraGroupId).UseIdentityColumn();
    }
}
