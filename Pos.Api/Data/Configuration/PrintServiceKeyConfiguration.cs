using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Pos.Api.Entities;

namespace Pos.Api.Data.Configuration;

public class PrintServiceKeyConfiguration : IEntityTypeConfiguration<PrintServiceKey>
{
    public void Configure(EntityTypeBuilder<PrintServiceKey> builder)
    {
        builder.Property(t => t.Id).UseIdentityColumn();
        builder.Property(t => t.KeyId).IsRequired();
        builder.Property(t => t.SecretHash).IsRequired();
        builder.Property(t => t.Name).IsRequired();
        builder.HasIndex(t => t.KeyId).IsUnique();
    }
}
