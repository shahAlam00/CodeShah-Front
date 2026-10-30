import React, { useState } from 'react';
import { Trophy, Medal, Crown, ChevronUp, ChevronDown, Minus, Globe, GraduationCap, Building2 } from 'lucide-react';
import { mockLeaderboard } from '../../data/mockLeaderboard';
import { Tabs } from '../../components/common/Tabs';
import { Link } from 'react-router-dom';

export const LeaderboardPage = () => {
  const [activeTab, setActiveTab] = useState('global');

  const tabs = [
    { id: 'global', label: 'Global', icon: <Globe className="w-3.5 h-3.5" /> },
    { id: 'weekly', label: 'Weekly', icon: <Trophy className="w-3.5 h-3.5" /> },
    { id: 'college', label: 'College', icon: <GraduationCap className="w-3.5 h-3.5" /> },
  ];

  const getRankIcon = (rank) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-amber-400" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-slate-400" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-orange-400" />;
    return <span className="text-sm font-black text-slate-500">#{rank}</span>;
  };

  const getTrendIcon = (change) => {
    if (change > 0) return <span className="flex items-center gap-0.5 text-emerald-600 text-[11px] font-bold"><ChevronUp className="w-3 h-3" />{change}</span>;
    if (change < 0) return <span className="flex items-center gap-0.5 text-rose-500 text-[11px] font-bold"><ChevronDown className="w-3 h-3" />{Math.abs(change)}</span>;
    return <Minus className="w-3 h-3 text-slate-400" />;
  };

  const topThree = mockLeaderboard.slice(0, 3);
  const rest = mockLeaderboard.slice(3);

  return (
    <div className="space-y-6 pb-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Leaderboard</h1>
        <p className="text-xs text-slate-500 mt-1">Top coders ranked by problems solved, contest rating, and streaks</p>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-4 pb-2">
        {[topThree[1], topThree[0], topThree[2]].map((user, idx) => {
          const podiumRank = [2, 1, 3][idx];
          const podiumHeight = ['h-24', 'h-32', 'h-20'][idx];
          return (
            <div key={user?.rank} className="flex flex-col items-center gap-2">
              <img
                src={user?.avatar}
                alt={user?.name}
                className={`rounded-full border-4 object-cover ${
                  podiumRank === 1 ? 'w-16 h-16 border-amber-400' :
                  podiumRank === 2 ? 'w-12 h-12 border-slate-400' :
                  'w-11 h-11 border-orange-400'
                }`}
              />
              <p className="text-xs font-bold text-slate-800 text-center leading-tight">{user?.name}</p>
              <p className="text-[11px] text-slate-400 font-medium">{user?.rating?.toLocaleString()} pts</p>
              <div className={`w-full ${podiumHeight} rounded-t-xl flex flex-col items-center justify-center ${
                podiumRank === 1 ? 'bg-gradient-to-b from-amber-400 to-amber-500'
                : podiumRank === 2 ? 'bg-gradient-to-b from-slate-300 to-slate-400'
                : 'bg-gradient-to-b from-orange-300 to-orange-400'
              }`}>
                <Crown className={`w-5 h-5 text-white/80 ${podiumRank !== 1 ? 'opacity-0' : ''}`} />
                <span className="text-xl font-black text-white">#{podiumRank}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Rest of the Leaderboard */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft-sm overflow-hidden">
        <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-slate-50 border-b border-slate-200/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
          <div className="col-span-1 text-center">Rank</div>
          <div className="col-span-4">User</div>
          <div className="col-span-2 text-center">Solved</div>
          <div className="col-span-2 text-center">Rating</div>
          <div className="col-span-2 text-center">Streak</div>
          <div className="col-span-1 text-center">Change</div>
        </div>

        <div className="divide-y divide-slate-100">
          {mockLeaderboard.map((user) => (
            <Link
              key={user.rank}
              to={`/profile/${user.username}`}
              className={`grid grid-cols-12 gap-4 px-6 py-3.5 hover:bg-slate-50 transition-colors items-center ${
                user.username === 'shah' ? 'bg-brand-50/50' : ''
              }`}
            >
              <div className="col-span-1 flex justify-center">
                {getRankIcon(user.rank)}
              </div>
              <div className="col-span-4 flex items-center gap-3">
                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full border border-slate-200 object-cover flex-shrink-0" />
                <div className="min-w-0">
                  <p className={`text-sm font-bold truncate ${user.username === 'shah' ? 'text-brand-700' : 'text-slate-800'}`}>
                    {user.name}
                    {user.username === 'shah' && <span className="ml-1.5 text-[10px] font-bold bg-brand-100 text-brand-700 px-1 rounded">You</span>}
                  </p>
                  <p className="text-[11px] text-slate-400 truncate">@{user.username} · {user.country}</p>
                </div>
              </div>
              <div className="col-span-2 text-center text-sm font-bold text-slate-700">{user.solved.toLocaleString()}</div>
              <div className="col-span-2 text-center">
                <span className="text-sm font-black text-brand-600">{user.rating.toLocaleString()}</span>
              </div>
              <div className="col-span-2 text-center text-xs font-semibold text-slate-600">
                🔥 {user.streak} days
              </div>
              <div className="col-span-1 flex justify-center">
                {getTrendIcon(user.rankChange)}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
