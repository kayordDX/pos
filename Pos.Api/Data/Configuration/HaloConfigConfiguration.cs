using Pos.Api.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Pos.Api.Data.Configuration;

public class HaloConfigConfiguration : IEntityTypeConfiguration<HaloConfig>
{
    public void Configure(EntityTypeBuilder<HaloConfig> builder)
    {
        builder.Property(t => t.Id).UseIdentityColumn();
    }
}
