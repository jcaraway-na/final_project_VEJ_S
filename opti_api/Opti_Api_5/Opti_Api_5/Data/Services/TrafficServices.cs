using Opti_Api_5.Data.DTOs;
using Opti_Api_5.Data.Models;
using System.Collections.Generic;
using System.Linq;

namespace Opti_Api_5.Data.Services
{    
    public class TrafficServices
    {
        private AppDbContex _context;

        public TrafficServices(AppDbContex contex)
        {
            _context = contex;
        }

        public void AddIncident(RealTimeTrafficDTO traffic)
        {
            var _traffic = new RealTimeTrafficModel()
            {
                traffic_report_id = traffic.traffic_report_id,
                published_date = traffic.published_date,
                issue_reported = traffic.issue_reported,
                latitude = traffic.latitude,
                longitude = traffic.longitude,
                address = traffic.address,
                traffic_report_status = traffic.traffic_report_status,
                traffic_report_status_date_time = traffic.traffic_report_status_date_time
            };
            _context.Traffic.Add(_traffic);
            _context.SaveChanges();
        }

        public List<RealTimeTrafficModel> GetAllIncidents() => _context.Traffic.ToList();

        public RealTimeTrafficModel GetIncidentById(string incidentId) => _context.Traffic.FirstOrDefault(n => n.traffic_report_id == incidentId);

        public RealTimeTrafficModel UpdateIncidentById(string incidentId, RealTimeTrafficDTO incident)
        {
            var _incident = _context.Traffic.FirstOrDefault(n => n.traffic_report_id == incidentId);
            if (_incident != null)
            {
                _incident.traffic_report_id = incident.traffic_report_id;
                _incident.published_date = incident.published_date;
                _incident.issue_reported = incident.issue_reported;
                _incident.latitude = incident.latitude;
                _incident.longitude = incident.longitude;
                _incident.address = incident.address;
                _incident.traffic_report_status = incident.traffic_report_status;
                _incident.traffic_report_status_date_time = incident.traffic_report_status_date_time;
                
                _context.SaveChanges();
            }
            return _incident;
        }

    }
}
