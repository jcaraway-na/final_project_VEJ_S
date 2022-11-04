using Microsoft.EntityFrameworkCore;
using Opti_Api_5.Data.DTOs;
using Opti_Api_5.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Opti_Api_5.Data.Services
{    
    public class StoredProcedureServices
    {
        private AppDbContex _context;

        public StoredProcedureServices(AppDbContex contex)
        {
            _context = contex;
        }

        public List<CumDayOfWeekDTO> GetDayOfWeek()
        {
            var call = _context.DayOfWeek.FromSqlRaw($"spCumulativeDayOfWeek").ToList();
            return call;
        }

        public List<CumTrafficIssuesDTO> GetTrafficIssues(string start_date, string end_date)
        {
            var call = _context.TrafficIssues.FromSqlRaw($"spCumulativeTrafficIssues '{start_date}', '{end_date}'").ToList();
            return call;
        }

        public List<HistoricalTrafficIssuesDTO> GetHistoricalTrafficData(string start_date, string end_date)
        {
            var call = _context.HistoricalIssues.FromSqlRaw($"spHistoricalTrafficData '{start_date}', '{end_date}'").ToList();
            return call;
        }

        public List<CrashSeverityDataDTO> GetCrashSeverityData(string start_date, string end_date)
        {
            var call = _context.CrashSeverity.FromSqlRaw($"spCrashSeverityData '{start_date}', '{end_date}'").ToList();
            return call;
        }
        public List<RollingCumByIssueDTO> GetRollingCumByIssue(string start_date, string end_date)
        {
            var call = _context.RollingCumByIssue.FromSqlRaw($"spRollingCumulativeByIssueReported '{start_date}', '{end_date}'").ToList();
            return call;
        }
    }
}
