using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Pos.Api.Entities;

namespace Pos.Api.Data.Configuration;

public class OutletFeatureConfiguration : IEntityTypeConfiguration<OutletFeature>
{
    public void Configure(EntityTypeBuilder<OutletFeature> builder)
    {
        builder.HasKey(k => new { k.FeatureId, k.OutletId });
    }
}
