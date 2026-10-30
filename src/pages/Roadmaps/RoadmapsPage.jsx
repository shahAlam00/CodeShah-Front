import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Lock, Clock, BookOpen, ChevronRight, TrendingUp } from 'lucide-react';
import { mockRoadmaps } from '../../data/mockRoadmaps';
import { Button } from '../../components/common/Button';

export const RoadmapsPage = () => {
  return (
    <div className="space-y-6 pb-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Learning Roadmaps</h1>
        <p className="text-xs text-slate-500 mt-1">Structured paths to master every domain of software engineering</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {mockRoadmaps.map((roadmap) => (
          <Link
            key={roadmap.id}
            to={`/roadmaps/${roadmap.slug}`}
            className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft-sm hover:shadow-soft-md hover:border-brand-300 transition-all group flex flex-col"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${roadmap.color} flex-shrink-0`} />
              <span className="text-xs font-semibold text-slate-500 px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg">
                {roadmap.category}
              </span>
            </div>

            <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-600 transition-colors mb-1">
              {roadmap.title}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed flex-1 mb-4">
              {roadmap.description}
            </p>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-600">{roadmap.completedModules}/{roadmap.totalModules} Modules</span>
                <span className="text-brand-600">{roadmap.progress}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-brand-500 to-sky-400 rounded-full transition-all duration-500"
                  style={{ width: `${roadmap.progress}%` }}
                />
              </div>
            </div>

            {/* Meta */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{roadmap.estimatedTime}</span>
              </div>
              <div className="flex items-center gap-1 text-brand-600 font-semibold group-hover:translate-x-0.5 transition-transform">
                <span>Continue</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
