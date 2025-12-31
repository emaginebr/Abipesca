using Microsoft.Extensions.Options;
using NNews.ACL;
using NNews.Dtos;
using NNews.Dtos.Settings;
using NNews.Maui.Services;
using System.Windows.Input;

namespace NNews.Maui.ViewModels
{
    [QueryProperty(nameof(ArticleId), "ArticleId")]
    public class ArticleDetailViewModel : BaseViewModel
    {
        private readonly ArticleClient _articleClient;
        private readonly INavigationService _navigationService;
        private readonly string _apiUrl;
        
        private long _articleId;
        public long ArticleId
        {
            get => _articleId;
            set
            {
                SetProperty(ref _articleId, value);
                LoadArticleCommand.Execute(null);
            }
        }

        private ArticleInfo? _article;
        public ArticleInfo? Article
        {
            get => _article;
            set => SetProperty(ref _article, value);
        }

        private string _formattedContent = string.Empty;
        public string FormattedContent
        {
            get => _formattedContent;
            set => SetProperty(ref _formattedContent, value);
        }

        public ICommand LoadArticleCommand { get; }
        public ICommand ShareCommand { get; }
        public ICommand TagSelectedCommand { get; }
        public ICommand CategorySelectedCommand { get; }
        public ICommand BackCommand { get; }

        public ArticleDetailViewModel(
            ArticleClient articleClient,
            INavigationService navigationService,
            IOptions<NNewsSetting> settings)
        {
            _articleClient = articleClient;
            _navigationService = navigationService;
            _apiUrl = settings.Value.ApiUrl;

            LoadArticleCommand = new Command(async () => await LoadArticleAsync());
            ShareCommand = new Command(async () => await ShareArticleAsync());
            TagSelectedCommand = new Command<TagInfo>(async (tag) => await OnTagSelected(tag));
            CategorySelectedCommand = new Command(async () => await OnCategorySelected());
            BackCommand = new Command(async () => await _navigationService.GoBackAsync());
        }

        private async Task LoadArticleAsync()
        {
            await ExecuteAsync(async () =>
            {
                Article = await _articleClient.GetByIdAsync((int)ArticleId);
                
                if (Article != null)
                {
                    FormattedContent = FormatContent(Article.Content);
                }
            });
        }

        private string FormatContent(string content)
        {
            // Remove HTML tags for simple text display
            var text = System.Text.RegularExpressions.Regex.Replace(content, "<.*?>", string.Empty);
            return System.Net.WebUtility.HtmlDecode(text);
        }

        private async Task ShareArticleAsync()
        {
            if (Article == null)
                return;

            await Share.Default.RequestAsync(new ShareTextRequest
            {
                Title = Article.Title,
                Text = $"{Article.Title}\n\n{FormattedContent.Substring(0, Math.Min(200, FormattedContent.Length))}..."
            });
        }

        private async Task OnTagSelected(TagInfo tag)
        {
            if (tag == null)
                return;

            // Navigate to articles filtered by tag
            // TODO: Implement tag filtering in ArticleListPage
            await ShowSuccessAsync($"Tag selecionada: {tag.Title}");
        }

        private async Task OnCategorySelected()
        {
            if (Article?.Category == null)
                return;

            var parameters = new Dictionary<string, object>
            {
                { "CategoryId", Article.Category.CategoryId },
                { "CategoryTitle", Article.Category.Title }
            };

            await _navigationService.NavigateToAsync("articlelist", parameters);
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

            return $"{_apiUrl?.TrimEnd('/')}/images/{imageName}";
        }
    }
}
