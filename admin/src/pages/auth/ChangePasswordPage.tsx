import { ChangePasswordForm } from 'nauth-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'nauth-react';
import { useTranslation } from 'react-i18next';
import { ADMIN_NAMESPACE } from '../../i18n';
import { ROUTES } from '../../lib/constants';
import { KeyRound, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export function ChangePasswordPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { t } = useTranslation(ADMIN_NAMESPACE);
  const [changeSuccess, setChangeSuccess] = useState(false);

  const handleSuccess = async () => {
    setChangeSuccess(true);
    setTimeout(async () => {
      await logout();
      navigate(ROUTES.LOGIN);
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        {!changeSuccess ? (
          <>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <KeyRound className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold dark:text-white">
                  {t('changePassword.title')}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {t('changePassword.description')}
                </p>
              </div>
            </div>

            <ChangePasswordForm
              onSuccess={handleSuccess}
              className="space-y-4 p-4"
            />

            <h2 className="text-lg font-semibold mb-4 dark:text-white">
              {t('changePassword.securityTipsTitle')}
            </h2>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400">&#10003;</span>
                {t('changePassword.tip1')}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400">&#10003;</span>
                {t('changePassword.tip2')}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400">&#10003;</span>
                {t('changePassword.tip3')}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400">&#10003;</span>
                {t('changePassword.tip4')}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400">&#10003;</span>
                {t('changePassword.tip5')}
              </li>
            </ul>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-2xl font-bold mb-2 dark:text-white">
              {t('changePassword.successTitle')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {t('changePassword.successDescription')}
            </p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        )}
      </div>
    </div>
  );
}
