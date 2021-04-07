using Microsoft.EntityFrameworkCore.Migrations;

namespace ShipvistaWaterPlants.Migrations
{
    public partial class ColumnRemoved : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "timeDifference",
                table: "Plants");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "timeDifference",
                table: "Plants",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
