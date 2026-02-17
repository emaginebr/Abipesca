import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from 'nauth-react';
import { APP_NAME, ROUTES } from '../lib/constants';
import { UserMenu } from './UserMenu';
import {
  LayoutDashboard,
  Newspaper,
  Tag,
  FolderOpen,
  ChevronDown,
  Users,
  FileText,
  Calendar,
  Search,
  ShieldCheck,
  Megaphone,
} from 'lucide-react';

export function Navbar() {
  const { isAuthenticated } = useAuth();
  const [newsOpen, setNewsOpen] = useState(false);
  const [campaignsOpen, setCampaignsOpen] = useState(false);
  const [usersOpen, setUsersOpen] = useState(false);
  const newsRef = useRef<HTMLDivElement>(null);
  const campaignsRef = useRef<HTMLDivElement>(null);
  const usersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (newsRef.current && !newsRef.current.contains(event.target as Node)) {
        setNewsOpen(false);
      }
      if (campaignsRef.current && !campaignsRef.current.contains(event.target as Node)) {
        setCampaignsOpen(false);
      }
      if (usersRef.current && !usersRef.current.contains(event.target as Node)) {
        setUsersOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const closeAll = () => {
    setNewsOpen(false);
    setCampaignsOpen(false);
    setUsersOpen(false);
  };

  const linkClass =
    'flex items-center gap-2 px-4 py-2 text-sm font-medium text-brand-navy/80 hover:text-brand-blue transition-colors';

  const dropdownItemClass =
    'flex items-center gap-2 px-4 py-2 text-sm text-brand-navy/80 hover:bg-brand-blue/5 hover:text-brand-blue transition-colors';

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <Link to={ROUTES.HOME} className="flex items-center gap-2.5">
              <img
                src="/admin/abipesca-logo.png"
                alt="Abipesca"
                className="h-9 w-auto"
              />
              <span className="text-lg font-bold text-brand-navy hidden sm:block">
                {APP_NAME}
              </span>
            </Link>

            {isAuthenticated && (
              <>
                <Link to={ROUTES.DASHBOARD} className={linkClass}>
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>

                {/* News Dropdown */}
                <div ref={newsRef} className="relative">
                  <button
                    onClick={() => { setNewsOpen(!newsOpen); setCampaignsOpen(false); setUsersOpen(false); }}
                    className={linkClass}
                  >
                    <Newspaper className="w-4 h-4" />
                    News
                    <ChevronDown className={`w-3 h-3 transition-transform ${newsOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {newsOpen && (
                    <div className="absolute left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      <Link
                        to={ROUTES.ARTICLES}
                        onClick={closeAll}
                        className={`${dropdownItemClass} rounded-t-lg`}
                      >
                        <FileText className="w-4 h-4" />
                        Articles
                      </Link>
                      <Link
                        to={ROUTES.CATEGORIES}
                        onClick={closeAll}
                        className={dropdownItemClass}
                      >
                        <FolderOpen className="w-4 h-4" />
                        Categories
                      </Link>
                      <Link
                        to={ROUTES.TAGS}
                        onClick={closeAll}
                        className={`${dropdownItemClass} rounded-b-lg`}
                      >
                        <Tag className="w-4 h-4" />
                        Tags
                      </Link>
                    </div>
                  )}
                </div>

                {/* Campaigns Dropdown (was Bazzuca) */}
                <div ref={campaignsRef} className="relative">
                  <button
                    onClick={() => { setCampaignsOpen(!campaignsOpen); setNewsOpen(false); setUsersOpen(false); }}
                    className={linkClass}
                  >
                    <Megaphone className="w-4 h-4" />
                    Campaigns
                    <ChevronDown className={`w-3 h-3 transition-transform ${campaignsOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {campaignsOpen && (
                    <div className="absolute left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      <Link
                        to={ROUTES.CLIENTS}
                        onClick={closeAll}
                        className={`${dropdownItemClass} rounded-t-lg`}
                      >
                        <Users className="w-4 h-4" />
                        Clients
                      </Link>
                      <Link
                        to={ROUTES.POSTS}
                        onClick={closeAll}
                        className={dropdownItemClass}
                      >
                        <FileText className="w-4 h-4" />
                        Posts
                      </Link>
                      <Link
                        to={ROUTES.CALENDAR}
                        onClick={closeAll}
                        className={`${dropdownItemClass} rounded-b-lg`}
                      >
                        <Calendar className="w-4 h-4" />
                        Calendar
                      </Link>
                    </div>
                  )}
                </div>

                {/* Users Dropdown (Users + Roles) */}
                <div ref={usersRef} className="relative">
                  <button
                    onClick={() => { setUsersOpen(!usersOpen); setNewsOpen(false); setCampaignsOpen(false); }}
                    className={linkClass}
                  >
                    <Users className="w-4 h-4" />
                    Users
                    <ChevronDown className={`w-3 h-3 transition-transform ${usersOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {usersOpen && (
                    <div className="absolute left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      <Link
                        to={ROUTES.SEARCH_USERS}
                        onClick={closeAll}
                        className={`${dropdownItemClass} rounded-t-lg`}
                      >
                        <Search className="w-4 h-4" />
                        Search Users
                      </Link>
                      <Link
                        to={ROUTES.ROLES}
                        onClick={closeAll}
                        className={`${dropdownItemClass} rounded-b-lg`}
                      >
                        <ShieldCheck className="w-4 h-4" />
                        Roles
                      </Link>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to={ROUTES.LOGIN}
                  className="px-4 py-2 text-sm font-medium text-brand-navy/80 hover:text-brand-blue transition-colors"
                >
                  Login
                </Link>
                <Link
                  to={ROUTES.REGISTER}
                  className="px-4 py-2 text-sm font-medium bg-brand-blue text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
