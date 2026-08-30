using Pos.Api.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Pos.Api.Data.Configuration;

public class AdjustmentTypeConfiguration : IEntityTypeConfiguration<AdjustmentType>
{
    public void Configure(EntityTypeBuilder<AdjustmentType> builder)
    {
        builder.Property(t => t.AdjustmentTypeId).UseIdentityColumn();
    }
}
