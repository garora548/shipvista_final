using Microsoft.EntityFrameworkCore.Migrations;

namespace ShipvistaWaterPlants.Migrations
{
    public partial class ColumnAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "timeDifference",
                table: "Plants",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "timeDifference",
                table: "Plants");
        }
    }
}
