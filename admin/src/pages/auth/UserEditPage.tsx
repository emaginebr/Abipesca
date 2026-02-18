import { useNavigate, useSearchParams } from 'react-router-dom';
import { UserEditForm } from 'nauth-react';
import type { UserInfo } from 'nauth-react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { ADMIN_NAMESPACE } from '../../i18n';
import { ROUTES } from '../../lib/constants';

export default function UserEditPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation(ADMIN_NAMESPACE);
  const userId = searchParams.get('userId');

  const isEditMode = !!userId;

  const handleSuccess = (user: UserInfo) => {
    const message = isEditMode
      ? t('userEdit.updatedSuccess', { name: user.name })
      : t('userEdit.createdSuccess', { name: user.name });

    toast.success(message);
    navigate(ROUTES.SEARCH_USERS);
  };

  const handleError = (error: Error) => {
    console.error('Error saving user:', error);
    toast.error(t('userEdit.errorSaving', { message: error.message }));
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <UserEditForm
          userId={userId ? parseInt(userId) : undefined}
          onSuccess={handleSuccess}
          onError={handleError}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
}
