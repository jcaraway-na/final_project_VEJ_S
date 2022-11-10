using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Opti_Api_5.Data.Services;
using Opti_Api_5.Data.DTOs;

namespace Opti_Api_5.Controllers
{
    [Route("[controller]")]
    [ApiController]
    
    public class PopulationController : Controller
    {
        public PopulationServices _populationServices;

        public PopulationController(PopulationServices populationServices)
        {
            _populationServices = populationServices;
        }

        [HttpGet("get-all-population-data")]
        public IActionResult GetAllPopulations()
        {
            var allPopulations = _populationServices.GetAllPopulations();
            return Ok(allPopulations);
        }

        [HttpGet("get-population-by-id/{id}")]
        public IActionResult GetPopulationById(int id)
        {
            var population = _populationServices.GetPopulationById(id);
            return Ok(population);
        }

        [HttpPost("add-population")]
        public IActionResult AddPopulations([FromBody] PopulationDTO incident)
        {
            _populationServices.AddPopulation(incident);
            return Ok();
        }

        [HttpPut("update-population-by-id/{id}")]
        public IActionResult UpdatePopulationById(int id, [FromBody] PopulationDTO population)
        {
            var updatePopulation = _populationServices.UpdatePopulationById(id, population);
            return Ok(updatePopulation);
        }
    }
}
