using System.Web.Mvc;

namespace CurrencyApplication.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Currency Home Page";
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "All Currencies Details.";            
            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Title = "Contact Me";
            ViewBag.Message = "My Contact Details.";
            return View();
        }

        public ActionResult Contact1()
        {
            ViewBag.Title = "Contact Me";
            ViewBag.Message = "My Contact Details.";
            return View();
        }
    }
}