using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Pos.Api.Entities;

namespace Pos.Api.Data.Configuration;

public class ExtraGroupConfiguration : IEntityTypeConfiguration<ExtraGroup>
{
    public void Configure(EntityTypeBuilder<ExtraGroup> builder)
    {
        builder.Property(t => t.ExtraGroupId).UseIdentityColumn();
    }
}
