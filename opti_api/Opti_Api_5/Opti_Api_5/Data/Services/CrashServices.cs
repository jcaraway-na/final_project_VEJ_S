using Opti_Api_5.Data.DTOs;
using Opti_Api_5.Data.Models;
using System.Collections.Generic;
using System.Linq;

namespace Opti_Api_5.Data.Services
{    
    public class CrashServices
    {
        private AppDbContex _context;

        public CrashServices(AppDbContex contex)
        {
            _context = contex;
        }

        public void AddCrash(CrashDTO crash)
        {
            var _crash = new CrashModel()
            {
                crash_id = crash.crash_id,
                crash_fatal_fl = crash.crash_fatal_fl,
                crash_date = crash.crash_date,
                crash_time = crash.crash_date,
                crash_speed_limt = crash.crash_speed_limt,
                road_constr_zone_fl = crash.road_constr_zone_fl,
                latitude = crash.latitude,
                longitude = crash.longitude,
                crash_sev_id = crash.crash_sev_id,
                sus_serious_injry_cnt = crash.sus_serious_injry_cnt,
                nonincap_injry_cnt = crash.nonincap_injry_cnt,
                poss_injry_cnt = crash.poss_injry_cnt,
                non_injry_cnt = crash.non_injry_cnt,
                unkn_injry_cnt = crash.unkn_injry_cnt,
                tot_injry_cnt = crash.tot_injry_cnt,
                death_cnt = crash.death_cnt,
                pedestrian_fl = crash.pedestrian_fl,
                motor_vehicle_fl = crash.motor_vehicle_fl,
                motorcycle_fl = crash.motorcycle_fl,
                bicycle_fl = crash.bicycle_fl,
                other_fl = crash.other_fl,
                point = crash.point,
                apd_confirmed_death_count = crash.apd_confirmed_death_count,
                motor_vehicle_death_count = crash.motor_vehicle_death_count,
                motor_vehicle_serious_injury_count = crash.motor_vehicle_serious_injury_count,
                bicycle_serious_injury_count = crash.bicycle_serious_injury_count,
                pedestrian_death_count = crash.pedestrian_death_count,
                pedestrian_serious_injury_count = crash.pedestrian_serious_injury_count,
                motorcycle_death_count = crash.motorcycle_death_count,
                motorcycle_serious_injury_count = crash.motorcycle_serious_injury_count,
                other_death_count = crash.other_death_count,
                other_serious_injury_count = crash.other_serious_injury_count
            };
            _context.Crash.Add(_crash);
            _context.SaveChanges();
        }

        public List<CrashModel> GetAllCrashes() => _context.Crash.ToList();

        public CrashModel GetCrashById(int crashId) => _context.Crash.FirstOrDefault(n => n.crash_id == crashId);

        public CrashModel UpdateCrashById(int crashId, CrashDTO crash)
        {
            var _crash = _context.Crash.FirstOrDefault(n => n.crash_id == crashId);
            if (_crash != null)
            {
                _crash.crash_id = crash.crash_id;
                _crash.crash_fatal_fl = crash.crash_fatal_fl;
                _crash.crash_date = crash.crash_date;
                _crash.crash_time = crash.crash_date;
                _crash.crash_speed_limt = crash.crash_speed_limt;
                _crash.road_constr_zone_fl = crash.road_constr_zone_fl;
                _crash.latitude = crash.latitude;
                _crash.longitude = crash.longitude;
                _crash.crash_sev_id = crash.crash_sev_id;
                _crash.sus_serious_injry_cnt = crash.sus_serious_injry_cnt;
                _crash.nonincap_injry_cnt = crash.nonincap_injry_cnt;
                _crash.poss_injry_cnt = crash.poss_injry_cnt;
                _crash.non_injry_cnt = crash.non_injry_cnt;
                _crash.unkn_injry_cnt = crash.unkn_injry_cnt;
                _crash.tot_injry_cnt = crash.tot_injry_cnt;
                _crash.death_cnt = crash.death_cnt;
                _crash.pedestrian_fl = crash.pedestrian_fl;
                _crash.motor_vehicle_fl = crash.motor_vehicle_fl;
                _crash.motorcycle_fl = crash.motorcycle_fl;
                _crash.bicycle_fl = crash.bicycle_fl;
                _crash.other_fl = crash.other_fl;
                _crash.point = crash.point;
                _crash.apd_confirmed_death_count = crash.apd_confirmed_death_count;
                _crash.motor_vehicle_death_count = crash.motor_vehicle_death_count;
                _crash.motor_vehicle_serious_injury_count = crash.motor_vehicle_serious_injury_count;
                _crash.bicycle_serious_injury_count = crash.bicycle_serious_injury_count;
                _crash.pedestrian_death_count = crash.pedestrian_death_count;
                _crash.pedestrian_serious_injury_count = crash.pedestrian_serious_injury_count;
                _crash.motorcycle_death_count = crash.motorcycle_death_count;
                _crash.motorcycle_serious_injury_count = crash.motorcycle_serious_injury_count;
                _crash.other_death_count = crash.other_death_count;
                _crash.other_serious_injury_count = crash.other_serious_injury_count;

                _context.SaveChanges();
            }
            return _crash;
        }

    }
}
