import React from 'react';

export const StatCard = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendPositive = true,
  color = 'brand', // 'brand' | 'amber' | 'emerald' | 'purple'
  className = ''
}) => {
  const iconColorMap = {
    brand: 'bg-brand-50 text-brand-600 border-brand-200',
    amber: 'bg-amber-50 text-amber-600 border-amber-200',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200'
  };

  return (
    <div className={`p-5 bg-white rounded-2xl border border-slate-200/80 shadow-soft-sm hover:shadow-soft-md transition-all flex items-start justify-between ${className}`}>
      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</p>
        <p className="text-2xl font-black text-slate-900 mt-1 tracking-tight">{value}</p>
        <div className="flex items-center gap-1.5 mt-2">
          {trend && (
            <span className={`text-xs font-bold ${trendPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
              {trend}
            </span>
          )}
          {subtitle && <span className="text-xs text-slate-500">{subtitle}</span>}
        </div>
      </div>
      {icon && (
        <div className={`p-3 rounded-2xl border ${iconColorMap[color] || iconColorMap.brand} flex-shrink-0`}>
          {icon}
        </div>
      )}
    </div>
  );
};
