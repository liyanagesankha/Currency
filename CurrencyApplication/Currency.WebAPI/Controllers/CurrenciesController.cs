using Currency.WebAPI.Models;
using Currency.WebAPI.Utilities;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;

namespace Currency.WebAPI.Controllers
{
    public class CurrenciesController : ApiController
    {
        /// <summary>
        /// Task base async call to get data from FOREX service 
        /// </summary>
        /// <param name="pageNumber"></param>
        /// <returns></returns>
        [ResponseType(typeof(web_dis_rates))]
        public async Task<IHttpActionResult> Get(int pageNumber, int itemPerPage)
        {
            //Call to helper
            var ratesDataSet = await Helper.GetForexRates(pageNumber, itemPerPage);

            //Return the response
            if (ratesDataSet == null)
            {
                return NotFound();
            }
            return Ok(ratesDataSet);
        }
    }
}
