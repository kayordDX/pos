using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Pos.Api.Entities;

namespace Pos.Api.Data.Configuration;

public class BulkUploadConfigConfiguration : IEntityTypeConfiguration<BulkUploadConfig>
{
    public void Configure(EntityTypeBuilder<BulkUploadConfig> builder)
    {
        builder.Property(t => t.Id).UseIdentityColumn();
    }
}
