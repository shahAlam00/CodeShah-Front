import React from 'react';

export const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  icon
}) => {
  const sizeStyles = {
    xs: "text-[10px] px-1.5 py-0.5 font-medium rounded",
    sm: "text-xs px-2 py-0.5 font-medium rounded-md",
    md: "text-xs px-2.5 py-1 font-semibold rounded-md",
    lg: "text-sm px-3 py-1 font-semibold rounded-lg"
  };

  const variantStyles = {
    default: "bg-slate-100 text-slate-700 border border-slate-200/80",
    brand: "bg-brand-50 text-brand-700 border border-brand-200",
    easy: "bg-emerald-50 text-emerald-700 border border-emerald-200/80",
    medium: "bg-amber-50 text-amber-700 border border-amber-200/80",
    hard: "bg-rose-50 text-rose-700 border border-rose-200/80",
    success: "bg-emerald-100 text-emerald-800",
    danger: "bg-rose-100 text-rose-800",
    info: "bg-sky-100 text-sky-800",
    purple: "bg-purple-50 text-purple-700 border border-purple-200"
  };

  // Automatic variant mapping if children is difficulty
  let activeVariant = variant;
  if (typeof children === 'string') {
    const lower = children.toLowerCase();
    if (lower === 'easy') activeVariant = 'easy';
    else if (lower === 'medium') activeVariant = 'medium';
    else if (lower === 'hard') activeVariant = 'hard';
  }

  return (
    <span className={`inline-flex items-center gap-1.5 select-none ${sizeStyles[size]} ${variantStyles[activeVariant] || variantStyles.default} ${className}`}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
