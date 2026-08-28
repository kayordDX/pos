using Pos.Api.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Pos.Api.Data.Configuration;

public class BulkUploadConfigConfiguration : IEntityTypeConfiguration<BulkUploadConfig>
{
    public void Configure(EntityTypeBuilder<BulkUploadConfig> builder)
    {
        builder.Property(t => t.Id).UseIdentityColumn();
    }
}
