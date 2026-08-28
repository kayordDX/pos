using Pos.Api.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Pos.Api.Data.Configuration;

public class NotificationUserConfiguration : IEntityTypeConfiguration<NotificationUser>
{
    public void Configure(EntityTypeBuilder<NotificationUser> builder)
    {
        builder.HasKey(t => new { t.UserId, t.Token });
    }
}
