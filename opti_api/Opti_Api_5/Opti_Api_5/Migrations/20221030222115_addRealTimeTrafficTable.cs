using Microsoft.EntityFrameworkCore.Migrations;

namespace Opti_Api_5.Migrations
{
    public partial class addRealTimeTrafficTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Traffic",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    traffic_report_id = table.Column<int>(type: "int", nullable: false),
                    published_date = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    issue_reported = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    latitude = table.Column<double>(type: "float", nullable: false),
                    longitude = table.Column<double>(type: "float", nullable: false),
                    address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    traffic_report_status = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    traffic_report_status_date_time = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Traffic", x => x.id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Traffic");
        }
    }
}
