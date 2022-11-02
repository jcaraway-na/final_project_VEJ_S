using System;

namespace Opti_Api_5.Data.DTOs
{
    public class RollingCumByIssueDTO
    {
        public Int64 index_num { get; set; }
        public string published_date { get; set; }
        public int auto_ped { get; set; }
        public int blocked_driv_hwy { get; set; }
        public int collision { get; set; }
        public int collision_with_injury { get; set; }
        public int collision_private_property { get; set; }
        public int collisn_lvng_scn { get; set; }
        public int crash_service { get; set; }
        public int crash_urgent { get; set; }
        public int loose_livestock { get; set; }
        public int stalled_vehicle { get; set; }
        public int traffic_hazard { get; set; }
        public int trfc_hazd_debris { get; set; }
        public int vehicle_fire { get; set; }
    }
}
