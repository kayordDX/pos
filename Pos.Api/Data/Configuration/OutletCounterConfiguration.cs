using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Pos.Api.Entities;

namespace Pos.Api.Data.Configuration;

public class OutletCounterConfiguration : IEntityTypeConfiguration<OutletCounter>
{
    public void Configure(EntityTypeBuilder<OutletCounter> builder)
    {
        builder.HasKey(k => new { k.Id });
        builder.HasIndex(k => new { k.OutletId });
    }
}
