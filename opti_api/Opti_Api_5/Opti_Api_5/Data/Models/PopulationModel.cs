using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Opti_Api_5.Data.Models
{
    public class PopulationModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }
        public Int32 year { get; set; }
        public Int32 population { get; set; }
        public double growth_rate { get; set; }

    }
}
