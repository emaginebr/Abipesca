import { LoginForm } from 'nauth-react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { useAuth } from 'nauth-react';
import { toast } from 'sonner';
import { ROUTES } from '../lib/constants';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../components/ui/Card';

export function LoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  const handleSuccess = () => {
    toast.success('Login successful! Welcome back.');

    const redirectTo = sessionStorage.getItem('redirectAfterLogin');
    if (redirectTo) {
      sessionStorage.removeItem('redirectAfterLogin');
      navigate(redirectTo);
    } else {
      navigate(ROUTES.DASHBOARD);
    }
  };

  const handleError = (error: Error) => {
    toast.error(error.message || 'Login failed. Please try again.');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-md">
        <Card className="p-8">
          <CardHeader className="mb-8">
            <div className="flex justify-center mb-4">
              <img
                src="/admin/abipesca-logo.png"
                alt="Abipesca"
                className="h-16 w-auto"
              />
            </div>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>

          <CardContent>
            <LoginForm
              onSuccess={handleSuccess}
              onError={handleError}
              showRememberMe={true}
              className="space-y-4"
            />
          </CardContent>

          <CardFooter className="flex-col space-y-3">
            <Link
              to={ROUTES.FORGOT_PASSWORD}
              className="text-sm text-brand-blue hover:underline font-medium"
            >
              Forgot your password?
            </Link>

            <div className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link
                to={ROUTES.REGISTER}
                className="text-brand-blue hover:underline font-medium"
              >
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
