using Pos.Api.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Pos.Api.Data.Configuration;

public class OutletExtraGroupConfiguration : IEntityTypeConfiguration<OutletExtraGroup>
{
    public void Configure(EntityTypeBuilder<OutletExtraGroup> builder)
    {
        builder.Property(t => t.Id).UseIdentityColumn();
    }
}
