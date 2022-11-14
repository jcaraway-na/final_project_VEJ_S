﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Opti_Api_5.Data;

namespace Opti_Api_5.Migrations
{
    [DbContext(typeof(AppDbContex))]
    [Migration("20221110200947_srsUpdateagain")]
    partial class srsUpdateagain
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.16")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Opti_Api_5.Data.DTOs.CrashSeverityDataDTO", b =>
                {
                    b.Property<int>("avg_crash_sev")
                        .HasColumnType("int");

                    b.Property<string>("crash_date")
                        .HasColumnType("nvarchar(max)");

                    b.Property<long>("row_index")
                        .HasColumnType("bigint");

                    b.ToTable("CrashSeverity");
                });

            modelBuilder.Entity("Opti_Api_5.Data.DTOs.CumDayOfWeekDTO", b =>
                {
                    b.Property<string>("date_time")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("day_of_week")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("issue_count")
                        .HasColumnType("int");

                    b.ToTable("DayOfWeek");
                });

            modelBuilder.Entity("Opti_Api_5.Data.DTOs.CumTrafficIssuesDTO", b =>
                {
                    b.Property<int>("issue_count")
                        .HasColumnType("int");

                    b.Property<string>("issue_reported")
                        .HasColumnType("nvarchar(max)");

                    b.ToTable("TrafficIssues");
                });

            modelBuilder.Entity("Opti_Api_5.Data.DTOs.HistoricalTrafficIssuesDTO", b =>
                {
                    b.Property<int>("historical_issue_count")
                        .HasColumnType("int");

                    b.Property<string>("issue_reported")
                        .HasColumnType("nvarchar(max)");

                    b.ToTable("HistoricalIssues");
                });

            modelBuilder.Entity("Opti_Api_5.Data.DTOs.RollingCumByIssueDTO", b =>
                {
                    b.Property<int>("auto_ped")
                        .HasColumnType("int");

                    b.Property<int>("blocked_driv_hwy")
                        .HasColumnType("int");

                    b.Property<int>("collision")
                        .HasColumnType("int");

                    b.Property<int>("collision_private_property")
                        .HasColumnType("int");

                    b.Property<int>("collision_with_injury")
                        .HasColumnType("int");

                    b.Property<int>("collisn_lvng_scn")
                        .HasColumnType("int");

                    b.Property<int>("crash_service")
                        .HasColumnType("int");

                    b.Property<int>("crash_urgent")
                        .HasColumnType("int");

                    b.Property<long>("index_num")
                        .HasColumnType("bigint");

                    b.Property<int>("loose_livestock")
                        .HasColumnType("int");

                    b.Property<string>("published_date")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("stalled_vehicle")
                        .HasColumnType("int");

                    b.Property<int>("traffic_hazard")
                        .HasColumnType("int");

                    b.Property<int>("trfc_hazd_debris")
                        .HasColumnType("int");

                    b.Property<int>("vehicle_fire")
                        .HasColumnType("int");

                    b.ToTable("RollingCumByIssue");
                });

            modelBuilder.Entity("Opti_Api_5.Data.Models.CrashModel", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("apd_confirmed_death_count")
                        .HasColumnType("int");

                    b.Property<double>("bicycle_fl")
                        .HasColumnType("float");

                    b.Property<int>("bicycle_serious_injury_count")
                        .HasColumnType("int");

                    b.Property<string>("crash_date")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("crash_fatal_fl")
                        .HasColumnType("int");

                    b.Property<int>("crash_id")
                        .HasColumnType("int");

                    b.Property<int>("crash_sev_id")
                        .HasColumnType("int");

                    b.Property<double>("crash_speed_limt")
                        .HasColumnType("float");

                    b.Property<string>("crash_time")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("death_cnt")
                        .HasColumnType("int");

                    b.Property<double>("latitude")
                        .HasColumnType("float");

                    b.Property<double>("longitude")
                        .HasColumnType("float");

                    b.Property<int>("motor_vehicle_death_count")
                        .HasColumnType("int");

                    b.Property<double>("motor_vehicle_fl")
                        .HasColumnType("float");

                    b.Property<int>("motor_vehicle_serious_injury_count")
                        .HasColumnType("int");

                    b.Property<int>("motorcycle_death_count")
                        .HasColumnType("int");

                    b.Property<double>("motorcycle_fl")
                        .HasColumnType("float");

                    b.Property<int>("motorcycle_serious_injury_count")
                        .HasColumnType("int");

                    b.Property<double>("non_injry_cnt")
                        .HasColumnType("float");

                    b.Property<double>("nonincap_injry_cnt")
                        .HasColumnType("float");

                    b.Property<int>("other_death_count")
                        .HasColumnType("int");

                    b.Property<double>("other_fl")
                        .HasColumnType("float");

                    b.Property<int>("other_serious_injury_count")
                        .HasColumnType("int");

                    b.Property<int>("pedestrian_death_count")
                        .HasColumnType("int");

                    b.Property<double>("pedestrian_fl")
                        .HasColumnType("float");

                    b.Property<int>("pedestrian_serious_injury_count")
                        .HasColumnType("int");

                    b.Property<double>("point")
                        .HasColumnType("float");

                    b.Property<double>("poss_injry_cnt")
                        .HasColumnType("float");

                    b.Property<double>("road_constr_zone_fl")
                        .HasColumnType("float");

                    b.Property<int>("sus_serious_injry_cnt")
                        .HasColumnType("int");

                    b.Property<double>("tot_injry_cnt")
                        .HasColumnType("float");

                    b.Property<double>("unkn_injry_cnt")
                        .HasColumnType("float");

                    b.HasKey("id");

                    b.ToTable("Crash");
                });

            modelBuilder.Entity("Opti_Api_5.Data.Models.PopulationModel", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<double>("growth_rate")
                        .HasColumnType("float");

                    b.Property<int>("population")
                        .HasColumnType("int");

                    b.Property<int>("year")
                        .HasColumnType("int");

                    b.HasKey("id");

                    b.ToTable("Population");
                });

            modelBuilder.Entity("Opti_Api_5.Data.Models.PredictSrsModel", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("Actual")
                        .HasColumnType("int");

                    b.Property<int>("Crashes_Avoid")
                        .HasColumnType("int");

                    b.Property<string>("Month")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Prediction")
                        .HasColumnType("float");

                    b.HasKey("id");

                    b.ToTable("PredictSrs");
                });

            modelBuilder.Entity("Opti_Api_5.Data.Models.RealTimeTrafficModel", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("issue_reported")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("latitude")
                        .HasColumnType("float");

                    b.Property<double>("longitude")
                        .HasColumnType("float");

                    b.Property<string>("published_date")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("traffic_report_id")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("traffic_report_status")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("traffic_report_status_date_time")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("Traffic");
                });

            modelBuilder.Entity("Opti_Api_5.Data.Models.TotalSeriousAccidentsPerYearModel", b =>
                {
                    b.Property<int>("index_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<double>("growth_rate")
                        .HasColumnType("float");

                    b.Property<double>("id")
                        .HasColumnType("float");

                    b.Property<double>("population")
                        .HasColumnType("float");

                    b.Property<double>("serious_fl")
                        .HasColumnType("float");

                    b.Property<double>("year")
                        .HasColumnType("float");

                    b.HasKey("index_id");

                    b.ToTable("Tsapy");
                });
#pragma warning restore 612, 618
        }
    }
}
