using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Pos.Api.Entities;

namespace Pos.Api.Data.Configuration;

public class CashUpUserItemTypeConfiguration : IEntityTypeConfiguration<CashUpUserItemType>
{
    public void Configure(EntityTypeBuilder<CashUpUserItemType> builder)
    {
        builder.Property(t => t.Id).UseIdentityColumn();
    }
}
