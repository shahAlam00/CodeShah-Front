import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Menu,
  Search,
  Flame,
  User,
  Settings,
  LogOut,
  ChevronDown,
  Code2
} from 'lucide-react';
import { NotificationsDropdown } from './NotificationsDropdown';

import { GlobalSearchModal } from './GlobalSearchModal';
import { useAuth } from '../../context/AuthContext';
import { useProgress } from '../../context/ProgressContext';

export const DashboardNavbar = ({ onToggleSidebar, isSidebarCollapsed }) => {
  const { user, logout } = useAuth();
  const { streak } = useProgress();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <>
      <header className="sticky top-0 z-30 h-16 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between transition-all">
        {/* Left: Sidebar Toggle + Quick Breadcrumb / Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Quick search input button */}
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-600 bg-slate-100 hover:bg-slate-200/80 rounded-xl border border-slate-200/80 transition-colors w-44 sm:w-64"
          >
            <Search className="w-3.5 h-3.5 text-slate-600" />
            <span className="truncate">Search problems, roadmaps...</span>
            <kbd className="hidden sm:inline-block ml-auto text-[10px] font-mono px-1.5 py-0.5 bg-white border border-slate-300 rounded shadow-xs text-slate-600">
              Ctrl K
            </kbd>
          </button>
        </div>

        {/* Right: Streak, Daily Challenge, Notifications & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Daily Streak Indicator */}
          <Link
            to="/profile/shah"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100/80 text-amber-700 rounded-xl border border-amber-200/80 transition-all text-xs font-bold shadow-soft-sm group"
          >
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500 group-hover:scale-110 transition-transform" />
            <span>{streak} Days</span>
          </Link>

          {/* Daily Challenge Pill */}
          <Link
            to="/problems/two-sum"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-brand-50 hover:bg-brand-100/80 text-brand-700 rounded-xl border border-brand-200 text-xs font-semibold transition-all shadow-soft-sm"
          >
            <Code2 className="w-3.5 h-3.5 text-brand-600" />
            <span>Daily Problem</span>
          </Link>

          {/* Notifications */}
          <NotificationsDropdown />

          {/* User Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 p-1.5 hover:bg-slate-100 rounded-xl transition-colors"
            >
              {/* Avatar — image if set, gradient initials otherwise */}
              <div className="w-8 h-8 rounded-lg overflow-hidden ring-2 ring-brand-500/20 flex-shrink-0">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user?.name || 'Profile'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-tr from-brand-600 to-sky-400 flex items-center justify-center">
                    <span className="text-white text-sm font-black leading-none select-none">
                      {user?.name ? user.name.charAt(0).toUpperCase() : '?'}
                    </span>
                  </div>
                )}
              </div>
              <div className="hidden lg:flex flex-col text-left leading-tight">
                <span className="text-xs font-bold text-slate-800">{user?.name || "Guest"}</span>
                <span className="text-[11px] text-slate-400">{user?.email || ""}</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden lg:block" />
            </button>

            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 z-50 animate-fade-in divide-y divide-slate-100">
                <div className="px-4 py-2.5 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl overflow-hidden flex-shrink-0">
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user?.name || 'Profile'}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-tr from-brand-600 to-sky-400 flex items-center justify-center">
                        <span className="text-white text-sm font-black leading-none select-none">
                          {user?.name ? user.name.charAt(0).toUpperCase() : '?'}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-800 truncate">{user?.name || "Guest"}</p>
                    <p className="text-xs text-slate-500 truncate">{user?.email || ""}</p>
                  </div>
                </div>

                <div className="py-1">
                  <Link
                    to="/profile/shah"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-brand-600 transition-colors"
                  >
                    <User className="w-4 h-4 text-slate-400" />
                    Public Profile
                  </Link>
                  <Link
                    to="/settings"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-brand-600 transition-colors"
                  >
                    <Settings className="w-4 h-4 text-slate-400" />
                    Account Settings
                  </Link>
                </div>

                <div className="py-1">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors text-left"
                  >
                    <LogOut className="w-4 h-4 text-rose-500" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Global Search Modal */}
      <GlobalSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};
