using Currency.WebAPI.Models;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace Currency.WebAPI.Utilities
{
    public class Helper
    {
        
        /// <summary>
        /// Field to hold currency rate URL
        /// </summary>
        private static string currencyServiceUrl = string.Empty;

        /// <summary>
        /// Property to Get Currency Service URL
        /// </summary>
        public static string CurrencyServiceUrl
        {
            get
            {
                if (string.IsNullOrEmpty(currencyServiceUrl))
                {
                    var appSettings = ConfigurationManager.AppSettings;
                    currencyServiceUrl = appSettings["currencyRatesUrl"] ?? string.Empty;
                }
                return currencyServiceUrl;
            }
        }

        /// <summary>
        /// Get selected FOREX rates
        /// </summary>
        /// <param name="pageNumber">Page index</param>
        /// <param name="itemPerPage">Item per page - default 3</param>
        /// <returns></returns>
        public static async Task<web_dis_rates> GetForexRates(int pageNumber, int itemPerPage = 3)
        {
            //Create HTTP client
            HttpClient client = new HttpClient();
           
            //Asynchronously invoke the FOREX service end
            var stream = await client.GetStreamAsync(CurrencyServiceUrl);
            StreamReader streamReader = new StreamReader(stream);
            
            //Get web_dis_rates by stream reader 
            var result = new XmlSerializer(typeof(web_dis_rates)).Deserialize(streamReader);
            web_dis_rates rates = result as web_dis_rates;

            //Pagination logic handle hear
            if (pageNumber >= 0)
            {
                int firstIndex = pageNumber * itemPerPage;
                rates.row = rates.row.Skip(firstIndex).Take(itemPerPage).ToArray();
            }

            //return selected currency rates
            return rates;
        }

        
    }
}