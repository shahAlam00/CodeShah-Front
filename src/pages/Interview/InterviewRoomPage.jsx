import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { Clock, Mic, MicOff, Video, VideoOff, MessageSquare, Phone, ChevronRight } from 'lucide-react';
import { InterviewerAvatar } from '../../components/interview/InterviewerAvatar';
import { AudioWaveSimulator } from '../../components/interview/AudioWaveSimulator';
import { InterviewReportModal } from '../../components/interview/InterviewReportModal';
import { mockInterviewTracks, mockInterviewFeedbackSample } from '../../data/mockInterviews';
import { Button } from '../../components/common/Button';
import { useSettings } from '../../context/SettingsContext';

const QUESTION_PROMPT = `/**
 * Problem: Longest Substring Without Repeating Characters
 *
 * Given a string s, find the length of the longest substring
 * without repeating characters.
 *
 * Example 1:
 *   Input: s = "abcabcbb"
 *   Output: 3  (The answer is "abc")
 *
 * Example 2:
 *   Input: s = "bbbbb"
 *   Output: 1  (The answer is "b")
 *
 * Constraints:
 *   0 <= s.length <= 5 * 10^4
 *   s consists of English letters, digits, symbols and spaces.
 */

/**
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstring(s) {
  // Write your solution here

}
`;

const INTERVIEWER_MESSAGES = [
  { delay: 1000, text: "Hello! I'm your AI interviewer today. Let's get started with a string problem. Take a moment to read it carefully." },
  { delay: 8000, text: "Before you write any code, could you walk me through your high-level approach?" },
  { delay: 25000, text: "What data structure are you thinking of using to track seen characters?" },
  { delay: 55000, text: "Good progress! Can you think about the time and space complexity of your solution?" },
  { delay: 90000, text: "Great! What are some edge cases you should validate? Empty strings, single characters?" },
];

