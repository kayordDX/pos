using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Pos.Api.Entities;

namespace Pos.Api.Data.Configuration;

public class UserOutletPinConfiguration : IEntityTypeConfiguration<UserOutletPin>
{
    public void Configure(EntityTypeBuilder<UserOutletPin> builder)
    {
        builder.HasKey(k => new { k.UserId, k.OutletId });
    }
}
