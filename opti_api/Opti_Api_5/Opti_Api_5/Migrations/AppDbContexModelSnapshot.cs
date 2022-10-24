﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Opti_Api_5.Data;

namespace Opti_Api_5.Migrations
{
    [DbContext(typeof(AppDbContex))]
    partial class AppDbContexModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.16")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

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
#pragma warning restore 612, 618
        }
    }
}
