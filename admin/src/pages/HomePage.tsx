import { Link } from 'react-router-dom';
import { useAuth } from 'nauth-react';
import { ROUTES, APP_NAME } from '../lib/constants';
import {
  Lock,
  Users,
  Newspaper,
  Share2,
  CheckCircle,
  ArrowRight,
  Shield,
} from 'lucide-react';

export function HomePage() {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: <Lock className="w-6 h-6" />,
      title: 'Authentication',
      description:
        'Complete authentication system with login, register, password recovery, role management, and user administration.',
      color: 'bg-brand-blue/10 text-brand-blue',
    },
    {
      icon: <Newspaper className="w-6 h-6" />,
      title: 'News Management',
      description:
        'Full-featured news CMS with articles, categories, tags, and AI-assisted content creation.',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: <Share2 className="w-6 h-6" />,
      title: 'Campaign Management',
      description:
        'Manage clients, social networks, schedule posts, and view content calendars across platforms.',
      color: 'bg-brand-orange/10 text-brand-orange',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'User & Role Management',
      description:
        'Search users, manage roles and permissions, edit user profiles, and control access across modules.',
      color: 'bg-brand-navy/10 text-brand-navy',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Protected Routes',
      description:
        'Secure route protection with automatic redirects and session management.',
      color: 'bg-red-100 text-red-600',
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'Unified Dashboard',
      description:
        'Single admin interface combining all modules with a consistent experience.',
      color: 'bg-teal-100 text-teal-600',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center py-20">
        <div className="flex justify-center mb-6">
          <img
            src="/admin/abipesca-logo.png"
            alt="Abipesca"
            className="h-24 w-auto"
          />
        </div>
        <h1 className="text-5xl font-bold mb-4 text-brand-navy">
          {APP_NAME}
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Unified administration platform for authentication, news management, and campaign operations.
        </p>
        <div className="flex gap-4 justify-center">
          {isAuthenticated ? (
            <Link
              to={ROUTES.DASHBOARD}
              className="inline-flex items-center gap-2 px-8 py-3 bg-brand-blue text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              Go to Dashboard
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <>
              <Link
                to={ROUTES.REGISTER}
                className="inline-flex items-center gap-2 px-8 py-3 bg-brand-blue text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to={ROUTES.LOGIN}
                className="px-8 py-3 bg-white text-brand-navy border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div
              className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}
            >
              {feature.icon}
            </div>
            <h3 className="text-lg font-semibold mb-2 text-brand-navy">
              {feature.title}
            </h3>
            <p className="text-gray-600">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="bg-brand-navy rounded-2xl p-12 text-white text-center mb-12">
        <h2 className="text-3xl font-bold mb-6">
          Everything You Need in One Place
        </h2>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="flex items-center gap-2 justify-center">
            <CheckCircle className="w-5 h-5 text-brand-blue" />
            <span>TypeScript Support</span>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <CheckCircle className="w-5 h-5 text-brand-blue" />
            <span>Responsive Design</span>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <CheckCircle className="w-5 h-5 text-brand-blue" />
            <span>Modern UI</span>
          </div>
        </div>
        {!isAuthenticated && (
          <Link
            to={ROUTES.REGISTER}
            className="inline-block px-8 py-3 bg-brand-blue text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            Create Your Account
          </Link>
        )}
      </div>
    </div>
  );
}
