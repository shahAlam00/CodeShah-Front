import React, { useState, useEffect } from 'react';
import { ThumbsUp, Send, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import api from '../../lib/axios';

export const DiscussionTab = ({ problemTitle, problemId }) => {
  const { user } = useAuth();
  const { success, error: showError } = useToast();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('latest');
  const [commentText, setCommentText] = useState('');
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    if (!problemId) { setLoading(false); return; }
    api.get(`/discussions/problem/${problemId}`)
      .then(({ data }) => { if (data.success) setPosts(data.discussions || []); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [problemId]);

  const sorted = [...posts].sort((a, b) =>
    sortBy === 'popular'
      ? (b.likes?.length || 0) - (a.likes?.length || 0)
      : new Date(b.createdAt) - new Date(a.createdAt)
  );

  const handleUpvote = (id) => {
    setPosts(prev => prev.map(p => {
      if (p._id !== id) return p;
      const alreadyLiked = p.likes?.includes(user?._id);
      return {
        ...p,
        likes: alreadyLiked
          ? p.likes.filter(uid => uid !== user?._id)
          : [...(p.likes || []), user?._id],
      };
    }));
  };

  const handlePost = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    if (!user) { showError('Please login to post a comment.'); return; }
    setPosting(true);
    try {
      const { data } = await api.post('/discussions/create', {
        title: `Re: ${problemTitle || 'Problem'}`,
        category: 'Problem Discussion',
        content: commentText.trim(),
        problemId,
      });
      if (data.success) {
        setPosts(prev => [data.discussion, ...prev]);
        setCommentText('');
        success('Comment posted!');
      }
    } catch (err) {
      showError(err.response?.data?.message || 'Failed to post comment.');
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className="p-5 lg:p-6 text-slate-800 space-y-4 text-sm overflow-y-auto max-h-full">
      {/* Header & Sort */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-slate-900">
          Community Discussion
          {!loading && <span className="ml-2 text-xs font-normal text-slate-400">{posts.length} posts</span>}
        </h3>
        <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-xs font-semibold">
          {['latest', 'popular'].map(s => (
            <button
              key={s}
              onClick={() => setSortBy(s)}
              className={`px-2.5 py-1 rounded-md transition-colors capitalize ${sortBy === s ? 'bg-white text-brand-700 shadow-xs' : 'text-slate-600'}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Post input */}
      <form onSubmit={handlePost} className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 space-y-2">
        <textarea
          rows={2}
          value={commentText}
          onChange={e => setCommentText(e.target.value)}
          placeholder={`Share your insight or approach for ${problemTitle || 'this problem'}...`}
          className="w-full bg-white p-2.5 rounded-lg border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 resize-none"
        />
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-slate-400">Markdown supported</span>
          <button
            type="submit"
            disabled={!commentText.trim() || posting}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-600 hover:bg-brand-700 disabled:opacity-40 text-white rounded-lg text-xs font-semibold transition-colors"
          >
            <Send className="w-3 h-3" />
            {posting ? 'Posting...' : 'Post'}
          </button>
        </div>
      </form>

      {/* Posts list */}
      {loading ? (
        <div className="text-center text-xs text-slate-400 py-6">Loading discussions...</div>
      ) : sorted.length === 0 ? (
        <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200">
          <Clock className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-700">No discussions yet</p>
          <p className="text-xs text-slate-400 mt-0.5">Be the first to share your approach!</p>
        </div>
      ) : (
        <div className="space-y-3 pt-1">
          {sorted.map(post => {
            const author = post.user;
            const likeCount = post.likes?.length || 0;
            const liked = post.likes?.includes(user?._id);
            return (
              <div key={post._id} className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-soft-sm space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {author?.avatar ? (
                      <img src={author.avatar} alt={author.fullName} className="w-7 h-7 rounded-full object-cover" />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 text-xs font-bold">
                        {author?.fullName?.[0] || '?'}
                      </div>
                    )}
                    <div>
                      <span className="text-xs font-bold text-slate-800">{author?.fullName || 'Anonymous'}</span>
                      <span className="text-[11px] text-slate-400 ml-1.5">
                        @{author?.username || 'user'} • {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleUpvote(post._id)}
                    className={`flex items-center gap-1 px-2 py-0.5 rounded-md border text-xs font-semibold transition-colors ${liked ? 'bg-brand-50 border-brand-300 text-brand-700' : 'bg-slate-50 border-slate-200 text-slate-600'}`}
                  >
                    <ThumbsUp className={`w-3 h-3 ${liked ? 'fill-brand-600' : ''}`} />
                    <span>{likeCount}</span>
                  </button>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">{post.content}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
