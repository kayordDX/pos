using Pos.Api.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Pos.Api.Data.Configuration;

public class UserOutletPinConfiguration : IEntityTypeConfiguration<UserOutletPin>
{
    public void Configure(EntityTypeBuilder<UserOutletPin> builder)
    {
        builder.HasKey(k => new { k.UserId, k.OutletId });
    }
}
