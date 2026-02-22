using NNews.DTO;

namespace NNews.Maui.Services
{
    public interface ITagService
    {
        Task<IList<TagInfo>> ListByRolesAsync();
    }
}
