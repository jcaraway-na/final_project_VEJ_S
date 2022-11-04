using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Opti_Api_5.Data.Models
{
    public class RealTimeTrafficModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }
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
