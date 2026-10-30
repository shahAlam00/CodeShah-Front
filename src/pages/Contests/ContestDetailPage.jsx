import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Users, Trophy, Code2, ArrowRight, Calendar } from 'lucide-react';
import { mockContests } from '../../data/mockContests';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

export const ContestDetailPage = () => {
  const { id } = useParams();
  const contest = mockContests.find(c => c.id === id);

  if (!contest) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500 gap-3">
        <p className="text-lg font-bold">Contest not found</p>
        <Link to="/contests" className="text-brand-600 hover:underline text-sm font-semibold">← Back to Contests</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-6">
      <Link to="/contests" className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-brand-600">
        <ArrowLeft className="w-4 h-4" /> All Contests
      </Link>

      {/* Contest Hero */}
      <div className="bg-gradient-to-tr from-slate-900 via-brand-900 to-navy-900 p-8 rounded-2xl text-white">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className={`text-xs font-bold px-2 py-1 rounded-md border ${
                contest.status === 'Active' ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                : contest.status === 'Upcoming' ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                : 'bg-slate-500/20 border-slate-400 text-slate-300'
              }`}>
                {contest.status === 'Active' ? '🔴 LIVE NOW' : contest.status.toUpperCase()}
              </span>
              <span className="text-xs text-white/60 font-medium">{contest.type}</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight mb-2">{contest.title}</h1>
            <p className="text-white/70 text-sm max-w-xl">{contest.description}</p>
          </div>
          <div className="text-right space-y-1 flex-shrink-0">
            <p className="text-xs text-white/50">Prize Pool</p>
            <p className="text-2xl font-black text-amber-400">{contest.prizePool}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          {[
            { icon: Calendar, label: 'Start', value: contest.startTime },
            { icon: Clock, label: 'Duration', value: contest.duration },
            { icon: Users, label: 'Participants', value: contest.participants.toLocaleString() },
            { icon: Code2, label: 'Problems', value: contest.problems?.length || 4 },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
              <p className="text-[10px] text-white/50 uppercase tracking-wider">{label}</p>
              <div className="flex items-center gap-1.5 mt-1">
                <Icon className="w-3.5 h-3.5 text-white/60" />
                <p className="text-sm font-bold">{value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-3">
          <Button variant="primary" size="md" className="bg-white/90 text-slate-900 hover:bg-white">
            {contest.status === 'Active' ? 'Enter Contest' : contest.status === 'Upcoming' ? 'Register Now' : 'View Solutions'}
          </Button>
          <Button variant="outline" size="md" className="border-white/30 text-white hover:bg-white/10">
            Share
          </Button>
        </div>
      </div>

      {/* Problems List */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900">Contest Problems</h2>
        </div>
        <div className="divide-y divide-slate-100">
          {contest.problems?.map((problem, idx) => (
            <div key={problem.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <span className="text-sm font-black text-slate-400 w-6">{String.fromCharCode(65 + idx)}</span>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{problem.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge size="xs">{problem.difficulty}</Badge>
                    <span className="text-[10px] text-slate-400">{problem.points} points</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-[11px] text-slate-500">Acceptance</p>
                  <p className="text-xs font-bold text-slate-700">{problem.solvedBy || '—'}</p>
                </div>
                {contest.status !== 'Past' ? (
                  <Link to={`/problems/${problem.id}`}>
                    <Button variant="ghost" size="xs" rightIcon={<ArrowRight className="w-3 h-3" />}>
                      Solve
                    </Button>
                  </Link>
                ) : (
                  <Button variant="outline" size="xs">Solutions</Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leaderboard */}
      {contest.leaderboard && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900">Top Performers</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {contest.leaderboard.slice(0, 5).map((entry, idx) => (
              <div key={entry.username} className={`px-6 py-3 flex items-center gap-4 ${idx === 0 ? 'bg-amber-50' : ''}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 ${
                  idx === 0 ? 'bg-amber-400 text-white' : idx === 1 ? 'bg-slate-400 text-white' : idx === 2 ? 'bg-orange-400 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {idx + 1}
                </div>
                <img src={entry.avatar} alt={entry.name} className="w-7 h-7 rounded-full border border-slate-200" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-800 truncate">{entry.name}</p>
                  <p className="text-[11px] text-slate-400">@{entry.username}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-slate-900">{entry.score}</p>
                  <p className="text-[10px] text-slate-400">pts</p>
                </div>
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-slate-700">{entry.time}</p>
                  <p className="text-[10px] text-slate-400">time</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
