using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Pos.Api.Entities;

namespace Pos.Api.Data.Configuration;

public class OutletExtraGroupConfiguration : IEntityTypeConfiguration<OutletExtraGroup>
{
    public void Configure(EntityTypeBuilder<OutletExtraGroup> builder)
    {
        builder.Property(t => t.Id).UseIdentityColumn();
    }
}
