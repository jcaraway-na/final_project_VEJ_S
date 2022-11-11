using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Opti_Api_5.Data.Models
{
    public class PredictSrsModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }
        public string Month { get; set; }
        public double Prediction { get; set; }
        public int Actual { get; set; }
        public int Crashes_Avoided { get; set; }
    }
}
