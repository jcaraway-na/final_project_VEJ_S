using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Opti_Api_5.Data.Services;
using Opti_Api_5.Data.DTOs;

namespace Opti_Api_5.Controllers
{
    [Route("[controller]")]
    [ApiController]
    
    public class TotalSeriousAccidentsPerYearController : Controller
    {
        public TotalSeriousAccidentsPerYearServices _tsapyServices;

        public TotalSeriousAccidentsPerYearController(TotalSeriousAccidentsPerYearServices tsapyServices)
        {
            _tsapyServices = tsapyServices;
        }

        [HttpGet("get-all-totalseriousaccidentsperyear-data")]
        public IActionResult GetAllTsapy()
        {
            var allTsapy = _tsapyServices.GetAllTsapy();
            return Ok(allTsapy);
        }

        //[HttpGet("get-population-by-id/{id}")]
        //public IActionResult GetPopulationById(int id)
        //{
        //    var population = _populationServices.GetPopulationById(id);
        //    return Ok(population);
        //}

        [HttpPost("add-totalseriousaccidentsperyear")]
        public IActionResult AddPopulations([FromBody] TotalSeriousAccidentsPerYearDTO tsapy)
        {
            _tsapyServices.AddTSAPY(tsapy);
            return Ok();
        }

        [HttpPut("update-totalseriousaccidentsperyear-by-id/{index_id}")]
        public IActionResult UpdateTsapyById(int index_id, [FromBody] TotalSeriousAccidentsPerYearDTO tsapy)
        {
            var updateTsapy = _tsapyServices.UpdateTsapyById(index_id, tsapy);
            return Ok(updateTsapy);
        }
    }
}
