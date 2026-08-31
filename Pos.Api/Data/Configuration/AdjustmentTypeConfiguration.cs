using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Pos.Api.Entities;

namespace Pos.Api.Data.Configuration;

public class AdjustmentTypeConfiguration : IEntityTypeConfiguration<AdjustmentType>
{
    public void Configure(EntityTypeBuilder<AdjustmentType> builder)
    {
        builder.Property(t => t.AdjustmentTypeId).UseIdentityColumn();
    }
}
