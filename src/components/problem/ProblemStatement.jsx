import React, { useState } from 'react';
import {
  Bookmark,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Building2,
  Tag,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Lightbulb
} from 'lucide-react';
import { Badge } from '../common/Badge';
import { useProgress } from '../../context/ProgressContext';
import { useToast } from '../../context/ToastContext';

export const ProblemStatement = ({ problem }) => {
  const { isBookmarked, toggleBookmark, isSolved } = useProgress();
  const { success } = useToast();
  const [likes, setLikes] = useState(2450);
  const [liked, setLiked] = useState(false);
  const [showHints, setShowHints] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(prev => liked ? prev - 1 : prev + 1);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    success("Problem link copied to clipboard!");
  };

  if (!problem) return null;

  return (
    <div className="p-5 lg:p-6 text-slate-800 space-y-6 text-sm leading-relaxed overflow-y-auto max-h-full">
      {/* Title & Metadata */}
      <div>
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight">
            {problem.title}
          </h1>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button
              onClick={() => toggleBookmark(problem.id)}
              className={`p-2 rounded-lg border transition-colors ${
                isBookmarked(problem.id)
                  ? 'bg-amber-50 border-amber-300 text-amber-600'
                  : 'bg-white border-slate-200 text-slate-400 hover:text-slate-700'
              }`}
              title="Bookmark problem"
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-slate-700 transition-colors"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Badges Bar */}
        <div className="flex flex-wrap items-center gap-2 mt-3 text-xs">
          <Badge size="md">{problem.difficulty}</Badge>

          {isSolved(problem.id) && (
            <span className="flex items-center gap-1 text-emerald-600 font-semibold px-2 py-0.5 bg-emerald-50 rounded-md border border-emerald-200/60">
              <CheckCircle2 className="w-3.5 h-3.5" /> Solved
            </span>
          )}

          <span className="text-slate-400">•</span>
          <span className="text-slate-500 font-medium">Acceptance: <strong className="text-slate-700">{problem.acceptanceRate}</strong></span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-500 font-medium">Frequency: <strong className="text-slate-700">{problem.frequency}%</strong></span>

          {/* Like button */}
          <button
            onClick={handleLike}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md border text-xs font-semibold ml-auto transition-colors ${
              liked ? 'bg-brand-50 border-brand-300 text-brand-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <ThumbsUp className={`w-3.5 h-3.5 ${liked ? 'fill-brand-600' : ''}`} />
            <span>{likes}</span>
          </button>
        </div>
      </div>

      <hr className="border-slate-100" />

      {/* Problem Description Text */}
      <div className="space-y-4 text-slate-700">
        <div className="whitespace-pre-line leading-relaxed">
          {problem.description}
        </div>

        {/* Examples */}
        {problem.examples?.map((ex, idx) => (
          <div key={idx} className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-2">
            <p className="font-bold text-xs text-slate-900 uppercase tracking-wider">Example {idx + 1}:</p>
            <div className="font-mono text-xs space-y-1">
              <p><strong className="text-slate-600">Input:</strong> <span className="text-slate-900 bg-white px-1.5 py-0.5 rounded border border-slate-200">{ex.input}</span></p>
              <p><strong className="text-slate-600">Output:</strong> <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">{ex.output}</span></p>
              {ex.explanation && (
                <p className="font-sans text-xs text-slate-500 pt-1">
                  <strong>Explanation:</strong> {ex.explanation}
                </p>
              )}
            </div>
          </div>
        ))}

        {/* Constraints */}
        {problem.constraints && (
          <div className="space-y-2 pt-2">
            <p className="font-bold text-xs text-slate-900 uppercase tracking-wider">Constraints:</p>
            <ul className="list-disc list-inside space-y-1 text-xs font-mono text-slate-600 bg-slate-50/60 p-3 rounded-xl border border-slate-200/60">
              {problem.constraints.map((c, i) => (
                <li key={i} className="text-slate-700">{c}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Hints accordion */}
        {problem.hints && problem.hints.length > 0 && (
          <div className="pt-2">
            <button
              onClick={() => setShowHints(!showHints)}
              className="flex items-center justify-between w-full p-3 bg-amber-50/60 hover:bg-amber-50 border border-amber-200/80 rounded-xl text-xs font-bold text-amber-900 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                Problem Hints ({problem.hints.length})
              </span>
              {showHints ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showHints && (
              <div className="mt-2 space-y-2 p-3 bg-white border border-amber-100 rounded-xl text-xs text-slate-600 animate-fade-in">
                {problem.hints.map((hint, i) => (
                  <p key={i} className="leading-relaxed">
                    <strong>Hint {i + 1}:</strong> {hint}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tags & Companies */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          {problem.topics && (
            <div>
              <span className="text-xs font-semibold text-slate-500 flex items-center gap-1 mb-2">
                <Tag className="w-3.5 h-3.5" /> Related Topics
              </span>
              <div className="flex flex-wrap gap-1.5">
                {problem.topics.map((t) => (
                  <span key={t} className="text-xs px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {problem.companies && (
            <div>
              <span className="text-xs font-semibold text-slate-500 flex items-center gap-1 mb-2">
                <Building2 className="w-3.5 h-3.5" /> Companies
              </span>
              <div className="flex flex-wrap gap-1.5">
                {problem.companies.map((c) => (
                  <span key={c} className="text-xs px-2.5 py-1 bg-brand-50 text-brand-700 rounded-lg font-semibold border border-brand-200/60">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
