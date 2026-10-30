import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Terminal, Search, Menu, X, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../common/Button';
import { GlobalSearchModal } from './GlobalSearchModal';
import { useAuth } from '../../context/AuthContext';

export const PublicNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    { label: "Problems", path: "/problems" },
    { label: "Roadmaps", path: "/roadmaps" },
    { label: "DSA Visualizer", path: "/visualizer", badge: "Interactive" },
    { label: "AI Interview", path: "/interview", badge: "New" },
    { label: "Contests", path: "/contests" },
    { label: "Leaderboard", path: "/leaderboard" }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl  flex items-center justify-center text-white shadow-soft-sm group-hover:scale-105 transition-transform">
                  <img src="/Logo.png" alt="CodeFront" className="w-9 h-9 rounded-xl object-contain flex-shrink-0 shadow-soft-sm" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tight text-slate-900 leading-none">
                  Code<span className="text-brand-600">Shah</span>
                </span>
                <span className="text-[10px] font-semibold text-slate-600 tracking-wider uppercase mt-0.5">
                  DSA & Interview Suite
                </span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-brand-600 rounded-lg hover:bg-brand-50/60 transition-colors flex items-center gap-1.5"
                >
                  {link.label}
                  {link.badge && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-brand-100 text-brand-700">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Global Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs text-slate-600 bg-slate-100/90 hover:bg-slate-200/80 rounded-xl border border-slate-200/80 transition-colors"
            >
              <Search className="w-3.5 h-3.5 text-slate-600" />
              <span>Search platform...</span>
              <kbd className="text-[10px] font-mono px-1.5 py-0.5 bg-white border border-slate-300 rounded shadow-xs text-slate-600">
                Ctrl K
              </kbd>
            </button>

            {isAuthenticated ? (
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate('/dashboard')}
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Dashboard
              </Button>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Log in
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">
                    Start Coding Free
                  </Button>
                </Link>
              </>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 animate-fade-in shadow-xl">
            <button
              onClick={() => { setMobileMenuOpen(false); setSearchOpen(true); }}
              className="w-full flex items-center justify-between px-3 py-2 text-sm text-slate-500 bg-slate-50 rounded-lg border border-slate-200 mb-3"
            >
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-slate-400" />
                <span>Search problems, topics...</span>
              </div>
              <kbd className="text-[10px] font-mono px-1.5 py-0.5 bg-white border border-slate-200 rounded">Ctrl K</kbd>
            </button>

            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2 text-sm font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-700 rounded-lg transition-colors"
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-brand-100 text-brand-700">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
            
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              {isAuthenticated ? (
                <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" className="w-full">
                    Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Sign in
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="primary" className="w-full">
                      Create Free Account
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <GlobalSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};
