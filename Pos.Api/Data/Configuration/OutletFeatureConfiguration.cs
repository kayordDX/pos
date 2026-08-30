using Pos.Api.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Pos.Api.Data.Configuration;

public class OutletFeatureConfiguration : IEntityTypeConfiguration<OutletFeature>
{
    public void Configure(EntityTypeBuilder<OutletFeature> builder)
    {
        builder.HasKey(k => new { k.FeatureId, k.OutletId });
    }
}
