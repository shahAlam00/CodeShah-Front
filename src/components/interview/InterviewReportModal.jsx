import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from 'recharts';
import { CheckCircle2, Award, ArrowRight, BookOpen, AlertCircle } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useNavigate } from 'react-router-dom';

export const InterviewReportModal = ({ isOpen, onClose, reportData }) => {
  const navigate = useNavigate();

  if (!isOpen || !reportData) return null;

  const radarData = reportData.categories.map(c => ({
    subject: c.name,
    score: c.score,
    fullMark: c.max
  }));

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-2xl" title="Interview Evaluation Report">
      <div className="space-y-6">
        {/* Top Score Banner */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-5 bg-gradient-to-r from-brand-50 to-sky-50 rounded-2xl border border-brand-200/80 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-brand-700 uppercase tracking-wider">Overall Recommendation</span>
              <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                {reportData.verdict || "Strong Hire"}
              </span>
            </div>
            <p className="text-2xl font-black text-slate-900 mt-1">
              Score: {reportData.overallScore} <span className="text-sm font-normal text-slate-500">/ 100</span>
            </p>
            <p className="text-xs text-slate-600 mt-1 max-w-md leading-relaxed">
              {reportData.summary}
            </p>
          </div>

          <div className="w-44 h-44 flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="#cbd5e1" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 9, fontWeight: 700 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#cbd5e1" tick={false} />
                <Radar dataKey="score" stroke="#0284c7" fill="#0ea5e9" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category breakdown bars */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Competency Breakdown</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {reportData.categories.map((cat, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-800">{cat.name}</span>
                  <span className="text-brand-600 font-mono font-bold">{cat.score} / {cat.max}</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${cat.score}%` }}
                    className={`h-full rounded-full ${
                      cat.score >= 85 ? 'bg-emerald-500' : cat.score >= 70 ? 'bg-amber-500' : 'bg-rose-500'
                    }`}
                  />
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">{cat.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Strengths & Improvements */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Key Strengths</span>
            </div>
            <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside">
              {reportData.strengths?.map((str, i) => (
                <li key={i} className="leading-relaxed">{str}</li>
              ))}
            </ul>
          </div>

          <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-wider">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>Growth Opportunities</span>
            </div>
            <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside">
              {reportData.areasForImprovement?.map((imp, i) => (
                <li key={i} className="leading-relaxed">{imp}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
          <Button variant="outline" size="sm" onClick={onClose}>
            Close Report
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              onClose();
              navigate('/roadmaps/dsa');
            }}
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            Follow Learning Roadmap
          </Button>
        </div>
      </div>
    </Modal>
  );
};
