import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { CheckCircle2, XCircle, Trophy, ArrowRight, RotateCcw, Star } from 'lucide-react';
import { mockAssessments } from '../../data/mockAssessments';
import { Button } from '../../components/common/Button';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts';

export const AssessmentResultPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const assessment = mockAssessments.find(a => a.id === id);

  const { score = 82, correct = 12, total = 15, answers = {} } = location.state || {};
  const passed = score >= (assessment?.passingScore || 70);

  const radarData = [ 
    { subject: 'Accuracy', A: score },
    { subject: 'Speed', A: 78 },
    { subject: 'Consistency', A: 85 }, 
    { subject: 'Concepts', A: score - 5 },
    { subject: 'Application', A: score + 3 > 100 ? 100 : score + 3 },
  ];

  const getStars = (s) => Math.min(5, Math.ceil(s / 20));

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-8 pb-12">
      {/* Result Hero */}
      <div className={`rounded-2xl p-8 text-center space-y-3 ${
        passed ? 'bg-gradient-to-tr from-emerald-500 to-teal-400 text-white' : 'bg-gradient-to-tr from-rose-500 to-orange-400 text-white'
      }`}>
        <div className="text-4xl">{passed ? '🎉' : '📚'}</div>
        <h1 className="text-3xl font-black">{passed ? 'Assessment Passed!' : 'Keep Practicing!'}</h1>
        <p className="text-white/80 text-sm">{assessment?.title}</p>

        {/* Score Circle */}
        <div className="flex justify-center my-4">
          <div className="relative w-28 h-28">
            <svg className="transform -rotate-90" viewBox="0 0 120 120" width="112" height="112">
              <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="10" />
              <circle
                cx="60" cy="60" r="50" fill="none" stroke="white" strokeWidth="10"
                strokeDasharray={`${2 * Math.PI * 50}`}
                strokeDashoffset={`${2 * Math.PI * 50 * (1 - score / 100)}`}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-white">{score}%</span>
              <span className="text-xs text-white/70 font-medium">Score</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`w-5 h-5 ${i < getStars(score) ? 'text-amber-300 fill-current' : 'text-white/30'}`} />
          ))}
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Correct', value: correct, icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />, color: 'emerald' },
          { label: 'Incorrect', value: total - correct, icon: <XCircle className="w-5 h-5 text-rose-500" />, color: 'rose' },
          { label: 'Pass Mark', value: `${assessment?.passingScore}%`, icon: <Trophy className="w-5 h-5 text-amber-500" />, color: 'amber' },
        ].map(({ label, value, icon, color }) => (
          <div key={label} className="bg-white rounded-2xl border border-slate-200/80 shadow-soft-sm p-4 text-center">
            <div className="flex justify-center mb-2">{icon}</div>
            <p className={`text-xl font-black text-${color}-600`}>{value}</p>
            <p className="text-xs text-slate-500 font-medium">{label}</p>
          </div>
        ))}
      </div>

      {/* Performance Radar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft-sm p-6">
        <h3 className="text-sm font-bold text-slate-900 mb-4">Performance Breakdown</h3>
        <ResponsiveContainer width="100%" height={220}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="#f1f5f9" />
            <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#64748b' }} />
            <Radar dataKey="A" stroke="#0284c7" fill="#0284c7" fillOpacity={0.15} strokeWidth={2} dot={{ r: 3, fill: '#0284c7' }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Topic Feedback */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft-sm p-6 space-y-3">
        <h3 className="text-sm font-bold text-slate-900">Skills Covered</h3>
        {assessment?.skillsCovered?.map((skill, i) => {
          const skillScore = Math.max(40, Math.min(100, score + (i % 2 === 0 ? 10 : -15) + i * 5));
          return (
            <div key={skill} className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-700">{skill}</span>
                <span className={skillScore >= 70 ? 'text-emerald-600' : 'text-amber-600'}>{skillScore}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${skillScore >= 70 ? 'bg-emerald-500' : 'bg-amber-400'}`} style={{ width: `${skillScore}%` }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Link to={`/assessments/${id}`} className="flex-1">
          <Button variant="outline" size="md" className="w-full" leftIcon={<RotateCcw className="w-4 h-4" />}>
            Retake Assessment
          </Button>
        </Link>
        <Link to="/assessments" className="flex-1">
          <Button variant="primary" size="md" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
            More Assessments
          </Button>
        </Link>
      </div>
    </div>
  );
};
