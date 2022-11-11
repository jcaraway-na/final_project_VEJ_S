using Microsoft.EntityFrameworkCore.Migrations;

namespace Opti_Api_5.Migrations
{
    public partial class srsUpdateagain : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Crash_Avoided",
                table: "PredictSrs",
                newName: "Crashes_Avoided");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Crash_Avoided",
                table: "PredictSrs",
                newName: "Crashes_Avoided");
        }
    }
}
