using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Pos.Api.Entities;

namespace Pos.Api.Data.Configuration;

public class OutletPaymentTypeConfiguration : IEntityTypeConfiguration<OutletPaymentType>
{
    public void Configure(EntityTypeBuilder<OutletPaymentType> builder)
    {
        builder.HasKey(k => new { k.OutletId, k.PaymentTypeId });

        builder.HasOne(s => s.Outlet).WithMany(m => m.OutletPaymentTypes).HasForeignKey(e => e.OutletId);

        builder.HasOne(s => s.PaymentType).WithMany(m => m.OutletPaymentTypes).HasForeignKey(e => e.PaymentTypeId);
    }
}
