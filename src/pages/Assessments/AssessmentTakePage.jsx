import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Clock, ChevronRight, ChevronLeft, Flag, AlertCircle, CheckCircle2 } from 'lucide-react';
import { mockAssessments } from '../../data/mockAssessments';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';

export const AssessmentTakePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { warning } = useToast();

  const assessment = mockAssessments.find(a => a.id === id);

  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flagged, setFlagged] = useState(new Set());
  const [timeLeft, setTimeLeft] = useState((assessment?.timeLimit || assessment?.duration || 30) * 60);
  const timerRef = useRef(null);

  useEffect(() => {
    if (started && timeLeft > 0) {
      timerRef.current = setInterval(() => setTimeLeft(t => t - 1), 1000);
    }
    if (timeLeft === 0 && started) handleSubmit();
    return () => clearInterval(timerRef.current);
  }, [started, timeLeft]);

  if (!assessment) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500 gap-3">
        <AlertCircle className="w-10 h-10 text-slate-300" />
        <p className="text-lg font-bold">Assessment not found</p>
        <Link to="/assessments" className="text-brand-600 hover:underline text-sm font-semibold">← Back to Assessments</Link>
      </div>
    );
  }

  const questions = assessment.questions || [];
  const totalQ = questions.length || assessment.totalQuestions || assessment.questionsCount;
  const answeredCount = Object.keys(answers).length;

  const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const handleAnswer = (qId, option) => {
    setAnswers(prev => ({ ...prev, [qId]: option }));
  };

  const toggleFlag = (qIdx) => {
    setFlagged(prev => {
      const next = new Set(prev);
      if (next.has(qIdx)) next.delete(qIdx);
      else next.add(qIdx);
      return next;
    });
  };

  const handleSubmit = () => {
    clearInterval(timerRef.current);
    // Calculate score
    let correct = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) correct++;
    });
    const score = totalQ > 0 ? Math.round((correct / questions.length) * 100) : 82;
    navigate(`/assessments/${id}/result`, { state: { score, answers, correct, total: questions.length } });
  };

  const currentQuestion = questions[currentQ];

  if (!started) {
    return (
      <div className="max-w-xl mx-auto py-12 space-y-6">
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft-md p-8 text-center space-y-4">
          <div className="w-14 h-14 bg-brand-100 rounded-2xl flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-7 h-7 text-brand-600" />
          </div>
          <h1 className="text-2xl font-black text-slate-900">{assessment.title}</h1>
          <p className="text-sm text-slate-500">{assessment.description}</p>
          <div className="grid grid-cols-3 gap-4 py-4">
            {[
              { label: 'Questions', value: assessment.totalQuestions || assessment.questionsCount },
              { label: 'Time Limit', value: `${assessment.timeLimit || assessment.duration} min` },
              { label: 'Pass Score', value: `${assessment.passingScore}%` },
            ].map(({ label, value }) => (
              <div key={label} className="bg-slate-50 rounded-xl p-3 border border-slate-200">
                <p className="text-base font-black text-slate-900">{value}</p>
                <p className="text-[10px] text-slate-500 font-medium">{label}</p>
              </div>
            ))}
          </div>
          <div className="text-xs text-slate-500 bg-amber-50 border border-amber-200 rounded-xl p-3 text-left space-y-1">
            <p className="font-bold text-amber-800">⚠️ Before you start:</p>
            <p>• The timer starts immediately and cannot be paused.</p>
            <p>• You can flag questions and return to them before submitting.</p>
            <p>• Answers are auto-submitted when time runs out.</p>
          </div>
          <Button variant="primary" size="md" className="w-full" onClick={() => setStarted(true)}>
            Start Assessment →
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-5 pb-8">
      {/* Timer Bar */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur border border-slate-200 rounded-2xl px-5 py-3 flex items-center justify-between shadow-soft-sm">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-slate-700 truncate">{assessment.title}</span>
          <span className="text-xs text-slate-400">· Q {currentQ + 1}/{questions.length}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs font-semibold text-slate-500">{answeredCount}/{questions.length} answered</span>
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black text-sm ${
            timeLeft < 120 ? 'bg-rose-100 text-rose-700 animate-pulse' : 'bg-brand-100 text-brand-700'
          }`}>
            <Clock className="w-4 h-4" />
            {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      {/* Question Navigator */}
      <div className="flex flex-wrap gap-2 bg-white rounded-2xl border border-slate-200/80 p-4 shadow-soft-sm">
        {questions.map((q, idx) => (
          <button
            key={q.id}
            onClick={() => setCurrentQ(idx)}
            className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors flex items-center justify-center ${
              idx === currentQ ? 'bg-brand-600 text-white'
              : answers[q.id] ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
              : flagged.has(idx) ? 'bg-amber-100 text-amber-800 border border-amber-300'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {idx + 1}
          </button>
        ))}
      </div>

      {/* Question Card */}
      {currentQuestion && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft-sm p-6 space-y-5">
          {/* Question Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <span className="text-[10px] font-bold text-brand-600 uppercase tracking-wider">Question {currentQ + 1}</span>
              <p className="text-base font-bold text-slate-900 mt-1 leading-snug">{currentQuestion.question}</p>
            </div>
            <button
              onClick={() => toggleFlag(currentQ)}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                flagged.has(currentQ) ? 'bg-amber-100 border-amber-300 text-amber-700' : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-amber-50 hover:border-amber-300 hover:text-amber-600'
              }`}
            >
              <Flag className="w-3.5 h-3.5" />
              {flagged.has(currentQ) ? 'Flagged' : 'Flag'}
            </button>
          </div>

          {/* Code Snippet */}
          {currentQuestion.codeSnippet && (
            <pre className="bg-slate-900 text-emerald-400 text-xs rounded-xl p-4 overflow-x-auto font-mono leading-relaxed">
              {currentQuestion.codeSnippet}
            </pre>
          )}

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options?.map((option) => {
              const selected = answers[currentQuestion.id] === option.label;
              return (
                <button
                  key={option.label}
                  onClick={() => handleAnswer(currentQuestion.id, option.label)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all ${
                    selected ? 'bg-brand-50 border-brand-400 shadow-soft-sm'
                    : 'bg-slate-50 border-slate-200 hover:border-brand-300 hover:bg-brand-50/40'
                  }`}
                >
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0 ${
                    selected ? 'bg-brand-600 text-white' : 'bg-slate-200 text-slate-600'
                  }`}>{option.label}</span>
                  <span className={`text-sm font-medium ${selected ? 'text-brand-800' : 'text-slate-700'}`}>{option.text}</span>
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
              disabled={currentQ === 0}
              leftIcon={<ChevronLeft className="w-4 h-4" />}
            >
              Previous
            </Button>
            {currentQ < questions.length - 1 ? (
              <Button
                variant="primary"
                size="sm"
                onClick={() => setCurrentQ(currentQ + 1)}
                rightIcon={<ChevronRight className="w-4 h-4" />}
              >
                Next Question
              </Button>
            ) : (
              <Button variant="primary" size="sm" onClick={handleSubmit}>
                Submit Assessment
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
