using Microsoft.AspNetCore.Mvc;

namespace Opti_Api_5.Controllers
{
    public class HeaderController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
