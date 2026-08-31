using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Pos.Api.Entities;

namespace Pos.Api.Data.Configuration;

public class UserOutletConfiguration : IEntityTypeConfiguration<UserOutlet>
{
    public void Configure(EntityTypeBuilder<UserOutlet> builder)
    {
        builder.Property(t => t.Id).UseIdentityColumn();
        builder.HasIndex(i => new { i.UserId, i.IsCurrent });
    }
}
