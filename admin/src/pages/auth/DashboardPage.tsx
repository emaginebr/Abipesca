import { useAuth } from 'nauth-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../lib/constants';
import {
  User,
  KeyRound,
  Calendar,
  Mail,
  Shield,
  Activity,
} from 'lucide-react';

export function DashboardPage() {
  const { user } = useAuth();

  const quickLinks = [
    {
      icon: <User className="w-6 h-6" />,
      title: 'View Profile',
      description: 'Manage your account information',
      to: ROUTES.PROFILE,
      color: 'bg-brand-blue/10 text-brand-blue',
    },
    {
      icon: <KeyRound className="w-6 h-6" />,
      title: 'Change Password',
      description: 'Update your password',
      to: ROUTES.CHANGE_PASSWORD,
      color: 'bg-brand-orange/10 text-brand-orange',
    },
  ];

  const userStats = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: 'Email',
      value: user?.email || 'N/A',
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      label: 'Member Since',
      value: user?.createAt
        ? new Date(user.createAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        : 'N/A',
    },
    {
      icon: <Shield className="w-5 h-5" />,
      label: 'Account Status',
      value: 'Active',
    },
    {
      icon: <Activity className="w-5 h-5" />,
      label: 'User ID',
      value: user?.userId
        ? String(user.userId).substring(0, 8) + '...'
        : 'N/A',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Welcome Section */}
      <div className="bg-brand-navy rounded-2xl p-6 md:p-8 text-white shadow-lg">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          Welcome back, {user?.name || user?.email}!
        </h1>
        <p className="text-blue-200 text-sm md:text-base">
          Manage your account and explore all features
        </p>
      </div>

      {/* User Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {userStats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="text-gray-500">
                {stat.icon}
              </div>
              <span className="text-sm font-medium text-gray-600">
                {stat.label}
              </span>
            </div>
            <p className="text-base font-semibold text-brand-navy truncate">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div>
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-brand-navy">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickLinks.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg hover:border-brand-blue transition-all group"
            >
              <div
                className={`w-12 h-12 ${link.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                {link.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-brand-navy group-hover:text-brand-blue transition-colors">
                {link.title}
              </h3>
              <p className="text-sm text-gray-600">
                {link.description}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Account Info */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <h2 className="text-xl font-bold mb-6 text-brand-navy">
          Account Information
        </h2>
        <div className="space-y-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 border-b border-gray-200 gap-2">
            <span className="text-sm font-medium text-gray-600">
              Full Name
            </span>
            <span className="font-semibold text-brand-navy">
              {user?.name || 'Not set'}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 border-b border-gray-200 gap-2">
            <span className="text-sm font-medium text-gray-600">
              Email Address
            </span>
            <span className="font-semibold text-brand-navy break-all">
              {user?.email}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 border-b border-gray-200 gap-2">
            <span className="text-sm font-medium text-gray-600">
              Account Status
            </span>
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700 inline-flex items-center justify-center">
              Active
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 gap-2">
            <span className="text-sm font-medium text-gray-600">
              User ID
            </span>
            <span className="font-mono text-sm font-semibold text-brand-navy break-all">
              {user?.userId || 'N/A'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
