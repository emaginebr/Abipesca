import { useParams, useNavigate } from 'react-router-dom';
import { PostEditor } from 'bazzuca-react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { ADMIN_NAMESPACE } from '../../i18n';
import { ROUTES } from '../../lib/constants';
import { ArrowLeft } from 'lucide-react';

export function PostEditPage() {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation(ADMIN_NAMESPACE);

  const isEditing = Boolean(postId);

  const handleSave = () => {
    toast.success(
      isEditing ? t('postEdit.updatedSuccess') : t('postEdit.createdSuccess')
    );
    navigate(ROUTES.POSTS);
  };

  const handleCancel = () => {
    navigate(ROUTES.POSTS);
  };

  const handleBack = () => {
    navigate(ROUTES.POSTS);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        {t('postEdit.backToPosts')}
      </button>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {isEditing ? t('postEdit.editTitle') : t('postEdit.createTitle')}
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          {isEditing
            ? t('postEdit.editDescription')
            : t('postEdit.createDescription')}
        </p>
      </div>

      {/* Post Editor */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <PostEditor
          postId={postId}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
}
