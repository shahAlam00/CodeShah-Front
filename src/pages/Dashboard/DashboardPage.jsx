import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Code2, Flame, Trophy, Star, ArrowRight, CheckCircle2,
  Calendar, Zap, TrendingUp, Play, BookOpen, Medal
} from 'lucide-react';
import { StatCard } from '../../components/cards/StatCard';
import { ActivityHeatmap } from '../../components/charts/ActivityHeatmap';
import { DifficultyDonutChart } from '../../components/charts/DifficultyDonutChart';
import { TopicRadarChart } from '../../components/charts/TopicRadarChart';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { useProgress } from '../../context/ProgressContext';
import { mockContests } from '../../data/mockContests';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const solvedOverTime = [
  { month: 'Mar', solved: 28 },
  { month: 'Apr', solved: 45 },
  { month: 'May', solved: 62 },
  { month: 'Jun', solved: 38 },
  { month: 'Jul', solved: 71 },
  { month: 'Aug', solved: 84 },
  { month: 'Sep', solved: 52 },
];

export const DashboardPage = () => {
  const { user } = useAuth();
  const { solvedIds, solvedDates, streak, longestStreak, submissions } = useProgress();
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 17) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  const firstName = user?.name?.split(' ')[0] || 'Coder';
  const upcomingContest = mockContests.find(c => c.status === 'Upcoming');
  const recentSubmissions = submissions.slice(0, 5);

  // Build monthly bar chart from solvedDates
  const solvedOverTime = (() => {
    const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const counts = {};
    Object.entries(solvedDates).forEach(([date, count]) => {
      const m = monthNames[new Date(date).getMonth()];
      counts[m] = (counts[m] || 0) + count;
    });
    return monthNames.filter(m => counts[m]).map(m => ({ month: m, solved: counts[m] }));
  })();

  const totalSolved = solvedIds.length;

  return (
    <div className="space-y-6 pb-6">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-gradient-to-r from-brand-600 to-sky-500 rounded-2xl text-white shadow-md">
        <div>
          <p className="text-brand-100 text-sm font-medium">{greeting}, {firstName} 👋</p>
          <h1 className="text-2xl font-black tracking-tight mt-0.5">Ready to solve your next challenge?</h1>
          <p className="text-brand-100 text-xs mt-1">You've maintained a <strong className="text-white">{streak}-day streak</strong>. Keep it alive today!</p>
        </div>
        <Link to="/problems">
          <Button variant="dark" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
            Daily Problem
          </Button>
        </Link>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Problems Solved"
          value={totalSolved.toLocaleString()}
          subtitle={`keep going!`}
          icon={<Code2 className="w-5 h-5" />}
          color="brand"
          trend={`+${solvedIds.length} total`}
          trendPositive
        />
        <StatCard
          title="Current Streak"
          value={`${streak} Days`}
          subtitle={`Longest: ${longestStreak} days`}
          icon={<Flame className="w-5 h-5" />}
          color="amber"
          trend={streak > 0 ? '🔥 On fire!' : 'Start today!'}
          trendPositive={streak > 0}
        />
        <StatCard
          title="Global Rank"
          value={`—`}
          subtitle="Coming soon"
          icon={<Trophy className="w-5 h-5" />}
          color="purple"
          trend=""
          trendPositive
        />
        <StatCard
          title="Contest Rating"
          value={`—`}
          subtitle="Coming soon"
          icon={<Star className="w-5 h-5" />}
          color="emerald"
          trend=""
          trendPositive
        />
      </div>

      {/* Activity Heatmap */}
      <ActivityHeatmap
        currentStreak={streak}
        longestStreak={longestStreak}
        solvedDates={solvedDates}
      />

      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DifficultyDonutChart
          easy={{ solved: 0, total: 0 }}
          medium={{ solved: 0, total: 0 }}
          hard={{ solved: 0, total: 0 }}
        />

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft-sm">
          <h3 className="text-base font-bold text-slate-900 mb-1">Problems Solved Over Time</h3>
          <p className="text-xs text-slate-500 mb-4">Monthly activity trend</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={solvedOverTime} barSize={14}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: '0.5rem', border: '1px solid #e2e8f0', fontSize: '12px' }}
                formatter={(v) => [`${v} problems`, 'Solved']}
              />
              <Bar dataKey="solved" fill="#0284c7" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <TopicRadarChart />
      </div>

      {/* Recommended Problems + Upcoming Contest */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recommended Problems */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Recent Submissions</h3>
            <Link to="/problems" className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1">
              All Problems <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-2">
            {recentSubmissions.length === 0 ? (
              <div className="text-center py-8 text-slate-400">
                <Code2 className="w-8 h-8 mx-auto mb-2 opacity-40" />
                <p className="text-sm font-medium">No submissions yet</p>
                <p className="text-xs mt-1">Solve your first problem to see activity here</p>
              </div>
            ) : recentSubmissions.map((sub) => (
              <Link
                key={sub.id}
                to={`/problems/${sub.problemId}`}
                className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-brand-200 hover:bg-brand-50/30 transition-all group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    sub.status === 'Accepted' ? 'bg-emerald-50' : 'bg-rose-50'
                  }`}>
                    {sub.status === 'Accepted'
                      ? <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      : <div className="w-3.5 h-3.5 rounded-full border-2 border-rose-400" />}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-800 truncate group-hover:text-brand-600 transition-colors">
                      {sub.problemTitle}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{sub.language} · {sub.runtime}</p>
                  </div>
                </div>
                <span className={`text-xs font-bold flex-shrink-0 ml-2 ${
                  sub.status === 'Accepted' ? 'text-emerald-600' : 'text-rose-500'
                }`}>{sub.status === 'Accepted' ? 'AC' : 'WA'}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Upcoming Contest */}
        <div className="space-y-4">
          {upcomingContest && (
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-soft-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span>Upcoming Contest</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900">{upcomingContest.title}</h4>
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{upcomingContest.startTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-slate-400" />
                  <span>{upcomingContest.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-3.5 h-3.5 text-slate-400" />
                  <span>{upcomingContest.participants.toLocaleString()} registered</span>
                </div>
              </div>
              <Link to={`/contests/${upcomingContest.id}`}>
                <Button variant="secondary" size="sm" className="w-full">
                  View Contest
                </Button>
              </Link>
            </div>
          )}

          {/* Recent Submissions sidebar */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-soft-sm space-y-3">
            <h4 className="text-sm font-bold text-slate-900">Submission History</h4>
            <div className="space-y-2">
              {recentSubmissions.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-3">No submissions yet</p>
              ) : recentSubmissions.map((sub) => (
                <div key={sub.id} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    {sub.status === 'Accepted'
                      ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                      : <div className="w-3.5 h-3.5 rounded-full border-2 border-rose-400 flex-shrink-0" />
                    }
                    <span className="truncate text-slate-700 font-medium">{sub.problemTitle}</span>
                  </div>
                  <span className={`font-semibold flex-shrink-0 ml-2 ${sub.status === 'Accepted' ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {sub.status === 'Accepted' ? 'AC' : 'WA'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
