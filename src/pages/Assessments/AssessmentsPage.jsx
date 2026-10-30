import React, { useState } from 'react';
import { mockAssessments } from '../../data/mockAssessments';
import { Link } from 'react-router-dom';
import { Clock, Target, BookOpen, ChevronRight, CheckCircle2, Star, Zap } from 'lucide-react';
import { Button } from '../../components/common/Button';

export const AssessmentsPage = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'JavaScript', 'Data Structures', 'React', 'Backend', 'Database'];

  const filtered = filter === 'All' ? mockAssessments : mockAssessments.filter(a => a.category === filter);

  const difficultyColor = (d) => {
    if (d === 'Beginner') return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    if (d === 'Intermediate') return 'bg-amber-100 text-amber-800 border-amber-200';
    return 'bg-rose-100 text-rose-800 border-rose-200';
  };

  return (
    <div className="space-y-5 pb-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900">Skill Assessments</h1>
        <p className="text-xs text-slate-500 mt-1">Test your knowledge with timed quizzes across different technologies and topics</p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              filter === cat ? 'bg-brand-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-brand-300 hover:text-brand-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Assessment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((assessment) => (
          <div key={assessment.id} className="bg-white rounded-2xl border border-slate-200/80 shadow-soft-sm hover:shadow-soft-md hover:border-brand-300 transition-all overflow-hidden">
            {/* Top color band */}
            <div className={`h-1.5 ${
              assessment.category === 'JavaScript' ? 'bg-amber-400' :
              assessment.category === 'React' ? 'bg-sky-400' :
              assessment.category === 'Data Structures' ? 'bg-purple-500' :
              'bg-brand-500'
            }`} />

            <div className="p-6 space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${difficultyColor(assessment.difficulty)}`}>
                      {assessment.difficulty}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded">
                      {assessment.category}
                    </span>
                    {assessment.userScore && (
                      <span className="flex items-center gap-0.5 text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                        <CheckCircle2 className="w-3 h-3" /> Completed
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{assessment.title}</h3>
                </div>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed">{assessment.description}</p>

              {/* Stats Row */}
              <div className="flex items-center gap-5 text-xs font-medium text-slate-600">
                <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5 text-slate-400" />{assessment.totalQuestions} Questions</span>
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-slate-400" />{assessment.timeLimit} mins</span>
                <span className="flex items-center gap-1.5"><Target className="w-3.5 h-3.5 text-slate-400" />{assessment.passingScore}% to pass</span>
              </div>

              {/* Score if completed */}
              {assessment.userScore && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-800">Your Score: {assessment.userScore}%</span>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(assessment.userScore / 20) ? 'text-amber-400 fill-current' : 'text-slate-300'}`} />
                    ))}
                  </div>
                </div>
              )}

              {/* Topics */}
              <div className="flex flex-wrap gap-1.5">
                {assessment.topics?.slice(0, 4).map(topic => (
                  <span key={topic} className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md font-medium">{topic}</span>
                ))}
              </div>

              {/* CTA */}
              <Link to={`/assessments/${assessment.id}`}>
                <Button variant={assessment.userScore ? 'outline' : 'primary'} size="sm" className="w-full" rightIcon={<ChevronRight className="w-4 h-4" />}>
                  {assessment.userScore ? 'Retake Assessment' : 'Start Assessment'}
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
