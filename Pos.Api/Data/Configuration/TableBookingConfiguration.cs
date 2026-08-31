using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Pos.Api.Entities;

namespace Pos.Api.Data.Configuration;

public class TableBookingConfiguration : IEntityTypeConfiguration<TableBooking>
{
    public void Configure(EntityTypeBuilder<TableBooking> builder)
    {
        builder.Property(t => t.Id).UseIdentityColumn();
        builder.HasIndex(i => new { i.UserId, i.CloseDate });
    }
}
