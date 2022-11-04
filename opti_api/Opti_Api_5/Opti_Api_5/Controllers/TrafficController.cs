using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Opti_Api_5.Data.Services;
using Opti_Api_5.Data.DTOs;

namespace Opti_Api_5.Controllers
{
    [Route("[controller]")]
    [ApiController]
    
    public class TrafficController : Controller
    {
        public TrafficServices _trafficServices;

        public TrafficController(TrafficServices trafficServices)
        {
            _trafficServices = trafficServices;
        }

        [HttpGet("get-all-traffic-data")]
        public IActionResult GetAllCrashes()
        {
            var allincidents = _trafficServices.GetAllIncidents();
            return Ok(allincidents);
        }

        [HttpGet("get-incident-by-id/{id}")]
        public IActionResult GetIncidentById(string id)
        {
            var incident = _trafficServices.GetIncidentById(id);
            return Ok(incident);
        }

        [HttpPost("add-incident")]
        public IActionResult AddIncident([FromBody] RealTimeTrafficDTO incident)
        {
            _trafficServices.AddIncident(incident);
            return Ok();
        }

        [HttpPut("update-incident-by-id/{id}")]
        public IActionResult UpdateIncidentById(string id, [FromBody] RealTimeTrafficDTO incident)
        {
            var updateIncident = _trafficServices.UpdateIncidentById(id, incident);
            return Ok(updateIncident);
        }
    }
}
