using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Pos.Api.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddDevice : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Devices become the print management object: printers and keys move
            // under a real device row. The old PrintServiceKey table is folded
            // into Device (one key per device) and dropped afterwards.
            //
            // legacy_outlet_id/legacy_device_id are temporary columns used to map
            // legacy rows (which referenced a bare (outlet, deviceId) int pair) to
            // the new device ids; they are removed at the end of this migration.

            migrationBuilder.CreateTable(
                name: "device",
                columns: table => new
                {
                    id = table
                        .Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    outlet_id = table.Column<int>(type: "integer", nullable: false),
                    name = table.Column<string>(type: "text", nullable: false),
                    key_id = table.Column<string>(type: "text", nullable: true),
                    secret_hash = table.Column<string>(type: "text", nullable: true),
                    revoked_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    created = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    created_by = table.Column<string>(type: "text", nullable: true),
                    last_modified = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    last_modified_by = table.Column<string>(type: "text", nullable: true),
                    legacy_outlet_id = table.Column<int>(type: "integer", nullable: true),
                    legacy_device_id = table.Column<int>(type: "integer", nullable: true),
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_device", x => x.id);
                }
            );

            migrationBuilder.CreateIndex(name: "ix_device_key_id", table: "device", column: "key_id", unique: true);

            // 1. One device per legacy (outlet, deviceId) pair, carrying the key.
            //    When a pair has several keys (e.g. a revoked one and an active one)
            //    the newest active key wins; dead/revoked keys are not migrated.
            migrationBuilder.Sql(
                """
                INSERT INTO device (outlet_id, name, key_id, secret_hash, revoked_at, created, created_by, last_modified, last_modified_by, legacy_outlet_id, legacy_device_id)
                SELECT s.outlet_id, s.name, s.key_id, s.secret_hash, s.revoked_at, s.created, s.created_by, s.last_modified, s.last_modified_by, s.outlet_id, s.device_id
                FROM (
                    SELECT *, ROW_NUMBER() OVER (PARTITION BY outlet_id, device_id ORDER BY (revoked_at IS NULL) DESC, created DESC) AS rn
                    FROM print_service_key
                ) s
                WHERE s.rn = 1
                """
            );

            // 2. Outlets that have printers but never created a key get a device
            //    row too, so no printer is left without a parent.
            migrationBuilder.Sql(
                """
                INSERT INTO device (outlet_id, name, created, legacy_outlet_id, legacy_device_id)
                SELECT p.outlet_id, 'Device 1', MIN(p.created), p.outlet_id, p.device_id
                FROM printer p
                WHERE NOT EXISTS (
                    SELECT 1 FROM device d WHERE d.legacy_outlet_id = p.outlet_id AND d.legacy_device_id = p.device_id
                )
                GROUP BY p.outlet_id, p.device_id
                """
            );

            // 3. Repoint printers at their new device ids.
            migrationBuilder.Sql(
                """
                UPDATE printer p
                SET device_id = d.id
                FROM device d
                WHERE d.legacy_outlet_id = p.outlet_id AND d.legacy_device_id = p.device_id
                """
            );

            migrationBuilder.DropTable(name: "print_service_key");

            migrationBuilder.CreateIndex(name: "ix_printer_device_id", table: "printer", column: "device_id");

            migrationBuilder.AddForeignKey(
                name: "fk_printer_device_device_id",
                table: "printer",
                column: "device_id",
                principalTable: "device",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade
            );

            migrationBuilder.DropColumn(name: "legacy_outlet_id", table: "device");

            migrationBuilder.DropColumn(name: "legacy_device_id", table: "device");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(name: "fk_printer_device_device_id", table: "printer");

            migrationBuilder.DropIndex(name: "ix_printer_device_id", table: "printer");

            migrationBuilder.CreateTable(
                name: "print_service_key",
                columns: table => new
                {
                    id = table
                        .Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    created = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    created_by = table.Column<string>(type: "text", nullable: true),
                    device_id = table.Column<int>(type: "integer", nullable: false),
                    key_id = table.Column<string>(type: "text", nullable: false),
                    last_modified = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    last_modified_by = table.Column<string>(type: "text", nullable: true),
                    last_seen_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    name = table.Column<string>(type: "text", nullable: false),
                    outlet_id = table.Column<int>(type: "integer", nullable: false),
                    revoked_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    secret_hash = table.Column<string>(type: "text", nullable: false),
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_print_service_key", x => x.id);
                }
            );

            // Best-effort rollback: restore key rows from device rows. Printer
            // device ids stay repointed at the (new) device ids.
            migrationBuilder.Sql(
                """
                INSERT INTO print_service_key (outlet_id, device_id, key_id, secret_hash, name, revoked_at, created, created_by, last_modified, last_modified_by)
                SELECT outlet_id, id, key_id, secret_hash, name, revoked_at, created, created_by, last_modified, last_modified_by
                FROM device
                WHERE key_id IS NOT NULL
                """
            );

            migrationBuilder.CreateIndex(name: "ix_print_service_key_key_id", table: "print_service_key", column: "key_id", unique: true);

            migrationBuilder.DropTable(name: "device");
        }
    }
}
