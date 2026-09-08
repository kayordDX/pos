using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Pos.Api.Data.Migrations
{
    /// <inheritdoc />
    public partial class PriceAudit : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "price_audit",
                columns: table => new
                {
                    id = table
                        .Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    entity_type = table.Column<int>(type: "integer", nullable: false),
                    entity_id = table.Column<int>(type: "integer", nullable: false),
                    old_price = table.Column<decimal>(type: "numeric", nullable: false),
                    new_price = table.Column<decimal>(type: "numeric", nullable: false),
                    user_id = table.Column<string>(type: "text", nullable: true),
                    changed_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_price_audit", x => x.id);
                }
            );

            migrationBuilder.CreateIndex(
                name: "ix_price_audit_entity_type_entity_id_changed_at",
                table: "price_audit",
                columns: new[] { "entity_type", "entity_id", "changed_at" }
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(name: "price_audit");
        }
    }
}
