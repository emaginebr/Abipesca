import { RegisterForm } from 'nauth-react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { useAuth } from 'nauth-react';
import { useTranslation } from 'react-i18next';
import { ADMIN_NAMESPACE } from '../../i18n';
import { ROUTES } from '../../lib/constants';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../../components/ui/Card';

export function RegisterPage() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();
  const { t } = useTranslation(ADMIN_NAMESPACE);

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  const handleSuccess = () => {
    navigate(ROUTES.DASHBOARD);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-md">
        <Card className="p-8">
          <CardHeader>
            <CardTitle className="text-3xl font-bold mb-2 dark:text-white">
              {t('register.title')}
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              {t('register.description')}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <RegisterForm
              onSuccess={handleSuccess}
              showTermsCheckbox={true}
              className="space-y-4"
            />
          </CardContent>

          <CardFooter className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400 justify-center">
            {t('register.alreadyHaveAccount')}{' '}
            <Link
              to={ROUTES.LOGIN}
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium ml-1"
            >
              {t('register.signIn')}
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
