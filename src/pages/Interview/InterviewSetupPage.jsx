import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Zap, Settings, ChevronRight } from 'lucide-react';
import { mockInterviewTracks } from '../../data/mockInterviews';
import { Button } from '../../components/common/Button';

export const InterviewSetupPage = () => {
  const { trackId } = useParams();
  const navigate = useNavigate();
  const track = mockInterviewTracks.find(t => t.id === trackId) || mockInterviewTracks[0];

  const [duration, setDuration] = useState(track?.defaultDuration || 45);
  const [difficulty, setDifficulty] = useState(track?.difficulties[1] || 'Medium');
  const [language, setLanguage] = useState('JavaScript');

  const handleStart = () => {
    navigate(`/interview/room/${trackId}`, {
      state: { trackId, duration, difficulty, language }
    });
  };

  return (
    <div className="max-w-xl mx-auto py-10 space-y-6">
      <Link to="/interview" className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-brand-600">
        <ArrowLeft className="w-4 h-4" /> Interview Tracks
      </Link>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft-md p-8 space-y-6">
        {/* Header */}
        <div>
          <p className="text-[10px] font-bold text-brand-600 uppercase tracking-wider mb-1">{track.category}</p>
          <h1 className="text-2xl font-black text-slate-900">{track.title}</h1>
          <p className="text-sm text-slate-500 mt-1">{track.description}</p>
        </div>

        {/* Duration */}
        <div>
          <p className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />Session Duration</p>
          <div className="flex gap-2">
            {track.durationOptions.map(d => (
              <button
                key={d}
                onClick={() => setDuration(d)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-bold border transition-colors ${
                  duration === d ? 'bg-brand-600 text-white border-brand-600' : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-brand-300'
                }`}
              >
                {d} min
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty */}
        <div>
          <p className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5"><Zap className="w-3.5 h-3.5" />Difficulty</p>
          <div className="flex gap-2">
            {track.difficulties.map(d => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-bold border transition-colors ${
                  difficulty === d
                    ? d === 'Easy' ? 'bg-emerald-500 text-white border-emerald-500'
                      : d === 'Medium' ? 'bg-amber-500 text-white border-amber-500'
                      : 'bg-rose-500 text-white border-rose-500'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Language */}
        <div>
          <p className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5"><Settings className="w-3.5 h-3.5" />Coding Language</p>
          <div className="flex gap-2 flex-wrap">
            {['JavaScript', 'Python', 'Java', 'C++', 'TypeScript'].map(lang => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-colors ${
                  language === lang ? 'bg-brand-600 text-white border-brand-600' : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-brand-300'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1.5">
          <p className="font-bold text-slate-700 mb-2">Interview Summary</p>
          <p>🎯 Track: <span className="font-semibold text-slate-800">{track.title}</span></p>
          <p>⏱️ Duration: <span className="font-semibold text-slate-800">{duration} minutes</span></p>
          <p>📊 Difficulty: <span className="font-semibold text-slate-800">{difficulty}</span></p>
          <p>💻 Language: <span className="font-semibold text-slate-800">{language}</span></p>
        </div>

        <Button variant="primary" size="md" className="w-full" rightIcon={<ChevronRight className="w-4 h-4" />} onClick={handleStart}>
          Enter Interview Room
        </Button>
      </div>
    </div>
  );
};
