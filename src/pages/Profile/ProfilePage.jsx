import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Github, Linkedin, Globe, MapPin, Calendar, Trophy, Flame, Code2, Star } from 'lucide-react';
import { userStats } from '../../data/mockHeatmapData';
import { ActivityHeatmap } from '../../components/charts/ActivityHeatmap';
import { DifficultyDonutChart } from '../../components/charts/DifficultyDonutChart';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import api from '../../lib/axios';

export const ProfilePage = () => {
  const { username } = useParams();
  const { user: authUser, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const { data } = await api.get('/user/getuser');
        setProfile(data.user);
        setForm({
          fullName: data.user.fullName || '',
          username: data.user.username || '',
          location: data.user.location || '',
          bio: data.user.bio || '',
          githubUrl: data.user.githubUrl || '',
          linkedinUrl: data.user.linkedinUrl || '',
          website: data.user.website || '',
        });
      } catch (err) {
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const isOwnProfile = !username || username === profile?.username;

  const handleSave = async () => {
    setSaving(true);
    try {
      const { data } = await api.put('/user/profileupdate', form);
      setProfile(data.user);
      updateUser({ name: data.user.fullName, username: data.user.username });
      setEditing(false);
    } catch (err) {
      // handle error silently
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center py-20 text-slate-500">Loading...</div>;
  }

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500 gap-3">
        <p className="text-lg font-bold">User not found</p>
        <Link to="/leaderboard" className="text-brand-600 hover:underline text-sm font-semibold">← Back to Leaderboard</Link>
      </div>
    );
  }

  const tabs = ['overview', 'submissions', 'badges', 'topics'];

  return (
    <div className="space-y-6 pb-6 max-w-5xl mx-auto">
      {/* Profile Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft-sm overflow-hidden">
        {/* Banner */}
        <div className="h-28 bg-gradient-to-r from-brand-600 via-sky-500 to-indigo-500" />

        <div className="px-6 pb-6">
          {/* Avatar row */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-12 mb-5">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-24 h-24 rounded-2xl border-4 border-white shadow-soft-md object-cover"
            />
            {isOwnProfile && !editing && (
              <Button variant="outline" size="sm" onClick={() => setEditing(true)}>Edit Profile</Button>
            )}
            {isOwnProfile && editing && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setEditing(false)}>Cancel</Button>
                <Button size="sm" onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Save'}</Button>
              </div>
            )}
          </div>

          {/* Name & bio */}
          <div className="space-y-1 mb-4">
            {editing ? (
              <div className="space-y-2">
                <input className="border border-slate-300 rounded-lg px-3 py-1.5 text-sm w-full" placeholder="Full Name" value={form.fullName} onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))} />
                <input className="border border-slate-300 rounded-lg px-3 py-1.5 text-sm w-full" placeholder="Username" value={form.username} onChange={e => setForm(f => ({ ...f, username: e.target.value }))} />
                <input className="border border-slate-300 rounded-lg px-3 py-1.5 text-sm w-full" placeholder="Bio" value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} />
                <input className="border border-slate-300 rounded-lg px-3 py-1.5 text-sm w-full" placeholder="Location" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} />
                <input className="border border-slate-300 rounded-lg px-3 py-1.5 text-sm w-full" placeholder="GitHub URL" value={form.githubUrl} onChange={e => setForm(f => ({ ...f, githubUrl: e.target.value }))} />
                <input className="border border-slate-300 rounded-lg px-3 py-1.5 text-sm w-full" placeholder="LinkedIn URL" value={form.linkedinUrl} onChange={e => setForm(f => ({ ...f, linkedinUrl: e.target.value }))} />
                <input className="border border-slate-300 rounded-lg px-3 py-1.5 text-sm w-full" placeholder="Website" value={form.website} onChange={e => setForm(f => ({ ...f, website: e.target.value }))} />
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-xl font-black text-slate-900">{profile.fullName || profile.name}</h1>
                  <span className="text-xs font-bold px-2.5 py-0.5 bg-amber-100 text-amber-800 border border-amber-200 rounded-lg">⚔️ Knight</span>
                </div>
                <p className="text-xs text-slate-500 font-medium">@{profile.username}</p>
                {profile.bio && <p className="text-sm text-slate-500 max-w-xl">{profile.bio}</p>}
              </>
            )}
          </div>

          {/* Links row */}
          {!editing && (
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mb-5">
            {profile.location && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{profile.location}</span>}
            {profile.createdAt && <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />Joined {new Date(profile.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>}
            {profile.githubUrl && <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-brand-600 hover:text-brand-700 font-semibold"><Github className="w-3.5 h-3.5" />GitHub</a>}
            {profile.linkedinUrl && <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-brand-600 hover:text-brand-700 font-semibold"><Linkedin className="w-3.5 h-3.5" />LinkedIn</a>}
            {profile.website && <a href={profile.website} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-brand-600 hover:text-brand-700 font-semibold"><Globe className="w-3.5 h-3.5" />{profile.website.replace('https://', '')}</a>}
          </div>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Solved', value: profile.stats?.totalSolved ?? userStats.stats.totalSolved, icon: <Code2 className="w-4 h-4 text-brand-500" />, color: 'brand' },
              { label: 'Current Streak', value: `${profile.stats?.currentStreak ?? userStats.stats.currentStreak}d 🔥`, icon: <Flame className="w-4 h-4 text-amber-500" />, color: 'amber' },
              { label: 'Contest Rating', value: profile.stats?.contestRating ?? userStats.stats.contestRating, icon: <Star className="w-4 h-4 text-purple-500" />, color: 'purple' },
              { label: 'Global Rank', value: `#${(profile.stats?.globalRank ?? userStats.stats.globalRank)?.toLocaleString()}`, icon: <Trophy className="w-4 h-4 text-emerald-500" />, color: 'emerald' },
            ].map(({ label, value, icon, color }) => (
              <div key={label} className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-center">
                <div className="flex justify-center mb-1">{icon}</div>
                <p className="text-base font-black text-slate-900">{value}</p>
                <p className="text-[10px] text-slate-500 font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
        {tabs.map(t => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`flex-1 py-2 rounded-lg text-xs font-bold capitalize transition-colors ${
              activeTab === t ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6">
          <ActivityHeatmap currentStreak={userStats.stats.currentStreak} longestStreak={userStats.stats.longestStreak} />
          <DifficultyDonutChart
            easy={userStats.stats.easy}
            medium={userStats.stats.medium}
            hard={userStats.stats.hard}
          />
        </div>
      )}

      {activeTab === 'badges' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft-sm p-6">
          <h3 className="text-base font-bold text-slate-900 mb-4">Earned Badges</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {profile.badges?.map(badge => (
              <div key={badge.id} className="flex flex-col items-center text-center p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-brand-300 hover:bg-brand-50/30 transition-all">
                <div className="text-3xl mb-2">{badge.icon}</div>
                <p className="text-xs font-bold text-slate-800">{badge.name}</p>
                <p className="text-[10px] text-slate-500 mt-1 leading-snug">{badge.description}</p>
                <p className="text-[10px] text-slate-400 mt-2 font-medium">{badge.date}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'topics' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft-sm p-6">
          <h3 className="text-base font-bold text-slate-900 mb-4">Topic Progress</h3>
          <div className="space-y-3">
            {profile.topicProgress?.map(item => (
              <div key={item.topic} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-700">{item.topic}</span>
                  <span className="text-slate-500">{item.solved}/{item.total}</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      item.percentage >= 75 ? 'bg-emerald-500'
                      : item.percentage >= 50 ? 'bg-brand-500'
                      : 'bg-amber-500'
                    }`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'submissions' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900">Recent Submissions</h3>
          </div>
          <div className="divide-y divide-slate-100">
            {[
              { title: 'Two Sum', status: 'Accepted', lang: 'JavaScript', runtime: '52ms', time: '2 hours ago', difficulty: 'Easy' },
              { title: 'Longest Substring Without Repeating Characters', status: 'Accepted', lang: 'Python', runtime: '78ms', time: '5 hours ago', difficulty: 'Medium' },
              { title: 'Merge K Sorted Lists', status: 'Wrong Answer', lang: 'JavaScript', runtime: '—', time: 'Yesterday', difficulty: 'Hard' },
              { title: 'Number of Islands', status: 'Accepted', lang: 'JavaScript', runtime: '84ms', time: 'Yesterday', difficulty: 'Medium' },
              { title: 'Coin Change', status: 'Time Limit Exceeded', lang: 'JavaScript', runtime: '—', time: '2 days ago', difficulty: 'Medium' },
              { title: 'Valid Parentheses', status: 'Accepted', lang: 'TypeScript', runtime: '45ms', time: '3 days ago', difficulty: 'Easy' },
            ].map((sub, i) => (
              <div key={i} className="px-6 py-3.5 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-1.5 h-6 rounded-full flex-shrink-0 ${
                    sub.status === 'Accepted' ? 'bg-emerald-400' : 'bg-rose-400'
                  }`} />
                  <div className="min-w-0">
                    <Link to={`/problems/${sub.title.toLowerCase().replace(/ /g, '-')}`} className="text-sm font-semibold text-slate-800 hover:text-brand-600 transition-colors truncate block">{sub.title}</Link>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Badge size="xs">{sub.difficulty}</Badge>
                      <span className="text-[10px] text-slate-400">{sub.lang}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className={`text-xs font-bold ${sub.status === 'Accepted' ? 'text-emerald-600' : 'text-rose-500'}`}>{sub.status}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{sub.runtime} · {sub.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
