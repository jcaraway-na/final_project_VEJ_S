namespace Opti_Api_5.Data.DTOs
{
    public class RealTimeTrafficDTO
    {
        public string traffic_report_id { get; set; }
        public string published_date { get; set; }
        public string issue_reported { get; set; }
        public double latitude { get; set; }
        public double longitude { get; set; }
        public string address { get; set; }
        public string traffic_report_status { get; set; }
        public string traffic_report_status_date_time { get; set; }
    }
}
