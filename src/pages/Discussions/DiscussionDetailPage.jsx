import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, MessageSquare, Share2, Bookmark, Send, ThumbsUp } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { fetchDiscussionById } from '../../api/discussionApi';

const timeAgo = (dateStr) => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
};

export const DiscussionDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { success } = useToast();
  const [discussion, setDiscussion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState('');
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    fetchDiscussionById(id)
      .then(res => setDiscussion(res.data.discussion))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="text-center py-20 text-slate-400 text-sm">Loading discussion...</div>;
  }

  if (!discussion) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500 gap-3">
        <MessageSquare className="w-10 h-10 text-slate-300" />
        <p className="text-lg font-bold">Discussion not found</p>
        <Link to="/discussions" className="text-brand-600 hover:underline text-sm font-semibold">← Back to Discussions</Link>
      </div>
    );
  }

  const handleReply = () => {
    if (!replyText.trim()) return;
    success('Reply posted!');
    setReplyText('');
  };

  const likesCount = discussion.likes?.length || 0;

  return (
    <div className="max-w-3xl mx-auto space-y-5 pb-6">
      <Link to="/discussions" className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-brand-600">
        <ArrowLeft className="w-4 h-4" /> All Discussions
      </Link>

      {/* Main Post */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft-sm p-6 space-y-4">
        {/* Category + Tags */}
        <div className="flex flex-wrap gap-2">
          <span className="text-[10px] font-bold text-brand-700 bg-brand-50 border border-brand-200 px-2 py-0.5 rounded">
            {discussion.category}
          </span>
          {discussion.tags?.map(tag => (
            <span key={tag} className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md font-medium">#{tag}</span>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-xl font-black text-slate-900 leading-tight">{discussion.title}</h1>

        {/* Author */}
        <div className="flex items-center gap-3">
          <img
            src={discussion.user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop'}
            alt={discussion.user?.fullName}
            className="w-9 h-9 rounded-full object-cover border border-slate-200"
          />
          <div>
            <p className="text-sm font-bold text-slate-800">{discussion.user?.fullName}</p>
            <p className="text-[11px] text-slate-400">@{discussion.user?.username} · {timeAgo(discussion.createdAt)}</p>
          </div>
        </div>

        {/* Content */}
        <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
          {discussion.content}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 pt-2 border-t border-slate-100">
          <button
            onClick={() => { setLiked(!liked); if (!liked) success('Post liked!'); }}
            className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${liked ? 'text-rose-500' : 'text-slate-500 hover:text-rose-500'}`}
          >
            <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
            {likesCount + (liked ? 1 : 0)}
          </button>
          <button className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-brand-500 transition-colors">
            <MessageSquare className="w-4 h-4" />
            {discussion.repliesCount || 0} replies
          </button>
          <button onClick={() => success('Link copied!')} className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-brand-500 transition-colors">
            <Share2 className="w-4 h-4" />
            Share
          </button>
          <button className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-amber-500 transition-colors ml-auto">
            <Bookmark className="w-4 h-4" />
            Save
          </button>
        </div>
      </div>

      {/* No comments section - backend me comments model nahi hai abhi */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="text-sm font-bold text-slate-900">0 Replies</h2>
        </div>
        <div className="p-8 text-center text-slate-500">
          <MessageSquare className="w-8 h-8 mx-auto text-slate-300 mb-2" />
          <p className="text-sm font-semibold">No replies yet</p>
          <p className="text-xs mt-1">Be the first to share your thoughts!</p>
        </div>
      </div>

      {/* Reply Box */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft-sm p-5">
        <div className="flex gap-3">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop'}
            alt="You"
            className="w-8 h-8 rounded-full object-cover border border-slate-200 flex-shrink-0"
          />
          <div className="flex-1 space-y-3">
            <textarea
              value={replyText}
              onChange={e => setReplyText(e.target.value)}
              placeholder="Add a thoughtful reply..."
              rows={3}
              className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400 resize-none transition-all placeholder-slate-400 text-slate-800"
            />
            <div className="flex justify-end">
              <Button
                variant="primary"
                size="sm"
                onClick={handleReply}
                rightIcon={<Send className="w-3.5 h-3.5" />}
                disabled={!replyText.trim()}
              >
                Post Reply
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
