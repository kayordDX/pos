using Pos.Api.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Pos.Api.Data.Configuration;

public class AdjustmentTypeOutletConfiguration : IEntityTypeConfiguration<AdjustmentTypeOutlet>
{
    public void Configure(EntityTypeBuilder<AdjustmentTypeOutlet> builder)
    {
        builder.Property(t => t.Id).UseIdentityColumn();
    }
}
