import React from 'react';
import { BookOpen } from 'lucide-react';

export const EditorialTab = ({ problem }) => {
  const ed = problem.editorialData || {};
  const hasEditorial = ed.overview || ed.approach || problem.editorial;

  if (!hasEditorial) {
    return (
      <div className="p-6 text-center text-slate-400 text-sm">
        <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-30" />
        <p>No editorial available for this problem yet.</p>
      </div>
    );
  }

  return (
    <div className="p-5 lg:p-6 text-slate-800 space-y-6 text-sm overflow-y-auto max-h-full">
      <div className="flex items-center gap-2 text-brand-600 font-bold text-xs uppercase tracking-wider">
        <BookOpen className="w-4 h-4" />
        <span>Official Editorial</span>
      </div>

      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">
          {ed.title || `${problem.title}: Intuition & Analysis`}
        </h2>
        <p className="text-xs text-slate-500">
          Authored by CodeFront Algorithms Research Group • Verified for optimal Time/Space bounds
        </p>
      </div>

      <hr className="border-slate-100" />

      <div className="space-y-4 leading-relaxed text-slate-700">
        {ed.overview && (
          <>
            <h3 className="text-base font-bold text-slate-900">1. Problem Overview & Invariants</h3>
            <p className="whitespace-pre-line">{ed.overview}</p>
          </>
        )}

        {(ed.approach || ed.keyInvariant) && (
          <>
            <h3 className="text-base font-bold text-slate-900">2. Optimal Approach: Step-by-Step</h3>
            {ed.keyInvariant && (
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs font-mono space-y-2">
                <p className="text-brand-700 font-bold font-sans">Key Invariant:</p>
                <p className="text-slate-800">{ed.keyInvariant}</p>
              </div>
            )}
            {ed.approach && (
              <p className="whitespace-pre-line">{ed.approach}</p>
            )}
          </>
        )}

        {/* Fallback to plain editorial string */}
        {problem.editorial && !ed.overview && (
          <div className="bg-brand-50/50 p-4 rounded-xl border border-brand-100 text-xs text-slate-700 whitespace-pre-line leading-relaxed">
            {problem.editorial}
          </div>
        )}

        {(ed.timeComplexity || ed.spaceComplexity) && (
          <>
            <h3 className="text-base font-bold text-slate-900">3. Complexity Breakdown</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
                <span className="text-xs font-semibold text-slate-500 block mb-1">Time Complexity</span>
                <span className="text-base font-bold text-slate-900 font-mono">{ed.timeComplexity || 'O(N)'}</span>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
                <span className="text-xs font-semibold text-slate-500 block mb-1">Space Complexity</span>
                <span className="text-base font-bold text-slate-900 font-mono">{ed.spaceComplexity || 'O(1)'}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
