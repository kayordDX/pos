using Pos.Api.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Pos.Api.Data.Configuration;

public class BillCategoryConfiguration : IEntityTypeConfiguration<BillCategory>
{
    public void Configure(EntityTypeBuilder<BillCategory> builder)
    {
        builder.Property(t => t.Id).UseIdentityColumn();

    }
}
