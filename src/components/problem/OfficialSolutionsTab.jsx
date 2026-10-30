import React, { useState } from 'react';
import { Code2 } from 'lucide-react';

const LANG_LABELS = {
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  python: 'Python',
  java: 'Java',
  cpp: 'C++',
};

export const OfficialSolutionsTab = ({ problem }) => {
  const solutions = (problem.solutions || []).filter(s => s.code?.trim());

  const [activeLang, setActiveLang] = useState(solutions[0]?.language || '');

  if (solutions.length === 0) {
    return (
      <div className="p-6 text-center text-slate-400 text-sm">
        <Code2 className="w-8 h-8 mx-auto mb-2 opacity-30" />
        <p>No official solutions available yet.</p>
      </div>
    );
  }

  const current = solutions.find(s => s.language === activeLang) || solutions[0];

  return (
    <div className="p-5 lg:p-6 space-y-4 text-sm overflow-y-auto max-h-full">
      <div className="flex items-center gap-2 text-brand-600 font-bold text-xs uppercase tracking-wider">
        <Code2 className="w-4 h-4" />
        <span>Official Solutions</span>
      </div>

      {/* Language tabs */}
      <div className="flex flex-wrap gap-2">
        {solutions.map(s => (
          <button
            key={s.language}
            onClick={() => setActiveLang(s.language)}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${activeLang === s.language
              ? 'bg-brand-600 text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
          >
            {LANG_LABELS[s.language] || s.language}
          </button>
        ))}
      </div>

      {/* Complexity */}
      {(current.timeComplexity || current.spaceComplexity) && (
        <div className="flex gap-3">
          {current.timeComplexity && (
            <div className="px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs">
              <span className="text-slate-500">Time: </span>
              <span className="font-bold font-mono text-slate-900">{current.timeComplexity}</span>
            </div>
          )}
          {current.spaceComplexity && (
            <div className="px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs">
              <span className="text-slate-500">Space: </span>
              <span className="font-bold font-mono text-slate-900">{current.spaceComplexity}</span>
            </div>
          )}
        </div>
      )}

      {/* Code block */}
      <pre className="bg-slate-900 text-emerald-400 text-xs font-mono p-4 rounded-xl overflow-x-auto whitespace-pre-wrap leading-relaxed">
        {current.code}
      </pre>

      {/* Explanation */}
      {current.explanation && (
        <div className="bg-brand-50/50 p-4 rounded-xl border border-brand-100 text-xs text-slate-700 whitespace-pre-line leading-relaxed">
          {current.explanation}
        </div>
      )}
    </div>
  );
};
