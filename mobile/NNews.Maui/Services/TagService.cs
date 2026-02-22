using System.Net.Http.Json;
using NNews.DTO;

namespace NNews.Maui.Services
{
    public class TagService : ITagService
    {
        private readonly HttpClient _httpClient;

        public TagService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<IList<TagInfo>> ListByRolesAsync()
        {
            var response = await _httpClient.GetAsync("Tag/ListByRoles");
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadFromJsonAsync<IList<TagInfo>>() ?? new List<TagInfo>();
        }
    }
}
