using System;

namespace Opti_Api_5.Data.DTOs
{
    public class CrashSeverityDataDTO
    {
        public Int64 row_index { get; set; }
        public string crash_date { get; set; }
        public int avg_crash_sev { get; set; }
    }
}
