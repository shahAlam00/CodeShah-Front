import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Heart, Pin, Search, Plus } from 'lucide-react';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { fetchAllDiscussions, createDiscussion } from '../../api/discussionApi';

const CATEGORIES = ['All', 'General', 'DSA Help', 'Interview Exp', 'System Design', 'Career', 'Announcements'];

const timeAgo = (dateStr) => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
};

export const DiscussionsPage = () => {
  const [discussions, setDiscussions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('recent');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', category: 'General', content: '', tags: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchAllDiscussions()
      .then(res => setDiscussions((res.data.discussions || []).filter(d => !d.problemId)))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await createDiscussion(form);
      setDiscussions(prev => [res.data.discussion, ...prev]);
      setForm({ title: '', category: 'General', content: '', tags: '' });
      setShowModal(false);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const filtered = discussions.filter(d => {
    const matchSearch = !search || d.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'All' || d.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-5 pb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Community Discussions</h1>
          <p className="text-xs text-slate-500 mt-1">Ask questions, share solutions, and learn from peers</p>
        </div>
        <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />} onClick={() => setShowModal(true)}>
          New Discussion
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <Input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search discussions..."
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="px-3 py-2 text-xs font-semibold bg-white border border-slate-200 rounded-xl outline-none text-slate-600"
        >
          <option value="recent">Most Recent</option>
          <option value="popular">Most Popular</option>
          <option value="trending">Trending</option>
        </select>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              activeCategory === cat
                ? 'bg-brand-600 text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-brand-300 hover:text-brand-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Discussions List */}
      <div className="space-y-3">
        {loading ? (
          <div className="text-center py-12 text-slate-400 text-sm">Loading discussions...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            <MessageSquare className="w-10 h-10 mx-auto text-slate-300 mb-3" />
            <p className="font-semibold">No discussions found</p>
            <p className="text-xs mt-1">Try different keywords or categories</p>
          </div>
        ) : filtered.map(d => (
          <Link
            key={d._id}
            to={`/discussions/${d._id}`}
            className="block bg-white p-5 rounded-2xl border border-slate-200/80 shadow-soft-sm hover:border-brand-300 hover:shadow-soft-md transition-all group"
          >
            <div className="flex items-start gap-4">
              <img
                src={d.user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop'}
                alt={d.user?.fullName}
                className="w-9 h-9 rounded-full object-cover border border-slate-200 flex-shrink-0 mt-0.5"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-[10px] font-bold text-brand-700 bg-brand-50 border border-brand-200 px-1.5 py-0.5 rounded">
                    {d.category}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-2">
                  {d.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">{d.content}</p>

                {d.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {d.tags.slice(0, 4).map(tag => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-4 mt-3 text-[11px] text-slate-500 font-medium">
                  <span className="font-semibold text-slate-700">{d.user?.fullName}</span>
                  <span>{timeAgo(d.createdAt)}</span>
                  <span className="flex items-center gap-1"><Heart className="w-3 h-3" />{d.likes?.length || 0}</span>
                  <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" />{d.repliesCount || 0} replies</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* New Discussion Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Start a New Discussion"
        subtitle="Share your question or insight with the community"
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 mb-1 block">Title *</label>
            <input
              required
              value={form.title}
              onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
              placeholder="What's your question or topic?"
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 mb-1 block">Category *</label>
            <select
              value={form.category}
              onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            >
              {CATEGORIES.filter(c => c !== 'All').map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 mb-1 block">Content *</label>
            <textarea
              required
              rows={5}
              value={form.content}
              onChange={e => setForm(p => ({ ...p, content: e.target.value }))}
              placeholder="Describe your question or share your thoughts in detail..."
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 resize-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 mb-1 block">Tags <span className="text-slate-400 font-normal">(comma separated)</span></label>
            <input
              value={form.tags}
              onChange={e => setForm(p => ({ ...p, tags: e.target.value }))}
              placeholder="e.g. arrays, dp, interview"
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="ghost" size="sm" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button type="submit" variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />} disabled={submitting}>
              {submitting ? 'Posting...' : 'Post Discussion'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
