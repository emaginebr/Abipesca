import { useAuth } from 'nauth-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LogOut, User, KeyRound } from 'lucide-react';
import { ROUTES } from '../lib/constants';
import { ADMIN_NAMESPACE } from '../i18n';

export function UserMenu() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation(ADMIN_NAMESPACE);

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.LOGIN);
  };

  if (!user) return null;

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
        <div className="w-8 h-8 rounded-full bg-brand-navy flex items-center justify-center text-white font-semibold text-sm">
          {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
        </div>
        <span className="text-sm font-medium hidden md:block text-brand-navy">
          {user.name || user.email}
        </span>
      </button>

      <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="px-4 pt-5 pb-4 border-b border-gray-200">
          <p className="text-sm font-semibold text-brand-navy">{user.name}</p>
          <p className="text-xs text-gray-500 truncate">{user.email}</p>
        </div>

        <div className="py-2">
          <Link to={ROUTES.PROFILE} className="flex items-center gap-2 px-4 py-2 text-sm text-brand-navy/80 hover:bg-brand-blue/5 hover:text-brand-blue transition-colors">
            <User className="w-4 h-4" />
            {t('userMenu.profile')}
          </Link>
          <Link to={ROUTES.CHANGE_PASSWORD} className="flex items-center gap-2 px-4 py-2 text-sm text-brand-navy/80 hover:bg-brand-blue/5 hover:text-brand-blue transition-colors">
            <KeyRound className="w-4 h-4" />
            {t('userMenu.changePassword')}
          </Link>
        </div>

        <div className="border-t border-gray-200 p-2">
          <button onClick={handleLogout} className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded transition-colors">
            <LogOut className="w-4 h-4" />
            {t('userMenu.logout')}
          </button>
        </div>
      </div>
    </div>
  );
}