export const InterviewRoomPage = () => {
  const { trackId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { editorSettings } = useSettings();

  const config = location.state || { duration: 45, difficulty: 'Medium', language: 'JavaScript' };
  const track = mockInterviewTracks.find(t => t.id === trackId) || mockInterviewTracks[0];

  const [timeLeft, setTimeLeft] = useState((config.duration || 45) * 60);
  const [code, setCode] = useState(QUESTION_PROMPT);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCamOn, setIsCamOn] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(INTERVIEWER_MESSAGES[0].text);
  const [showReport, setShowReport] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'interviewer', text: INTERVIEWER_MESSAGES[0].text, time: 'Just now' }
  ]);
  const timerRef = useRef(null);
  const messageIdxRef = useRef(1);

  useEffect(() => {
    timerRef.current = setInterval(() => setTimeLeft(t => Math.max(0, t - 1)), 1000);

    INTERVIEWER_MESSAGES.slice(1).forEach((msg) => {
      setTimeout(() => {
        setIsSpeaking(true);
        setCurrentMessage(msg.text);
        setChatMessages(prev => [...prev, { role: 'interviewer', text: msg.text, time: 'Just now' }]);
        setTimeout(() => setIsSpeaking(false), 3500);
      }, msg.delay);
    });

    return () => clearInterval(timerRef.current);
  }, []);

  const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const handleEndInterview = () => {
    clearInterval(timerRef.current);
    setShowReport(true);
  };

  const progressPct = 1 - timeLeft / ((config.duration || 45) * 60);

  return (
    <div className="flex flex-col h-screen bg-slate-900 overflow-hidden">
      {/* Top Bar */}
      <div className="h-12 bg-slate-800 border-b border-slate-700 flex items-center justify-between px-5 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-white text-xs font-bold">{track.title}</span>
          <span className="text-slate-400 text-xs">· {config.difficulty}</span>
        </div>

        {/* Timer */}
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-sm font-black ${
            timeLeft < 120 ? 'bg-rose-900/50 text-rose-300 animate-pulse' : 'bg-slate-700 text-white'
          }`}>
            <Clock className="w-3.5 h-3.5" />
            {formatTime(timeLeft)}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMicOn(!isMicOn)}
            className={`p-2 rounded-lg transition-colors ${isMicOn ? 'bg-slate-700 text-slate-200 hover:bg-slate-600' : 'bg-rose-900 text-rose-300'}`}
          >
            {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setIsCamOn(!isCamOn)}
            className={`p-2 rounded-lg transition-colors ${isCamOn ? 'bg-slate-700 text-slate-200 hover:bg-slate-600' : 'bg-rose-900 text-rose-300'}`}
          >
            {isCamOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
          </button>
          <button
            onClick={handleEndInterview}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            End Session
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-0.5 bg-slate-700">
        <div className="h-full bg-brand-500 transition-all duration-1000" style={{ width: `${progressPct * 100}%` }} />
      </div>

      {/* Main Area */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Left: Interviewer Panel */}
        <div className="w-72 flex-shrink-0 bg-slate-800 border-r border-slate-700 flex flex-col">
          {/* Avatar Section */}
          <div className="p-4 border-b border-slate-700">
            <InterviewerAvatar isSpeaking={isSpeaking} />
            <div className="mt-3 space-y-1">
              <p className="text-white text-sm font-bold">Sarah Chen</p>
              <p className="text-slate-400 text-xs">AI Technical Interviewer</p>
            </div>
            {isMicOn && <div className="mt-3"><AudioWaveSimulator isActive={isSpeaking} /></div>}
          </div>

          {/* Current Question */}
          <div className="p-4 border-b border-slate-700">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Current Message</p>
            <p className="text-xs text-slate-300 leading-relaxed">{currentMessage}</p>
          </div>

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Conversation</p>
            {chatMessages.map((msg, i) => (
              <div key={i} className={`${msg.role === 'interviewer' ? 'text-slate-300' : 'text-brand-300 text-right'}`}>
                <p className="text-[10px] text-slate-500 mb-0.5">{msg.role === 'interviewer' ? 'Sarah' : 'You'}</p>
                <p className="text-xs leading-relaxed">{msg.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Code Editor */}
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="px-4 py-2 bg-slate-800 border-b border-slate-700 flex items-center gap-3">
            <span className="text-xs font-bold text-slate-300">JavaScript</span>
            <span className="text-slate-600">|</span>
            <span className="text-xs text-slate-500">Longest Substring Without Repeating Characters</span>
          </div>
          <div className="flex-1 min-h-0">
            <Editor
              height="100%"
              language="javascript"
              value={code}
              onChange={(val) => setCode(val || '')}
              theme="vs-dark"
              options={{
                fontSize: 13,
                fontFamily: 'JetBrains Mono, Fira Code, monospace',
                minimap: { enabled: false },
                padding: { top: 16, bottom: 16 },
                scrollBeyondLastLine: false,
                lineNumbers: 'on',
                fontLigatures: true,
                cursorBlinking: 'smooth',
                smoothScrolling: true,
              }}
            />
          </div>
          {/* Quick Actions */}
          <div className="px-4 py-2.5 bg-slate-800 border-t border-slate-700 flex items-center justify-between">
            <div className="flex gap-2">
              <button className="px-3 py-1.5 bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg hover:bg-slate-600 transition-colors">
                Run Code
              </button>
              <button className="px-3 py-1.5 bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg hover:bg-slate-600 transition-colors">
                Test Cases
              </button>
            </div>
            <button
              onClick={handleEndInterview}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-lg transition-colors"
            >
              Submit & Finish <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Report Modal */}
      <InterviewReportModal
        isOpen={showReport}
        onClose={() => { setShowReport(false); navigate('/interview'); }}
        reportData={mockInterviewFeedbackSample}
        trackTitle={track.title}
      />
    </div>
  );
};
