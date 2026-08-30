using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Pos.Api.Data.Migrations
{
    /// <inheritdoc />
    public partial class MenuPaarGoed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PositionId",
                table: "Option",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PositionId",
                table: "MenuSection",
                type: "integer",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PositionId",
                table: "Option");

            migrationBuilder.DropColumn(
                name: "PositionId",
                table: "MenuSection");
        }
    }
}
