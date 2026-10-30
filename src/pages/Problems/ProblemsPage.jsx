import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, CheckCircle2, Circle, Clock, ChevronDown, X, SlidersHorizontal } from 'lucide-react';
import { Badge } from '../../components/common/Badge';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { problemTopicsList, companyList } from '../../data/mockProblems';
import { fetchAllProblems } from '../../api/problemApi';
import { useProgress } from '../../context/ProgressContext';

export const ProblemsPage = () => {
  const { isSolved, isAttempted, syncSolvedFromBackend } = useProgress();
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState('All');
  const [topic, setTopic] = useState('All');
  const [status, setStatus] = useState('All');
  const [company, setCompany] = useState('All Companies');
  const [showFilters, setShowFilters] = useState(false); 
 
  // Fetch real problems from backend on mount
  useEffect(() => {
    fetchAllProblems({ status: 'Published', limit: 200 })
      .then(({ data }) => {
        if (data.problems && data.problems.length > 0) {
          const normalised = data.problems.map((p) => ({
            id: p._id,
            slug: p.slug,
            title: p.title,
            difficulty: p.difficulty,
            category: p.category,
            topics: p.topics || [],
            companies: p.companies || [],
            acceptanceRate: p.acceptanceRate != null ? `${p.acceptanceRate}%` : '—',
            frequency: 0,
            description: p.description,
            examples: p.examples || [],
            constraints: p.constraints || [],
            hints: p.hints || [],
            starterCode: p.starterCode || {},
            testCases: [],
          }));
          setProblems(normalised);
          // Seed ProgressContext with backend solved state so status icons are accurate
          const solvedFromBackend = data.problems
            .filter(p => p.isSolved)
            .map(p => p._id);
          syncSolvedFromBackend(solvedFromBackend);
        }
      })
      .catch(() => {
        // backend not reachable → keep mock data silently
      })
      .finally(() => setLoading(false));
  }, [syncSolvedFromBackend]);

  const filteredProblems = useMemo(() => {
    return problems.filter(p => {
      const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.topics.some(t => t.toLowerCase().includes(search.toLowerCase()));
      const matchDifficulty = difficulty === 'All' || p.difficulty === difficulty;
      const matchTopic = topic === 'All' || p.topics.some(t => t === topic) || p.category === topic;
      const matchStatus = status === 'All' ||
        (status === 'Solved' && isSolved(p.id)) ||
        (status === 'Attempted' && isAttempted(p.id) && !isSolved(p.id)) ||
        (status === 'Unsolved' && !isSolved(p.id) && !isAttempted(p.id));
      const matchCompany = company === 'All Companies' || p.companies?.includes(company);
      return matchSearch && matchDifficulty && matchTopic && matchStatus && matchCompany;
    });
  }, [problems, search, difficulty, topic, status, company, isSolved, isAttempted]);

  const solvedCount = problems.filter(p => isSolved(p.id)).length;

const getStatusIcon = (problem) => {
    if (isSolved(problem.id)) return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
    if (isAttempted(problem.id)) return <Clock className="w-4 h-4 text-amber-500" />;
    return <Circle className="w-4 h-4 text-slate-300" />;
  };

  return (
    <div className="space-y-5 pb-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Problem Set</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {solvedCount} / {problems.length} solved • Filter by topic, difficulty, or company
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg">
            Easy: {problems.filter(p => p.difficulty === 'Easy' && isSolved(p.id)).length}/{problems.filter(p => p.difficulty === 'Easy').length}
          </span>
          <span className="px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg">
            Medium: {problems.filter(p => p.difficulty === 'Medium' && isSolved(p.id)).length}/{problems.filter(p => p.difficulty === 'Medium').length}
          </span>
          <span className="px-3 py-1 bg-rose-50 text-rose-700 border border-rose-200 rounded-lg">
            Hard: {problems.filter(p => p.difficulty === 'Hard' && isSolved(p.id)).length}/{problems.filter(p => p.difficulty === 'Hard').length}
          </span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-soft-sm space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <Input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search problems by title, topic, or algorithm pattern..."
              leftIcon={<Search className="w-4 h-4" />}
            />
          </div>
          <Button
            variant="outline"
            size="md"
            onClick={() => setShowFilters(!showFilters)}
            leftIcon={<SlidersHorizontal className="w-4 h-4" />}
          >
            Filters
          </Button>
        </div>

        {showFilters && (
          <div className="flex flex-wrap gap-3 pt-2 border-t border-slate-100 animate-fade-in">
            {/* Difficulty */}
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Difficulty</p>
              <div className="flex gap-1.5">
                {['All', 'Easy', 'Medium', 'Hard'].map(d => (
                  <button
                    key={d}
                    onClick={() => setDifficulty(d)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-colors ${difficulty === d
                      ? d === 'Easy' ? 'bg-emerald-100 border-emerald-300 text-emerald-800'
                        : d === 'Medium' ? 'bg-amber-100 border-amber-300 text-amber-800'
                          : d === 'Hard' ? 'bg-rose-100 border-rose-300 text-rose-800'
                            : 'bg-brand-100 border-brand-300 text-brand-800'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Status */}
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Status</p>
              <div className="flex gap-1.5">
                {['All', 'Solved', 'Attempted', 'Unsolved'].map(s => (
                  <button
                    key={s}
                    onClick={() => setStatus(s)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-colors ${status === s
                      ? 'bg-brand-100 border-brand-300 text-brand-800'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Topic */}
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Topic</p>
              <select
                value={topic}
                onChange={e => setTopic(e.target.value)}
                className="px-3 py-1.5 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg outline-none"
              >
                {problemTopicsList.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>

            {/* Company */}
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Company</p>
              <select
                value={company}
                onChange={e => setCompany(e.target.value)}
                className="px-3 py-1.5 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg outline-none"
              >
                {companyList.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>

            {(difficulty !== 'All' || topic !== 'All' || status !== 'All' || company !== 'All Companies') && (
              <button
                onClick={() => { setDifficulty('All'); setTopic('All'); setStatus('All'); setCompany('All Companies'); }}
                className="flex items-center gap-1 px-3 py-1 text-xs text-rose-600 font-semibold hover:bg-rose-50 rounded-lg transition-colors self-end"
              >
                <X className="w-3.5 h-3.5" /> Reset
              </button>
            )}
          </div>
        )}
      </div>

      {/* Problems Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft-sm overflow-hidden">
        <div className="grid grid-cols-12 gap-4 px-5 py-3 bg-slate-50 border-b border-slate-200/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
          <div className="col-span-1 text-center">Status</div>
          <div className="col-span-5">Problem Title</div>
          <div className="col-span-2">Difficulty</div>
          <div className="col-span-2">Acceptance</div>
          <div className="col-span-2">Topics</div>
        </div>

        <div className="divide-y divide-slate-100">
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="grid grid-cols-12 gap-4 px-5 py-3.5 items-center animate-pulse">
                <div className="col-span-1 flex justify-center">
                  <div className="w-4 h-4 rounded-full bg-slate-200" />
                </div>
                <div className="col-span-5 flex items-center gap-2">
                  <div className="w-5 h-3 bg-slate-200 rounded" />
                  <div className="h-3.5 bg-slate-200 rounded w-48" />
                </div>
                <div className="col-span-2">
                  <div className="h-5 bg-slate-200 rounded-lg w-16" />
                </div>
                <div className="col-span-2">
                  <div className="h-3 bg-slate-200 rounded w-10" />
                </div>
                <div className="col-span-2 flex gap-1">
                  <div className="h-4 bg-slate-200 rounded w-14" />
                  <div className="h-4 bg-slate-200 rounded w-12" />
                </div>
              </div>
            ))
          ) : filteredProblems.length === 0 ? (
            <div className="p-12 text-center">
              <Search className="w-8 h-8 text-slate-300 mx-auto mb-3" />
              <p className="text-sm font-semibold text-slate-600">No problems found</p>
              <p className="text-xs text-slate-400 mt-1">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            filteredProblems.map((problem, idx) => (
              <Link
                key={problem.id}
                to={`/problems/${problem.slug}`}
                className="grid grid-cols-12 gap-4 px-5 py-3.5 hover:bg-slate-50/70 transition-colors group items-center"
              >
                <div className="col-span-1 flex justify-center">
                  {getStatusIcon(problem)}
                </div>
                <div className="col-span-5 flex items-center gap-2 min-w-0">
                  <span className="text-xs text-slate-400 font-mono w-6 flex-shrink-0">{idx + 1}.</span>
                  <span className="text-sm font-semibold text-slate-800 group-hover:text-brand-600 transition-colors truncate">
                    {problem.title}
                  </span>
                  {problem.companies?.includes('Google') && (
                    <span className="hidden lg:inline text-[10px] font-bold px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded border border-blue-100">G</span>
                  )}
                </div>
                <div className="col-span-2">
                  <Badge size="sm">{problem.difficulty}</Badge>
                </div>
                <div className="col-span-2 text-xs font-medium text-slate-600">
                  {problem.acceptanceRate}
                </div>
                <div className="col-span-2 flex flex-wrap gap-1">
                  {problem.topics.slice(0, 2).map(t => (
                    <span key={t} className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </Link>
            ))
          )}
        </div>
      </div>

      <p className="text-center text-xs text-slate-400">
        {!loading && `Showing ${filteredProblems.length} of ${problems.length} problems`}
      </p>
    </div>
  );
};
