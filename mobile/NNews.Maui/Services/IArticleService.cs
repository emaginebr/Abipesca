using NNews.DTO;

namespace NNews.Maui.Services
{
    public interface IArticleService
    {
        Task<PagedResult<ArticleInfo>> ListByRolesAsync(int page = 1, int pageSize = 10);
        Task<PagedResult<ArticleInfo>> ListByCategoryAsync(long categoryId, int page = 1, int pageSize = 10);
        Task<PagedResult<ArticleInfo>> ListByTagAsync(string tagSlug, int page = 1, int pageSize = 10);
        Task<PagedResult<ArticleInfo>> SearchAsync(string keyword, int page = 1, int pageSize = 10);
        Task<ArticleInfo> GetByIdAsync(int id);
        string GetImageUrl(string? imageName);
    }
}
