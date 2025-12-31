using NNews.Maui.ViewModels;

namespace NNews.Maui.Views
{
    public partial class ArticleDetailPage : ContentPage
    {
        public ArticleDetailPage(ArticleDetailViewModel viewModel)
        {
            InitializeComponent();
            BindingContext = viewModel;
        }
    }
}
