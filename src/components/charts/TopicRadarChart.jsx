import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

export const TopicRadarChart = ({ data }) => {
  const chartData = data || [
    { topic: 'Arrays', score: 85, fullMark: 100 },
    { topic: 'Strings', score: 80, fullMark: 100 },
    { topic: 'Linked List', score: 84, fullMark: 100 },
    { topic: 'Trees', score: 75, fullMark: 100 },
    { topic: 'Graphs', score: 69, fullMark: 100 },
    { topic: 'DP', score: 52, fullMark: 100 },
    { topic: 'Stack/Queue', score: 82, fullMark: 100 },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft-sm flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-base font-bold text-slate-900">Topic Proficiency</h3>
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200/60">
          Algorithmic Depth
        </span>
      </div>
      <p className="text-xs text-slate-500 mb-2">Skill readiness distribution based on solved difficulty</p>

      <div className="w-full h-56">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
            <PolarGrid stroke="#e2e8f0" />
            <PolarAngleAxis dataKey="topic" tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#cbd5e1" tick={false} />
            <Radar
              name="Proficiency %"
              dataKey="score"
              stroke="#0284c7"
              fill="#0ea5e9"
              fillOpacity={0.25}
            />
            <Tooltip
              formatter={(value) => [`${value}%`, 'Mastery']}
              contentStyle={{ borderRadius: '0.5rem', border: '1px solid #e2e8f0', fontSize: '12px' }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
