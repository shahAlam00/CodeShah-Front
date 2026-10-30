import React from 'react';
import { SearchX } from 'lucide-react';

export const LoadingSkeleton = ({ className = '', count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`animate-pulse bg-slate-200/80 rounded-lg ${className}`}
        />
      ))}
    </>
  );
};

export const EmptyState = ({
  icon,
  title = "No results found",
  description = "Try adjusting your search criteria or resetting filters.",
  actionText,
  onAction,
  className = ""
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center bg-white rounded-2xl border border-slate-200/80 shadow-soft-sm ${className}`}>
      <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-3">
        {icon || <SearchX className="w-6 h-6" />}
      </div>
      <h4 className="text-base font-bold text-slate-800">{title}</h4>
      <p className="text-sm text-slate-500 max-w-sm mt-1 mb-4">{description}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 rounded-lg border border-brand-200 transition-colors"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
