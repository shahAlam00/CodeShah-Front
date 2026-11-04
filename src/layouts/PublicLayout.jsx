import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { PublicNavbar } from '../components/navbar/PublicNavbar';
import { Github, Twitter, Linkedin, Youtube, Heart } from 'lucide-react';

export const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-800">
      <PublicNavbar />
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Global Footer */}
      <footer className="bg-white border-t border-slate-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand Column */}
            <div className="col-span-2 space-y-4">
              <Link to="/" className="flex items-center gap-2.5">
                <img src="/Logo.png" alt="CodeShah" className="w-8 h-8 rounded-xl object-contain flex-shrink-0" />
                <span className="text-lg font-black tracking-tight text-slate-900">
                  Code<span className="text-brand-600">Shah</span>
                </span>
              </Link>
              <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
                The modern engineering preparation ecosystem. Master data structures & algorithms, sharpen system design intuition, and simulate real technical interviews.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <a href="https://github.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-brand-50 hover:text-brand-600 text-slate-500 flex items-center justify-center transition-colors">
                  <Github className="w-4 h-4" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-brand-50 hover:text-brand-600 text-slate-500 flex items-center justify-center transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-brand-50 hover:text-brand-600 text-slate-500 flex items-center justify-center transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-brand-50 hover:text-brand-600 text-slate-500 flex items-center justify-center transition-colors">
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Product */}
            <div className="space-y-3">
              <p className="text-xs font-bold text-slate-900 uppercase tracking-wider">Product</p>
              <ul className="space-y-2 text-xs text-slate-500 font-medium">
                <li><Link to="/problems" className="hover:text-brand-600 transition-colors">Problem Library</Link></li>
                <li><Link to="/visualizer" className="hover:text-brand-600 transition-colors">DSA Visualizer</Link></li>
                <li><Link to="/interview" className="hover:text-brand-600 transition-colors">AI Mock Interview</Link></li>
                <li><Link to="/roadmaps" className="hover:text-brand-600 transition-colors">Learning Roadmaps</Link></li>
                <li><Link to="/contests" className="hover:text-brand-600 transition-colors">Weekly Contests</Link></li>
                <li><Link to="/assessments" className="hover:text-brand-600 transition-colors">Skill Assessments</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div className="space-y-3">
              <p className="text-xs font-bold text-slate-900 uppercase tracking-wider">Resources</p>
              <ul className="space-y-2 text-xs text-slate-500 font-medium">
                <li><Link to="/discussions" className="hover:text-brand-600 transition-colors">Community Forum</Link></li>
                <li><Link to="/leaderboard" className="hover:text-brand-600 transition-colors">Global Standings</Link></li>
                <li><a href="#" className="hover:text-brand-600 transition-colors">Algorithms Handbook</a></li>
                <li><a href="#" className="hover:text-brand-600 transition-colors">System Design Cheat Sheet</a></li>
                <li><a href="#" className="hover:text-brand-600 transition-colors">Company Interview Guides</a></li>
              </ul>
            </div>

            {/* Company & Legal */}
            <div className="space-y-3">
              <p className="text-xs font-bold text-slate-900 uppercase tracking-wider">Company</p>
              <ul className="space-y-2 text-xs text-slate-500 font-medium">
                <li><a href="#" className="hover:text-brand-600 transition-colors">About CodeShah</a></li>
                <li><a href="#" className="hover:text-brand-600 transition-colors">Careers (Hiring!)</a></li>
                <li><a href="#" className="hover:text-brand-600 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-brand-600 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-brand-600 transition-colors">Security</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-100 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
            <p>© {new Date().getFullYear()} CodeShah Inc. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for developers worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
