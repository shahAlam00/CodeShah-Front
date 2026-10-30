import React, { useState, useRef, useEffect } from 'react';
import { Bell, CheckCheck, Award, Flame, Calendar, MessageSquare, Code } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const NotificationsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Solution Accepted!",
      message: "Your submission for Two Sum beat 92.4% of JavaScript entries in runtime.",
      time: "20m ago",
      read: false,
      icon: <Code className="w-4 h-4 text-emerald-600" />,
      url: "/problems/two-sum"
    },
    {
      id: 2,
      title: "Streak Milestone Reached 🔥",
      message: "Congratulations! You've maintained a 28-day active coding streak.",
      time: "2h ago",
      read: false,
      icon: <Flame className="w-4 h-4 text-amber-500" />,
      url: "/profile/shah"
    },
    {
      id: 3,
      title: "Weekly Contest 412 Starts Tomorrow",
      message: "Reminder: Weekly Contest 412 begins in 18 hours. Review graph algorithms.",
      time: "5h ago",
      read: true,
      icon: <Calendar className="w-4 h-4 text-brand-600" />,
      url: "/contests"
    },
    {
      id: 4,
      title: "New Discussion Reply",
      message: "Alexey Petrov commented on your Dynamic Programming query.",
      time: "1d ago",
      read: true,
      icon: <MessageSquare className="w-4 h-4 text-purple-600" />,
      url: "/discussions"
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleClickItem = (item) => {
    setNotifications(prev => prev.map(n => n.id === item.id ? { ...n, read: true } : n));
    setIsOpen(false);
    if (item.url) navigate(item.url);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 overflow-hidden animate-fade-in">
          <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-slate-800">Notifications</h4>
              {unreadCount > 0 && (
                <span className="text-[10px] font-bold px-2 py-0.5 bg-brand-100 text-brand-700 rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
            {notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => handleClickItem(n)}
                className={`p-3.5 hover:bg-slate-50 cursor-pointer transition-colors flex gap-3 ${
                  !n.read ? 'bg-brand-50/30' : ''
                }`}
              >
                <div className="p-2 rounded-xl bg-slate-100 self-start">
                  {n.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <p className={`text-xs ${!n.read ? 'font-bold text-slate-900' : 'font-semibold text-slate-700'}`}>
                      {n.title}
                    </p>
                    <span className="text-[10px] text-slate-400 whitespace-nowrap">{n.time}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">{n.message}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-2.5 text-center border-t border-slate-100 bg-slate-50/50">
            <button
              onClick={() => { setIsOpen(false); navigate('/dashboard'); }}
              className="text-xs font-semibold text-slate-600 hover:text-brand-600"
            >
              View Activity Center
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
