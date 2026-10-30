import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Code2, Map, Trophy, MessageSquare, ArrowRight, X } from 'lucide-react';
import { mockProblems } from '../../data/mockProblems';
import { mockRoadmaps } from '../../data/mockRoadmaps';
import { mockContests } from '../../data/mockContests';
import { mockDiscussions } from '../../data/mockDiscussions';
import { Badge } from '../common/Badge';

export const GlobalSearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled by parent
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();

    const matchedProblems = mockProblems
      .filter(p => p.title.toLowerCase().includes(q) || p.topics.some(t => t.toLowerCase().includes(q)))
      .slice(0, 4)
      .map(p => ({
        type: 'Problem',
        icon: <Code2 className="w-4 h-4 text-brand-600" />,
        title: p.title,
        subtitle: `${p.difficulty} • ${p.category}`,
        badge: p.difficulty,
        url: `/problems/${p.slug}`
      }));

    const matchedRoadmaps = mockRoadmaps
      .filter(r => r.title.toLowerCase().includes(q) || r.category.toLowerCase().includes(q))
      .slice(0, 2)
      .map(r => ({
        type: 'Roadmap',
        icon: <Map className="w-4 h-4 text-emerald-600" />,
        title: r.title,
        subtitle: `${r.estimatedTime} • ${r.category}`,
        badge: `${r.progress}% Done`,
        url: `/roadmaps/${r.slug}`
      }));

    const matchedContests = mockContests
      .filter(c => c.title.toLowerCase().includes(q))
      .slice(0, 2)
      .map(c => ({
        type: 'Contest',
        icon: <Trophy className="w-4 h-4 text-amber-600" />,
        title: c.title,
        subtitle: `${c.status} • ${c.duration}`,
        badge: c.status,
        url: `/contests/${c.id}`
      }));

    const matchedDiscussions = mockDiscussions
      .filter(d => d.title.toLowerCase().includes(q))
      .slice(0, 2)
      .map(d => ({
        type: 'Discussion',
        icon: <MessageSquare className="w-4 h-4 text-purple-600" />,
        title: d.title,
        subtitle: `By ${d.author.name} • ${d.upvotes} upvotes`,
        badge: d.category,
        url: `/discussions/${d.id}`
      }));

    return [...matchedProblems, ...matchedRoadmaps, ...matchedContests, ...matchedDiscussions];
  }, [query]);

  const handleSelect = (url) => {
    onClose();
    navigate(url);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 animate-fade-in">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100 bg-white">
          <Search className="w-5 h-5 text-slate-400 mr-3" />
          <input
            type="text"
            placeholder="Search problems, roadmaps, contests, discussions... (e.g. 'Two Sum', 'Graphs', 'React')"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full text-slate-800 placeholder:text-slate-400 text-sm bg-transparent outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-96 overflow-y-auto p-2">
          {query.trim() === '' ? (
            <div className="p-6 text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Popular Searches</p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {['Two Sum', 'Dynamic Programming', 'Frontend Roadmap', 'Course Schedule', 'Weekly Contest'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-brand-50 hover:text-brand-700 rounded-lg transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-1">
              {results.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSelect(item.url)}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-brand-50 transition-colors">
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-slate-800 group-hover:text-brand-600 truncate transition-colors">
                          {item.title}
                        </p>
                        <span className="text-[10px] uppercase font-bold text-slate-400 px-1.5 py-0.5 bg-slate-100 rounded">
                          {item.type}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 truncate mt-0.5">{item.subtitle}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.badge && <Badge size="sm">{item.badge}</Badge>}
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand-600 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-sm font-semibold text-slate-700">No results found for "{query}"</p>
              <p className="text-xs text-slate-500 mt-1">Try checking for typos or searching by algorithm topic</p>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-3">
            <span><kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded shadow-xs font-mono">ESC</kbd> to close</span>
            <span><kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded shadow-xs font-mono">↵</kbd> to select</span>
          </div>
          <span>CodeFront Universal Search</span>
        </div>
      </div>
    </div>
  );
};
