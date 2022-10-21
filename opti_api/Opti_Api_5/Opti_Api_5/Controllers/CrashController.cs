using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Opti_Api_5.Data.Services;
using Opti_Api_5.Data.DTOs;

namespace Opti_Api_5.Controllers
{
    [Route("[controller]")]
    [ApiController]
    
    public class CrashController : Controller
    {
        public CrashServices _crashServices;

        public CrashController(CrashServices crashServices)
        {
            _crashServices = crashServices;
        }

        [HttpGet("get-all-crash_data")]
        public IActionResult GetAllCrashes()
        {
            var allCrashes = _crashServices.GetAllCrashes();
            return Ok(allCrashes);
        }

        [HttpPost("add-crash")]
        public IActionResult AddCrash([FromBody] CrashDTO crash)
        {
            _crashServices.AddCrash(crash);
            return Ok();
        }
    }
}
