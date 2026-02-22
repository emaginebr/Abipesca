using NNews.DTO;

namespace NNews.Maui.Services
{
    public interface ICategoryService
    {
        Task<IList<CategoryInfo>> ListByParentAsync(long? parentId = null);
    }
}
