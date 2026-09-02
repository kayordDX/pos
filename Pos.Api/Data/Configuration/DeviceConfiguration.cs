using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Pos.Api.Entities;

namespace Pos.Api.Data.Configuration;

public class DeviceConfiguration : IEntityTypeConfiguration<Device>
{
    public void Configure(EntityTypeBuilder<Device> builder)
    {
        builder.Property(t => t.Id).UseIdentityColumn();
        builder.Property(t => t.Name).IsRequired();
        builder.HasIndex(t => t.KeyId).IsUnique();
    }
}
