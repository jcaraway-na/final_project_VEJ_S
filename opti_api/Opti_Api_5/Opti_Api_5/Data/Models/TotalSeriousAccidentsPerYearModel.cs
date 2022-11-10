using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Opti_Api_5.Data.Models
{
    public class TotalSeriousAccidentsPerYearModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int index_id { get; set; }
        public double year { get; set; }
        public double serious_fl { get; set; }
        public double id { get; set; }
        public double population { get; set; }
        public double growth_rate { get; set; }

    }
}
