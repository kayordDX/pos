using Pos.Api.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Pos.Api.Data.Configuration;

public class HaloLogConfiguration : IEntityTypeConfiguration<HaloLog>
{
    public void Configure(EntityTypeBuilder<HaloLog> builder)
    {
        builder.Property(t => t.Id).UseIdentityColumn();
    }
}
