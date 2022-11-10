using Microsoft.EntityFrameworkCore.Migrations;

namespace Opti_Api_5.Migrations
{
    public partial class addPopulationTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CrashSeverity",
                columns: table => new
                {
                    row_index = table.Column<long>(type: "bigint", nullable: false),
                    crash_date = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    avg_crash_sev = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                });

            migrationBuilder.CreateTable(
                name: "DayOfWeek",
                columns: table => new
                {
                    date_time = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    day_of_week = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    issue_count = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                });

            migrationBuilder.CreateTable(
                name: "HistoricalIssues",
                columns: table => new
                {
                    issue_reported = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    historical_issue_count = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                });

            migrationBuilder.CreateTable(
                name: "RollingCumByIssue",
                columns: table => new
                {
                    index_num = table.Column<long>(type: "bigint", nullable: false),
                    published_date = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    auto_ped = table.Column<int>(type: "int", nullable: false),
                    blocked_driv_hwy = table.Column<int>(type: "int", nullable: false),
                    collision = table.Column<int>(type: "int", nullable: false),
                    collision_with_injury = table.Column<int>(type: "int", nullable: false),
                    collision_private_property = table.Column<int>(type: "int", nullable: false),
                    collisn_lvng_scn = table.Column<int>(type: "int", nullable: false),
                    crash_service = table.Column<int>(type: "int", nullable: false),
                    crash_urgent = table.Column<int>(type: "int", nullable: false),
                    loose_livestock = table.Column<int>(type: "int", nullable: false),
                    stalled_vehicle = table.Column<int>(type: "int", nullable: false),
                    traffic_hazard = table.Column<int>(type: "int", nullable: false),
                    trfc_hazd_debris = table.Column<int>(type: "int", nullable: false),
                    vehicle_fire = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                });

            migrationBuilder.CreateTable(
                name: "TrafficIssues",
                columns: table => new
                {
                    issue_reported = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    issue_count = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CrashSeverity");

            migrationBuilder.DropTable(
                name: "DayOfWeek");

            migrationBuilder.DropTable(
                name: "HistoricalIssues");

            migrationBuilder.DropTable(
                name: "RollingCumByIssue");

            migrationBuilder.DropTable(
                name: "TrafficIssues");
        }
    }
}
