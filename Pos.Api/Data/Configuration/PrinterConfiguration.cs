using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Pos.Api.Entities;

namespace Pos.Api.Data.Configuration;

public class PrinterConfiguration : IEntityTypeConfiguration<Printer>
{
    public void Configure(EntityTypeBuilder<Printer> builder)
    {
        builder.Property(t => t.Id).UseIdentityColumn();
        builder.HasOne<Device>().WithMany(d => d.Printers).HasForeignKey(x => x.DeviceId).OnDelete(DeleteBehavior.Cascade);
    }
}
