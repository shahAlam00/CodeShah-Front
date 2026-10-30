import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Clock, Users, Calendar, Zap, ArrowRight, Lock, CheckCircle2 } from 'lucide-react';
import { mockContests } from '../../data/mockContests';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

export const ContestsPage = () => {
  const statusColors = {
    'Active': 'bg-emerald-100 text-emerald-800 border-emerald-300',
    'Upcoming': 'bg-amber-100 text-amber-800 border-amber-300',
    'Past': 'bg-slate-100 text-slate-600 border-slate-300',
  };

  return (
    <div className="space-y-6 pb-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Coding Contests</h1>
        <p className="text-xs text-slate-500 mt-1">Compete in weekly and championship challenges to boost your global ranking</p>
      </div>

      <div className="grid gap-5">
        {mockContests.map((contest) => (
          <div key={contest.id} className={`bg-white rounded-2xl border shadow-soft-sm overflow-hidden transition-all hover:shadow-soft-md ${
            contest.status === 'Active' ? 'border-emerald-300 ring-1 ring-emerald-200' : 'border-slate-200/80'
          }`}>
            <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-bold text-slate-900">{contest.title}</h3>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-md border ${statusColors[contest.status]}`}>
                    {contest.status === 'Active' ? '🔴 LIVE' : contest.status}
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 bg-purple-50 text-purple-700 border border-purple-200 rounded-md">
                    {contest.type}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-5 text-xs text-slate-600 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {contest.startTime}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {contest.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    {contest.participants.toLocaleString()} participants
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5 text-amber-500" />
                    {contest.prizePool}
                  </span>
                </div>

                {/* Problems preview */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {contest.problems?.slice(0, 3).map((p) => (
                    <span key={p.id} className="text-[11px] px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-600">
                      {p.title.length > 30 ? p.title.substring(0, 30) + '...' : p.title}
                      <span className={`ml-1.5 font-bold ${
                        p.difficulty === 'Easy' ? 'text-emerald-600'
                        : p.difficulty === 'Medium' ? 'text-amber-600'
                        : 'text-rose-600'
                      }`}>({p.points}pts)</span>
                    </span>
                  ))}
                  {contest.problems?.length > 3 && (
                    <span className="text-[11px] px-2 py-1 text-slate-400">+{contest.problems.length - 3} more</span>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                {contest.userRank && (
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Your Rank</p>
                    <p className="text-xl font-black text-slate-900">#{contest.userRank}</p>
                  </div>
                )}
                <Link to={`/contests/${contest.id}`}>
                  <Button
                    variant={contest.status === 'Active' ? 'primary' : 'secondary'}
                    size="sm"
                    rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                  >
                    {contest.status === 'Active' ? 'Join Now' : contest.status === 'Upcoming' ? 'Register' : 'View Results'}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
