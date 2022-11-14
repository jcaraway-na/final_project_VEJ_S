using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Opti_Api_5.Data.Services;
using Opti_Api_5.Data.DTOs;

namespace Opti_Api_5.Controllers
{
    [Route("[controller]")]
    [ApiController]

    public class PredictSrsController : Controller
    {
        public PredictSrsServices _predictSrsServices;

        public PredictSrsController(PredictSrsServices predictSrsServices)
        {
            _predictSrsServices = predictSrsServices;
        }

        [HttpGet("get-all-predictsrs-data")]
        public IActionResult GetAllTsapy()
        {
            var allpredictSrs = _predictSrsServices.GetAllPredictions();
            return Ok(allpredictSrs);
        }

        [HttpGet("get-predictsrs-by-id/{id}")]
        public IActionResult GetPredictionById(int id)
        {
            var predictSrs = _predictSrsServices.GetPredictionById(id);
            return Ok(predictSrs);
        }

        [HttpPost("add-predictsrs")]
        public IActionResult AddPopulations([FromBody] PredictSrsDTO predictSrs)
        {
            _predictSrsServices.AddPrediction(predictSrs);
            return Ok();
        }

        [HttpPut("update-predictsrs-by-id/{id}")]
        public IActionResult UpdatePredictionById(int id, [FromBody] PredictSrsDTO predictSrs)
        {
            var updatePrediction = _predictSrsServices.UpdatePredictionById(id, predictSrs);
            return Ok(updatePrediction);
        }
    }
}
