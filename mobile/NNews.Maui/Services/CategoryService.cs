using System.Net.Http.Json;
using NNews.DTO;

namespace NNews.Maui.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly HttpClient _httpClient;

        public CategoryService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<IList<CategoryInfo>> ListByParentAsync(long? parentId = null)
        {
            var query = parentId.HasValue ? $"?parentId={parentId.Value}" : string.Empty;
            var response = await _httpClient.GetAsync($"Category/listByParent{query}");
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadFromJsonAsync<IList<CategoryInfo>>() ?? new List<CategoryInfo>();
        }
    }
}
