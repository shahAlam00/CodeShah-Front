import React from 'react';
import { Bot, Mic, Volume2 } from 'lucide-react';

export const InterviewerAvatar = ({ isSpeaking = false, name = "Dr. Elena Vance (AI)" }) => {
  return (
    <div className="flex flex-col items-center text-center p-5 bg-white rounded-2xl border border-slate-200/80 shadow-soft-sm">
      {/* Avatar with speaking wave rings */}
      <div className="relative mb-3">
        <div
          className={`w-20 h-20 rounded-2xl bg-gradient-to-tr from-brand-600 to-sky-400 flex items-center justify-center text-white shadow-lg transition-all duration-300 ${
            isSpeaking ? 'ring-4 ring-brand-400/50 scale-105' : ''
          }`}
        >
          <Bot className="w-10 h-10 stroke-[2]" />
        </div>

        {/* Pulse beacon */}
        {isSpeaking && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-brand-500"></span>
          </span>
        )}
      </div>

      <div className="space-y-1">
        <h4 className="text-sm font-bold text-slate-800">{name}</h4>
        <p className="text-[11px] text-slate-500 font-medium">Principal Engineering Evaluator</p>
      </div>

      {/* Speaking state audio wave indicator */}
      <div className="flex items-center gap-1.5 mt-3 px-3 py-1 bg-slate-50 rounded-full border border-slate-100 text-[11px] text-slate-600 font-medium">
        {isSpeaking ? (
          <>
            <Volume2 className="w-3.5 h-3.5 text-brand-600 animate-pulse" />
            <span className="text-brand-600 font-semibold">Speaking prompt...</span>
            <div className="flex items-center gap-0.5 ml-1">
              <span className="w-1 h-3 bg-brand-500 rounded-full animate-bounce" />
              <span className="w-1 h-4 bg-brand-500 rounded-full animate-bounce [animation-delay:0.15s]" />
              <span className="w-1 h-2 bg-brand-500 rounded-full animate-bounce [animation-delay:0.3s]" />
            </div>
          </>
        ) : (
          <>
            <Mic className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-slate-600">Listening to candidate</span>
          </>
        )}
      </div>
    </div>
  );
};
