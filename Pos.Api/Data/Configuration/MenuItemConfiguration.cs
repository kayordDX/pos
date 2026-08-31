using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Pos.Api.Entities;

namespace Pos.Api.Data.Configuration;

public class MenuItemConfiguration : IEntityTypeConfiguration<MenuItem>
{
    public void Configure(EntityTypeBuilder<MenuItem> builder)
    {
        builder.HasGeneratedTsVectorColumn(p => p.SearchVector, "english", p => new { p.Name, p.Description }).HasIndex(p => p.SearchVector).HasMethod("GIN");

        builder.Property(t => t.IsEnabled).HasDefaultValue(true);
        builder.Property(t => t.MenuItemId).UseIdentityColumn();

        builder.HasIndex(i => new { i.DivisionId });
    }
}
