using NNews.ACL;
using NNews.Dtos;
using NNews.Maui.Services;
using System.Collections.ObjectModel;
using System.Windows.Input;

namespace NNews.Maui.ViewModels
{
    public class CategoryListViewModel : BaseViewModel
    {
        private readonly CategoryClient _categoryClient;
        private readonly INavigationService _navigationService;

        public ObservableCollection<CategoryInfo> Categories { get; } = new();

        public ICommand LoadCategoriesCommand { get; }
        public ICommand RefreshCommand { get; }
        public ICommand CategorySelectedCommand { get; }

        public CategoryListViewModel(
            CategoryClient categoryClient,
            INavigationService navigationService)
        {
            _categoryClient = categoryClient;
            _navigationService = navigationService;

            LoadCategoriesCommand = new Command(async () => await LoadCategoriesAsync());
            RefreshCommand = new Command(async () => await RefreshCategoriesAsync());
            CategorySelectedCommand = new Command<CategoryInfo>(async (category) => await OnCategorySelected(category));
        }

        public async Task InitializeAsync()
        {
            await LoadCategoriesAsync();
        }

        private async Task LoadCategoriesAsync()
        {
            await ExecuteAsync(async () =>
            {
                var categories = await _categoryClient.GetAllAsync();

                Categories.Clear();
                foreach (var category in categories)
                {
                    Categories.Add(category);
                }
            });
        }

        private async Task RefreshCategoriesAsync()
        {
            IsRefreshing = true;
            try
            {
                var categories = await _categoryClient.GetAllAsync();

                Categories.Clear();
                foreach (var category in categories)
                {
                    Categories.Add(category);
                }
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine($"Error refreshing: {ex.Message}");
                await ShowErrorAsync("Erro ao atualizar categorias");
            }
            finally
            {
                IsRefreshing = false;
            }
        }

        private async Task OnCategorySelected(CategoryInfo category)
        {
            if (category == null)
                return;

            var parameters = new Dictionary<string, object>
            {
                { "CategoryId", category.CategoryId },
                { "CategoryTitle", category.Title }
            };

            await _navigationService.NavigateToAsync("articlelist", parameters);
        }

        public Color GetCategoryColor(int index)
        {
            var colors = new[]
            {
                Color.FromArgb("#0066CC"),
                Color.FromArgb("#28A745"),
                Color.FromArgb("#DC3545"),
                Color.FromArgb("#FFC107"),
                Color.FromArgb("#17A2B8"),
                Color.FromArgb("#6610F2"),
                Color.FromArgb("#E83E8C"),
                Color.FromArgb("#20C997")
            };

            return colors[index % colors.Length];
        }
    }
}
