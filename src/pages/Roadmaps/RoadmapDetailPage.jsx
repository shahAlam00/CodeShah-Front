import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Lock, PlayCircle, Clock, ArrowLeft, ArrowRight, Code2 } from 'lucide-react';
import { mockRoadmaps } from '../../data/mockRoadmaps';
import { Button } from '../../components/common/Button';

export const RoadmapDetailPage = () => {
  const { slug } = useParams();
  const roadmap = mockRoadmaps.find(r => r.slug === slug);

  if (!roadmap) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500 gap-3">
        <p className="text-lg font-bold">Roadmap not found</p>
        <Link to="/roadmaps" className="text-brand-600 hover:underline text-sm font-semibold">← Back to Roadmaps</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-6">
      <div className="flex items-center gap-3">
        <Link to="/roadmaps" className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-brand-600">
          <ArrowLeft className="w-4 h-4" /> All Roadmaps
        </Link>
      </div>

      {/* Hero */}
      <div className={`p-8 bg-gradient-to-tr ${roadmap.color} rounded-2xl text-white`}>
        <p className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-2">{roadmap.category}</p>
        <h1 className="text-3xl font-black tracking-tight">{roadmap.title}</h1>
        <p className="text-white/80 text-sm mt-2 max-w-xl">{roadmap.description}</p>
        <div className="flex items-center gap-6 mt-5 text-sm font-semibold">
          <span>{roadmap.completedModules}/{roadmap.totalModules} Modules Complete</span>
          <span>{roadmap.progress}% Progress</span>
          <span><Clock className="w-4 h-4 inline mr-1" />{roadmap.estimatedTime}</span>
        </div>
        <div className="w-full h-2 bg-white/20 rounded-full mt-3 overflow-hidden">
          <div className="h-full bg-white rounded-full" style={{ width: `${roadmap.progress}%` }} />
        </div>
      </div>

      {/* Current Topic Highlight */}
      <div className="p-4 bg-brand-50 border border-brand-200 rounded-2xl flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold text-brand-700 uppercase tracking-wider mb-1">Currently Learning</p>
          <p className="text-sm font-bold text-slate-900">{roadmap.currentTopic}</p>
        </div>
        <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
          Continue
        </Button>
      </div>

      {/* Modules Timeline */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-slate-900">Curriculum</h2>
        <div className="space-y-2">
          {roadmap.modules.map((module, idx) => (
            <div
              key={module.id}
              className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                module.status === 'completed'
                  ? 'bg-emerald-50/50 border-emerald-200/80'
                  : module.status === 'in-progress'
                  ? 'bg-brand-50 border-brand-300 shadow-soft-sm'
                  : 'bg-white border-slate-200/80 opacity-60'
              }`}
            >
              {/* Step indicator */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 ${
                module.status === 'completed' ? 'bg-emerald-500 text-white'
                : module.status === 'in-progress' ? 'bg-brand-600 text-white'
                : 'bg-slate-200 text-slate-500'
              }`}>
                {module.status === 'completed' ? <CheckCircle2 className="w-4 h-4" /> :
                 module.status === 'locked' ? <Lock className="w-3.5 h-3.5" /> :
                 idx + 1}
              </div>

              <div className="flex-1 min-w-0">
                <p className={`text-sm font-bold ${
                  module.status === 'locked' ? 'text-slate-400' : 'text-slate-800'
                }`}>{module.title}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {module.problemsCount} problems • {module.status}
                </p>
              </div>

              {module.status !== 'locked' && (
                <div className={`text-xs font-semibold px-3 py-1 rounded-lg ${
                  module.status === 'completed' ? 'text-emerald-700 bg-emerald-100'
                  : 'text-brand-700 bg-brand-100'
                }`}>
                  {module.status === 'completed' ? '✓ Done' : '→ Resume'}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
