using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Pos.Api.Entities;

namespace Pos.Api.Data.Configuration;

public class AdjustmentTypeOutletConfiguration : IEntityTypeConfiguration<AdjustmentTypeOutlet>
{
    public void Configure(EntityTypeBuilder<AdjustmentTypeOutlet> builder)
    {
        builder.Property(t => t.Id).UseIdentityColumn();
    }
}
