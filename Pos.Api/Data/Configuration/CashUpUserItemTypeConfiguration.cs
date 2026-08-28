using Pos.Api.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Pos.Api.Data.Configuration;

public class CashUpUserItemTypeConfiguration : IEntityTypeConfiguration<CashUpUserItemType>
{
    public void Configure(EntityTypeBuilder<CashUpUserItemType> builder)
    {
        builder.Property(t => t.Id).UseIdentityColumn();
    }
}
