import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useArticles, AIArticleGenerator } from 'nnews-react';
import type { Article } from 'nnews-react';
import { useTranslation } from 'react-i18next';
import { ADMIN_NAMESPACE } from '../../i18n';
import { useLanguage } from '../../contexts/LanguageContext';
import { ROUTES } from '../../lib/constants';
import { cn } from '../../lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { ConfirmModal } from '../../components/ui/ConfirmModal';
import { toast } from 'sonner';
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  FileText,
  Loader2,
  AlertCircle,
  Inbox,
  Trash2,
  Sparkles,
} from 'lucide-react';

const PAGE_SIZE = 10;

const statusColors: Record<number, string> = {
  0: 'bg-gray-100 text-gray-800',
  1: 'bg-green-100 text-green-800',
  2: 'bg-yellow-100 text-yellow-800',
  3: 'bg-blue-100 text-blue-800',
  4: 'bg-purple-100 text-purple-800',
};

export function ArticleListPage() {
  const navigate = useNavigate();
  const { t } = useTranslation(ADMIN_NAMESPACE);
  const { language } = useLanguage();
  const { articles, loading, error, fetchArticles, deleteArticle } = useArticles();
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<{ id: number; title: string } | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiMode, setAIMode] = useState<'create' | 'update'>('create');
  const [selectedArticleId, setSelectedArticleId] = useState<number | undefined>();

  const statusLabels: Record<number, string> = useMemo(() => ({
    0: t('articles.statusDraft'),
    1: t('articles.statusPublished'),
    2: t('articles.statusArchived'),
    3: t('articles.statusScheduled'),
    4: t('articles.statusReview'),
  }), [t]);

  const dateLocale = language === 'pt' ? 'pt-BR' : 'en-US';

  const loadArticles = useCallback(
    async (page: number) => {
      try {
        await fetchArticles({ page, pageSize: PAGE_SIZE });
      } catch {
        toast.error(t('articles.failedToLoad'));
      }
    },
    [fetchArticles, t]
  );

  useEffect(() => {
    loadArticles(currentPage);
  }, [currentPage, loadArticles]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleArticleClick = (article: Article) => {
    navigate(ROUTES.ARTICLES_EDIT(String(article.articleId)));
  };

  const handleDeleteClick = (e: React.MouseEvent, article: Article) => {
    e.stopPropagation();
    setDeleteTarget({ id: article.articleId, title: article.title });
  };

  const handleAIClick = (e: React.MouseEvent, article: Article) => {
    e.stopPropagation();
    setAIMode('update');
    setSelectedArticleId(article.articleId);
    setShowAIModal(true);
  };

  const handleNewArticleWithAI = () => {
    setAIMode('create');
    setSelectedArticleId(undefined);
    setShowAIModal(true);
  };

  const handleAISuccess = (article: Article) => {
    toast.success(t(aiMode === 'create' ? 'articles.aiCreateSuccess' : 'articles.aiUpdateSuccess'));
    setShowAIModal(false);
    loadArticles(currentPage);
    navigate(ROUTES.ARTICLES_EDIT(String(article.articleId)));
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await deleteArticle(deleteTarget.id);
      toast.success(t('articles.deleteSuccess'));
    } catch {
      toast.error(t('articles.failedToDelete'));
    }
    setDeleteTarget(null);
  };

  const formatDate = (date?: string | Date) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString(dateLocale, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <Card>
        <CardHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-brand-blue" />
              <CardTitle>{t('articles.title')}</CardTitle>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleNewArticleWithAI}
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-medium text-white hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all shadow-md hover:shadow-lg"
              >
                <Sparkles className="h-4 w-4" />
                {t('articles.createWithAI')}
              </button>
              <button
                onClick={() => navigate(ROUTES.ARTICLES_NEW)}
                className="inline-flex items-center gap-2 rounded-lg bg-brand-blue px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 transition-colors"
              >
                <Plus className="h-4 w-4" />
                {t('articles.newArticle')}
              </button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-brand-blue" />
              <span className="ml-3 text-gray-600">{t('articles.loading')}</span>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mb-3" />
              <p className="text-red-600 font-medium">
                {t('articles.errorLoading')}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {error.message}
              </p>
              <button
                onClick={() => loadArticles(currentPage)}
                className="mt-4 rounded-lg bg-brand-blue px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 transition-colors"
              >
                {t('common.tryAgain')}
              </button>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && articles && articles.items.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Inbox className="h-12 w-12 text-gray-400 mb-3" />
              <p className="text-gray-600 font-medium">
                {t('articles.noArticles')}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {t('articles.noArticlesDescription')}
              </p>
              <button
                onClick={() => navigate(ROUTES.ARTICLES_NEW)}
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-brand-blue px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 transition-colors"
              >
                <Plus className="h-4 w-4" />
                {t('articles.newArticle')}
              </button>
            </div>
          )}

          {/* Articles List */}
          {!loading && !error && articles && articles.items.length > 0 && (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        {t('articles.tableTitle')}
                      </th>
                      <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        {t('articles.tableCategory')}
                      </th>
                      <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        {t('articles.tableStatus')}
                      </th>
                      <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        {t('articles.tableDate')}
                      </th>
                      <th className="pb-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                        {t('articles.tableActions')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {articles.items.map((article) => (
                      <tr
                        key={article.articleId}
                        onClick={() => handleArticleClick(article)}
                        className="cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-4 pr-4">
                          <div className="flex items-center gap-3">
                            {article.imageUrl ? (
                              <img
                                src={article.imageUrl}
                                alt={article.title}
                                className="h-10 w-10 rounded-md object-cover flex-shrink-0"
                              />
                            ) : (
                              <div className="h-10 w-10 rounded-md bg-gray-100 flex items-center justify-center flex-shrink-0">
                                <FileText className="h-5 w-5 text-gray-400" />
                              </div>
                            )}
                            <span className="font-medium text-brand-navy truncate max-w-xs">
                              {article.title}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 pr-4 text-sm text-gray-600">
                          {article.category?.title || '-'}
                        </td>
                        <td className="py-4 pr-4">
                          <span
                            className={cn(
                              'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                              statusColors[article.status] || statusColors[0]
                            )}
                          >
                            {statusLabels[article.status] || t('articles.statusUnknown')}
                          </span>
                        </td>
                        <td className="py-4 pr-4 text-sm text-gray-600">
                          {formatDate(article.dateAt || article.createdAt)}
                        </td>
                        <td className="py-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={(e) => handleAIClick(e, article)}
                              className="inline-flex items-center rounded-md p-1.5 text-gray-400 hover:text-purple-600 hover:bg-purple-50 transition-colors"
                              title={t('articles.aiUpdateTooltip')}
                            >
                              <Sparkles className="h-4 w-4" />
                            </button>
                            <button
                              onClick={(e) => handleDeleteClick(e, article)}
                              className="inline-flex items-center rounded-md p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                              title={t('articles.deleteTooltip')}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {articles.totalPages > 1 && (
                <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-600">
                    {t('articles.pageOf', { page: articles.page, totalPages: articles.totalPages, totalCount: articles.totalCount })}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={!articles.hasPrevious}
                      className={cn(
                        'inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                        articles.hasPrevious
                          ? 'text-brand-navy hover:bg-gray-100'
                          : 'text-gray-400 cursor-not-allowed'
                      )}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      {t('common.previous')}
                    </button>
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={!articles.hasNext}
                      className={cn(
                        'inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                        articles.hasNext
                          ? 'text-brand-navy hover:bg-gray-100'
                          : 'text-gray-400 cursor-not-allowed'
                      )}
                    >
                      {t('common.next')}
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        open={deleteTarget !== null}
        onOpenChange={(open) => { if (!open) setDeleteTarget(null); }}
        onConfirm={handleDeleteConfirm}
        title={t('articles.deleteTitle')}
        description={t('articles.deleteDescription', { title: deleteTarget?.title })}
        confirmLabel={t('common.delete')}
        cancelLabel={t('common.cancel')}
        variant="danger"
      />

      {/* AI Article Generator Modal */}
      <AIArticleGenerator
        mode={aiMode}
        articleId={selectedArticleId}
        isOpen={showAIModal}
        onSuccess={handleAISuccess}
        onClose={() => setShowAIModal(false)}
      />
    </div>
  );
}
