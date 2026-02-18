import { useParams, useNavigate } from 'react-router-dom';
import { PostViewer } from 'bazzuca-react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { ADMIN_NAMESPACE } from '../../i18n';
import { ROUTES } from '../../lib/constants';
import { ArrowLeft } from 'lucide-react';

export function PostViewPage() {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation(ADMIN_NAMESPACE);

  const handleEdit = () => {
    if (postId) {
      navigate(ROUTES.POSTS_EDIT(postId));
    }
  };

  const handleBack = () => {
    navigate(ROUTES.POSTS);
  };

  const handlePublish = () => {
    toast.success(t('postView.publishedSuccess'));
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        {t('postView.backToPosts')}
      </button>

      {/* Post Viewer */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <PostViewer
          postId={postId!}
          onEdit={handleEdit}
          onBack={handleBack}
          onPublish={handlePublish}
        />
      </div>
    </div>
  );
}
