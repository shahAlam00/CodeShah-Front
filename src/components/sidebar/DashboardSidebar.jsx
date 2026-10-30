import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Code2,
  Map,
  Trophy,
  Video,
  FileCheck2,
  Sparkles,
  Award,
  MessageSquare,
  Settings, 
  ChevronLeft,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const DashboardSidebar = ({ isCollapsed, onToggle }) => {
  const { user } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'DSA Practice', href: '/problems', icon: Code2, badge: '5K+' },
    { name: 'Roadmaps', href: '/roadmaps', icon: Map },
    { name: 'DSA Visualizer', href: '/visualizer', icon: Sparkles, badge: 'Hot' },
    { name: 'AI Interview', href: '/interview', icon: Video, badge: 'AI' },
    { name: 'Assessments', href: '/assessments', icon: FileCheck2 },
    { name: 'Contests', href: '/contests', icon: Trophy },
    { name: 'Leaderboard', href: '/leaderboard', icon: Award },
    { name: 'Community', href: '/discussions', icon: MessageSquare },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen bg-white border-r border-slate-200/80 transition-all duration-300 flex flex-col justify-between ${isCollapsed ? 'w-20' : 'w-64'
        }`}
    >
      {/* Top Brand Header */}
      <div>
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100">
          <Link to="/" className="flex items-center gap-2.5 overflow-hidden">
            <img src="/Logo.png" alt="CodeFront" className="w-9 h-9 rounded-xl object-contain flex-shrink-0 shadow-soft-sm" />
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="text-base font-black tracking-tight text-slate-900 leading-none">
                  Code<span className="text-brand-600">Shah</span>
                </span>
                <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest mt-0.5">
                  Platform
                </span>
              </div>
            )}
          </Link>

          <button
            onClick={onToggle}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors hidden lg:block"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation List */}
        <nav className="p-3 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${isActive
                    ? 'bg-brand-50 text-brand-700 shadow-soft-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  } ${isCollapsed ? 'justify-center' : ''}`
                }
                title={isCollapsed ? item.name : undefined}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 transition-transform group-hover:scale-110`} />
                {!isCollapsed && (
                  <div className="flex items-center justify-between flex-1">
                    <span>{item.name}</span>
                    {item.badge && (
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${item.badge === 'Hot' || item.badge === 'AI'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-500'
                        }`}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile / Settings Section */}
      <div className="p-3 border-t border-slate-100 space-y-1">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${isActive
              ? 'bg-brand-50 text-brand-700'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
            } ${isCollapsed ? 'justify-center' : ''}`
          }
          title={isCollapsed ? "Settings" : undefined}
        >
          <Settings className="w-4 h-4 flex-shrink-0" />
          {!isCollapsed && <span>Settings</span>}
        </NavLink>

        {/* User Card */}
        <Link
          to="/profile/shah"
          className={`flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-100 transition-colors ${isCollapsed ? 'justify-center' : ''
            }`}
          title={isCollapsed ? user?.name : undefined}
        >
          <img
            src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
            alt="Avatar"
            className="w-8 h-8 rounded-lg object-cover ring-2 ring-brand-500/20 flex-shrink-0"
          />
          {!isCollapsed && (
            <div className="flex flex-col text-left overflow-hidden">
              <span className="text-xs font-bold text-slate-800 truncate">{user?.name || "Shaharyar"}</span>
              <span className="text-[10px] text-slate-400 truncate">Rating: 2,145</span>
            </div>
          )}
        </Link>
      </div>
    </aside>
  );
};
