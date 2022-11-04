using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Opti_Api_5.Data.Services;
using Opti_Api_5.Data.DTOs;
using System;

namespace Opti_Api_5.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class StoredProceduresController : Controller
    {
        public StoredProcedureServices _spServices;

        public StoredProceduresController(StoredProcedureServices spServices)
        {
            _spServices = spServices;
        }


        [HttpGet("get-day-of-week")]
        public IActionResult GetDayOfWeek()
        {
            var call = _spServices.GetDayOfWeek();
            return Ok(call);
        }


        [HttpGet("get-traffic-issues/{start_date}/{end_date}")]
        public IActionResult GetTrafficIssues(string start_date, string end_date)
        {
            var call = _spServices.GetTrafficIssues(start_date, end_date);
            return Ok(call);
        }


        [HttpGet("get-historical-traffic-data/{start_date}/{end_date}")]
        public IActionResult GetHistoricalTrafficIssues(string start_date, string end_date)
        {
            var call = _spServices.GetHistoricalTrafficData(start_date, end_date) ;
            return Ok(call);
        }

        [HttpGet("get-crash-severity/{start_date}/{end_date}")]
        public IActionResult GetCrashSeverityData(string start_date, string end_date)
        {
            var call = _spServices.GetCrashSeverityData(start_date,end_date);
            return Ok(call);
        }
        [HttpGet("get-rolling-sum-by-issue/{start_date}/{end_date}")]
        public IActionResult GetRollingCumByIssue(string start_date, string end_date)
        {
            var call = _spServices.GetRollingCumByIssue(start_date, end_date);
            return Ok(call);
        }
    }
}
