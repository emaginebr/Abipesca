import { useAuth } from 'nauth-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ADMIN_NAMESPACE } from '../../i18n';
import { useLanguage } from '../../contexts/LanguageContext';
import { ROUTES } from '../../lib/constants';
import {
  User,
  Mail,
  Calendar,
  Shield,
  KeyRound,
  Trash2,
  AlertTriangle,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function ProfilePage() {
  const { user } = useAuth();
  const { t } = useTranslation(ADMIN_NAMESPACE);
  const { language } = useLanguage();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const dateLocale = language === 'pt' ? 'pt-BR' : 'en-US';

  const handleDeleteAccount = async () => {
    console.log('Delete account functionality pending API implementation');
    toast.warning(t('profile.deletionNotImplemented'));
    setShowDeleteConfirm(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Profile Header */}
      <div className="bg-white rounded-xl p-8 border border-gray-200">
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 rounded-full bg-brand-navy flex items-center justify-center text-white text-4xl font-bold">
            {user?.name?.charAt(0).toUpperCase() ||
              user?.email?.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2 text-brand-navy">
              {user?.name || t('profile.title')}
            </h1>
            <p className="text-gray-600 mb-4">
              {user?.email}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to={ROUTES.CHANGE_PASSWORD}
                className="inline-flex items-center gap-2 px-4 py-2 bg-brand-blue text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <KeyRound className="w-4 h-4" />
                {t('profile.changePassword')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Account Information */}
      <div className="bg-white rounded-xl p-8 border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-brand-navy">
          {t('profile.accountInformation')}
        </h2>
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-brand-blue/10 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-brand-blue" />
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-600">
                {t('profile.fullName')}
              </label>
              <p className="text-lg font-semibold text-brand-navy">
                {user?.name || t('profile.notSet')}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-600">
                {t('profile.emailAddress')}
              </label>
              <p className="text-lg font-semibold text-brand-navy">
                {user?.email}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-600">
                {t('profile.accountStatus')}
              </label>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                  {t('profile.active')}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-brand-orange/10 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-brand-orange" />
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-600">
                {t('profile.memberSince')}
              </label>
              <p className="text-lg font-semibold text-brand-navy">
                {user?.createAt
                  ? new Date(user.createAt).toLocaleDateString(dateLocale, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-xl p-8 border-2 border-red-200">
        <h2 className="text-2xl font-bold mb-2 text-red-600">
          {t('profile.dangerZone')}
        </h2>
        <p className="text-gray-600 mb-6">
          {t('profile.dangerZoneDescription')}
        </p>

        {!showDeleteConfirm ? (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            {t('profile.deleteAccount')}
          </button>
        ) : (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0" />
              <div>
                <p className="font-semibold text-red-900 mb-2">
                  {t('profile.areYouAbsolutelySure')}
                </p>
                <p className="text-sm text-red-800">
                  {t('profile.deleteWarning')}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                {t('profile.yesDeleteAccount')}
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors"
              >
                {t('common.cancel')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
