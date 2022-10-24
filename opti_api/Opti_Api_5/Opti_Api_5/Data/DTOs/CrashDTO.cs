namespace Opti_Api_5.Data.DTOs
{
    public class CrashDTO
    {
        public int crash_id { get; set; }
        public int crash_fatal_fl { get; set; }
        public string crash_date { get; set; }
        public string crash_time { get; set; }
        public double crash_speed_limt { get; set; }
        public double road_constr_zone_fl { get; set; }
        public double latitude { get; set; }
        public double longitude { get; set; }
        public int crash_sev_id { get; set; }
        public int sus_serious_injry_cnt { get; set; }
        public double nonincap_injry_cnt { get; set; }
        public double poss_injry_cnt { get; set; }
        public double non_injry_cnt { get; set; }
        public double unkn_injry_cnt { get; set; }
        public double tot_injry_cnt { get; set; }
        public int death_cnt { get; set; }
        public double pedestrian_fl { get; set; }
        public double motor_vehicle_fl { get; set; }
        public double motorcycle_fl { get; set; }
        public double bicycle_fl { get; set; }
        public double other_fl { get; set; }
        public double point { get; set; }
        public int apd_confirmed_death_count { get; set; }
        public int motor_vehicle_death_count { get; set; }
        public int motor_vehicle_serious_injury_count { get; set; }
        public int bicycle_serious_injury_count { get; set; }
        public int pedestrian_death_count { get; set; }
        public int pedestrian_serious_injury_count { get; set; }
        public int motorcycle_death_count { get; set; }
        public int motorcycle_serious_injury_count { get; set; }
        public int other_death_count { get; set; }
        public int other_serious_injury_count { get; set; }
    }
}
