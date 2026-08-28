using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Pos.Api.Data.Migrations
{
    /// <inheritdoc />
    public partial class StockCateIsDeleted : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "is_deleted",
                table: "stock_category",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "is_deleted",
                table: "stock_category");
        }
    }
}
