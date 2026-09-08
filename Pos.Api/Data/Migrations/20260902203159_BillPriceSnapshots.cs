using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Pos.Api.Data.Migrations
{
    /// <inheritdoc />
    public partial class BillPriceSnapshots : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(name: "table_name", table: "table_booking", type: "text", nullable: true);

            migrationBuilder.AddColumn<decimal>(name: "vat_rate", table: "table_booking", type: "numeric", nullable: true);

            migrationBuilder.AddColumn<string>(name: "waiter_name", table: "table_booking", type: "text", nullable: true);

            migrationBuilder.AddColumn<string>(name: "name", table: "order_item_option", type: "text", nullable: false, defaultValue: "");

            migrationBuilder.AddColumn<decimal>(name: "price", table: "order_item_option", type: "numeric", nullable: false, defaultValue: 0m);

            migrationBuilder.AddColumn<string>(name: "name", table: "order_item_extra", type: "text", nullable: false, defaultValue: "");

            migrationBuilder.AddColumn<decimal>(name: "price", table: "order_item_extra", type: "numeric", nullable: false, defaultValue: 0m);

            migrationBuilder.AddColumn<int>(name: "bill_category_id", table: "order_item", type: "integer", nullable: true);

            migrationBuilder.AddColumn<string>(name: "bill_category_name", table: "order_item", type: "text", nullable: true);

            migrationBuilder.AddColumn<string>(name: "name", table: "order_item", type: "text", nullable: false, defaultValue: "");

            migrationBuilder.AddColumn<decimal>(name: "unit_price", table: "order_item", type: "numeric", nullable: false, defaultValue: 0m);

            migrationBuilder.Sql(
                """
                UPDATE "order_item" o SET "unit_price" = m."price", "name" = m."name", "bill_category_id" = m."bill_category_id",
                    "bill_category_name" = COALESCE(bc."name", 'Other')
                FROM "menu_item" m LEFT JOIN "bill_category" bc ON bc."id" = m."bill_category_id"
                WHERE o."menu_item_id" = m."menu_item_id";

                UPDATE "order_item_option" o SET "price" = p."price", "name" = p."name" FROM "option" p WHERE o."option_id" = p."option_id";

                UPDATE "order_item_extra" o SET "price" = e."price", "name" = e."name" FROM "extra" e WHERE o."extra_id" = e."extra_id";

                UPDATE "table_booking" t SET "vat_rate" = 1 + v."value"
                FROM "vat_rate" v
                WHERE t."close_date" IS NOT NULL AND t."booking_date" >= v."start_date" AND t."booking_date" <= v."end_date";

                UPDATE "table_booking" t SET "table_name" = tb."name", "waiter_name" = u."name"
                FROM "table" tb, "user" u
                WHERE t."close_date" IS NOT NULL AND t."table_id" = tb."table_id" AND t."user_id" = u."user_id";
                """
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(name: "table_name", table: "table_booking");

            migrationBuilder.DropColumn(name: "vat_rate", table: "table_booking");

            migrationBuilder.DropColumn(name: "waiter_name", table: "table_booking");

            migrationBuilder.DropColumn(name: "name", table: "order_item_option");

            migrationBuilder.DropColumn(name: "price", table: "order_item_option");

            migrationBuilder.DropColumn(name: "name", table: "order_item_extra");

            migrationBuilder.DropColumn(name: "price", table: "order_item_extra");

            migrationBuilder.DropColumn(name: "bill_category_id", table: "order_item");

            migrationBuilder.DropColumn(name: "bill_category_name", table: "order_item");

            migrationBuilder.DropColumn(name: "name", table: "order_item");

            migrationBuilder.DropColumn(name: "unit_price", table: "order_item");
        }
    }
}
