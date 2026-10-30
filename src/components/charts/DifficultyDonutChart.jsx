import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export const DifficultyDonutChart = ({
  easy = { solved: 245, total: 820 },
  medium = { solved: 185, total: 1650 },
  hard = { solved: 56, total: 630 }
}) => {
  const totalSolved = easy.solved + medium.solved + hard.solved;
  const totalQuestions = easy.total + medium.total + hard.total;

  const data = [
    { name: 'Easy', value: easy.solved, total: easy.total, color: '#10b981' },
    { name: 'Medium', value: medium.solved, total: medium.total, color: '#f59e0b' },
    { name: 'Hard', value: hard.solved, total: hard.total, color: '#ef4444' },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft-sm flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-slate-900">Difficulty Breakdown</h3>
        <span className="text-xs font-semibold text-slate-600">
          {((totalSolved / totalQuestions) * 100).toFixed(1)}% Solved
        </span>
      </div>

      <div className="flex items-center justify-center relative my-2">
        <div className="w-48 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={58}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(val, name, item) => [`${val} / ${item.payload.total} solved`, name]}
                contentStyle={{ borderRadius: '0.5rem', border: '1px solid #e2e8f0', fontSize: '12px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-black text-slate-900 leading-tight">{totalSolved}</span>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Solved</span>
        </div>
      </div>

      {/* Breakdown list */}
      <div className="space-y-2 mt-4 pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="font-semibold text-slate-700">Easy</span>
          </div>
          <span className="font-medium text-slate-600">
            <strong className="text-slate-900">{easy.solved}</strong> / {easy.total}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="font-semibold text-slate-700">Medium</span>
          </div>
          <span className="font-medium text-slate-600">
            <strong className="text-slate-900">{medium.solved}</strong> / {medium.total}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span className="font-semibold text-slate-700">Hard</span>
          </div>
          <span className="font-medium text-slate-600">
            <strong className="text-slate-900">{hard.solved}</strong> / {hard.total}
          </span>
        </div>
      </div>
    </div>
  );
};
