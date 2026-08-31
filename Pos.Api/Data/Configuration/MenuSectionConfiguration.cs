using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Pos.Api.Entities;

namespace Pos.Api.Data.Configuration;

public class MenuSectionConfiguration : IEntityTypeConfiguration<MenuSection>
{
    public void Configure(EntityTypeBuilder<MenuSection> builder)
    {
        builder.Property(t => t.MenuSectionId).UseIdentityColumn();
        builder.HasOne(s => s.Parent).WithMany(m => m.SubMenuSections).HasForeignKey(e => e.ParentId);
    }
}
