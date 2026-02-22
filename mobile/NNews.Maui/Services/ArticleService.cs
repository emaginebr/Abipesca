using System.Net.Http.Json;
using NNews.DTO;

namespace NNews.Maui.Services
{
    public class ArticleService : IArticleService
    {
        private readonly HttpClient _httpClient;

        public ArticleService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<PagedResult<ArticleInfo>> ListByRolesAsync(int page = 1, int pageSize = 10)
        {
            var response = await _httpClient.GetAsync($"Article/ListByRoles?page={page}&pageSize={pageSize}");
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadFromJsonAsync<PagedResult<ArticleInfo>>() ?? new PagedResult<ArticleInfo>();
        }

        public async Task<PagedResult<ArticleInfo>> ListByCategoryAsync(long categoryId, int page = 1, int pageSize = 10)
        {
            var response = await _httpClient.GetAsync($"Article/ListByCategory?categoryId={categoryId}&page={page}&pageSize={pageSize}");
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadFromJsonAsync<PagedResult<ArticleInfo>>() ?? new PagedResult<ArticleInfo>();
        }

        public async Task<PagedResult<ArticleInfo>> ListByTagAsync(string tagSlug, int page = 1, int pageSize = 10)
        {
            var response = await _httpClient.GetAsync($"Article/ListByTag?tagSlug={Uri.EscapeDataString(tagSlug)}&page={page}&pageSize={pageSize}");
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadFromJsonAsync<PagedResult<ArticleInfo>>() ?? new PagedResult<ArticleInfo>();
        }

        public async Task<PagedResult<ArticleInfo>> SearchAsync(string keyword, int page = 1, int pageSize = 10)
        {
            var response = await _httpClient.GetAsync($"Article/Search?keyword={Uri.EscapeDataString(keyword)}&page={page}&pageSize={pageSize}");
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadFromJsonAsync<PagedResult<ArticleInfo>>() ?? new PagedResult<ArticleInfo>();
        }

        public async Task<ArticleInfo> GetByIdAsync(int id)
        {
            var response = await _httpClient.GetAsync($"Article/{id}");
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadFromJsonAsync<ArticleInfo>()
                ?? throw new InvalidOperationException("Failed to deserialize article response");
        }

        public string GetImageUrl(string? imageName)
        {
            if (string.IsNullOrWhiteSpace(imageName))
                return "dotnet_bot.png";

            if (imageName.StartsWith("http://", StringComparison.OrdinalIgnoreCase) ||
                imageName.StartsWith("https://", StringComparison.OrdinalIgnoreCase))
            {
                return imageName;
            }

            var baseUrl = _httpClient.BaseAddress?.ToString().TrimEnd('/');
            return $"{baseUrl}/images/{imageName}";
        }
    }
}
