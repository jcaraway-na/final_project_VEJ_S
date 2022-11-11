using Microsoft.EntityFrameworkCore;
using Opti_Api_5.Data.DTOs;
using Opti_Api_5.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Opti_Api_5.Data
{
    public class AppDbContex : DbContext
    {
        public AppDbContex(DbContextOptions<AppDbContex> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CumDayOfWeekDTO>().HasNoKey();
            modelBuilder.Entity<CumTrafficIssuesDTO>().HasNoKey();
            modelBuilder.Entity<HistoricalTrafficIssuesDTO>().HasNoKey();
            modelBuilder.Entity<CrashSeverityDataDTO>().HasNoKey();
            modelBuilder.Entity<RollingCumByIssueDTO>().HasNoKey();
        }

        public DbSet<CrashModel> Crash { get; set; }
        public DbSet<RealTimeTrafficModel> Traffic { get; set; }
        public DbSet<CumDayOfWeekDTO> DayOfWeek { get; set; }
        public DbSet<CumTrafficIssuesDTO> TrafficIssues { get; set; }
        public DbSet<HistoricalTrafficIssuesDTO> HistoricalIssues { get; set; }
        public DbSet<CrashSeverityDataDTO> CrashSeverity { get; set; }
        public DbSet<RollingCumByIssueDTO> RollingCumByIssue { get; set; }
        public DbSet<PopulationModel> Population { get; set; }
        public DbSet<TotalSeriousAccidentsPerYearModel> Tsapy { get; set; }
        public DbSet<PredictSrsModel> PredictSrs { get; set; }
    }
}
