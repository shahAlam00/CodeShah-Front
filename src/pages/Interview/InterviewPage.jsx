import React from 'react';
import { Link } from 'react-router-dom';
import { mockInterviewTracks } from '../../data/mockInterviews';
import { Cpu, Layout, Server, Users, ChevronRight, Star, Clock, Zap, Bot } from 'lucide-react';
import { Button } from '../../components/common/Button';

const iconMap = { Cpu, Layout, Server, Users };

export const InterviewPage = () => {
  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-brand-900 to-navy-900 rounded-2xl p-8 text-white space-y-3">
        <div className="flex items-center gap-2 text-brand-300 text-xs font-bold uppercase tracking-wider">
          <Bot className="w-4 h-4" />
          <span>AI-Powered Mock Interviews</span>
        </div>
        <h1 className="text-3xl font-black tracking-tight">Practice with AI Interviewers</h1>
        <p className="text-white/70 text-sm max-w-xl">
          Real-time technical interviews with adaptive AI feedback, voice simulation, and detailed scorecards.
          Prepare for FAANG, startups, and everything in between.
        </p>
        <div className="flex flex-wrap gap-5 text-xs font-medium text-white/60">
          <span className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5 text-amber-400" />Realistic FAANG-style questions</span>
          <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-sky-400" />Instant AI feedback</span>
          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-emerald-400" />20, 45, 60-min sessions</span>
        </div>
      </div>

      {/* Interview Track Cards */}
      <div>
        <h2 className="text-base font-bold text-slate-900 mb-4">Choose Your Interview Track</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {mockInterviewTracks.map((track) => {
            const IconComp = iconMap[track.icon] || Cpu;
            return (
              <div key={track.id} className="bg-white rounded-2xl border border-slate-200/80 shadow-soft-sm hover:shadow-soft-md hover:border-brand-300 transition-all overflow-hidden group">
                <div className="p-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-brand-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <IconComp className="w-5 h-5 text-brand-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-purple-50 text-purple-700 border border-purple-200 rounded">
                          {track.category}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">{track.role}</span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-600 transition-colors">{track.title}</h3>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed">{track.description}</p>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-3 text-xs font-medium text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {track.durationOptions.join(', ')} mins
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-slate-400" />
                      {track.difficulties.join(' · ')}
                    </span>
                  </div>

                  {/* Sample Questions */}
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Sample Questions</p>
                    {track.suggestedQuestions.slice(0, 2).map(q => (
                      <p key={q.id} className="text-xs text-slate-600 flex items-start gap-1.5">
                        <span className="mt-0.5 w-1 h-1 rounded-full bg-brand-400 flex-shrink-0" />
                        {q.title}
                      </p>
                    ))}
                  </div>

                  <Link to={`/interview/setup/${track.id}`}>
                    <Button variant="primary" size="sm" className="w-full" rightIcon={<ChevronRight className="w-4 h-4" />}>
                      Start Interview
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Sessions */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft-sm p-6">
        <h3 className="text-sm font-bold text-slate-900 mb-4">Recent Practice Sessions</h3>
        <div className="space-y-3">
          {[
            { track: 'DSA & Algorithmic', score: 78, date: '3 days ago', duration: '45 min', passed: true },
            { track: 'Frontend Architecture', score: 85, date: '1 week ago', duration: '60 min', passed: true },
            { track: 'System Design', score: 62, date: '2 weeks ago', duration: '60 min', passed: false },
          ].map((session, i) => (
            <div key={i} className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 hover:border-brand-200 transition-colors">
              <div>
                <p className="text-sm font-semibold text-slate-800">{session.track}</p>
                <p className="text-xs text-slate-400 mt-0.5">{session.date} · {session.duration}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className={`text-sm font-black ${session.passed ? 'text-emerald-600' : 'text-amber-600'}`}>{session.score}%</p>
                  <p className="text-[10px] text-slate-400">{session.passed ? 'Passed' : 'Needs Work'}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
