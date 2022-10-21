using Microsoft.EntityFrameworkCore.Migrations;

namespace Opti_Api_5.Migrations
{
    public partial class addCrahTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Crash",
                columns: table => new
                {
                    crash_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    crash_fatal_fl = table.Column<int>(type: "int", nullable: false),
                    crash_date = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    crash_time = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    crash_speed_limt = table.Column<double>(type: "float", nullable: false),
                    road_constr_zone_fl = table.Column<double>(type: "float", nullable: false),
                    latitude = table.Column<double>(type: "float", nullable: false),
                    longitude = table.Column<double>(type: "float", nullable: false),
                    crash_sev_id = table.Column<int>(type: "int", nullable: false),
                    sus_serious_injry_cnt = table.Column<int>(type: "int", nullable: false),
                    nonincap_injry_cnt = table.Column<double>(type: "float", nullable: false),
                    poss_injry_cnt = table.Column<double>(type: "float", nullable: false),
                    non_injry_cnt = table.Column<double>(type: "float", nullable: false),
                    unkn_injry_cnt = table.Column<double>(type: "float", nullable: false),
                    tot_injry_cnt = table.Column<double>(type: "float", nullable: false),
                    death_cnt = table.Column<int>(type: "int", nullable: false),
                    pedestrian_fl = table.Column<double>(type: "float", nullable: false),
                    motor_vehicle_fl = table.Column<double>(type: "float", nullable: false),
                    motorcycle_fl = table.Column<double>(type: "float", nullable: false),
                    bicycle_fl = table.Column<double>(type: "float", nullable: false),
                    other_fl = table.Column<double>(type: "float", nullable: false),
                    point = table.Column<double>(type: "float", nullable: false),
                    apd_confirmed_death_count = table.Column<int>(type: "int", nullable: false),
                    motor_vehicle_death_count = table.Column<int>(type: "int", nullable: false),
                    motor_vehicle_serious_injury_count = table.Column<int>(type: "int", nullable: false),
                    bicycle_serious_injury_count = table.Column<int>(type: "int", nullable: false),
                    pedestrian_death_count = table.Column<int>(type: "int", nullable: false),
                    pedestrian_serious_injury_count = table.Column<int>(type: "int", nullable: false),
                    motorcycle_death_count = table.Column<int>(type: "int", nullable: false),
                    motorcycle_serious_injury_count = table.Column<int>(type: "int", nullable: false),
                    other_death_count = table.Column<int>(type: "int", nullable: false),
                    other_serious_injury_count = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Crash", x => x.crash_id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Crash");
        }
    }
}
