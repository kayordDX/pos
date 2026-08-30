using Pos.Api.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Pos.Api.Data.Configuration;

public class RoleDivisionConfiguration : IEntityTypeConfiguration<RoleDivision>
{
    public void Configure(EntityTypeBuilder<RoleDivision> builder)
    {
        builder.HasIndex(e => new { e.RoleId, e.DivisionId }).IsUnique();
    }
}
