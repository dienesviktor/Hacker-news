using System;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Threading.Tasks;

namespace HackerNewsClient.Controllers
{
    public class APIController : Controller
    {
        public string Top(int ID = 1)
        {
            string apiUrl = $"https://api.hnpwa.com/v0/news/{ID}.json";
            return RetrieveData(apiUrl).Result;
        }

        public string Newest(int ID = 1)
        {
            string apiUrl = $"https://api.hnpwa.com/v0/newest/{ID}.json";
            return RetrieveData(apiUrl).Result;
        }

        public string Jobs(int ID = 1)
        {
            string apiUrl = $"https://api.hnpwa.com/v0/jobs/{ID}.json";
            return RetrieveData(apiUrl).Result;
        }

        public async Task<string> RetrieveData(string apiUrl)
        {
            using (HttpClient client = new HttpClient())
            {
                client.BaseAddress = new Uri(apiUrl);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));

                HttpResponseMessage response = await client.GetAsync(apiUrl);

                if (response.IsSuccessStatusCode)
                {
                    var data = await response.Content.ReadAsStringAsync();
                    return data;
                }
            }
            return null;
        }
    }
}
