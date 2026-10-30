import React from 'react';
import { Mic, Square } from 'lucide-react';

export const AudioWaveSimulator = ({ isRecording, onToggleRecording }) => {
  return (
    <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200/80 shadow-soft-sm">
      <button
        onClick={onToggleRecording}
        className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
          isRecording
            ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-sm ring-2 ring-rose-300'
            : 'bg-brand-50 hover:bg-brand-100 text-brand-700 border border-brand-200'
        }`}
      >
        {isRecording ? (
          <>
            <Square className="w-3.5 h-3.5 fill-current" />
            <span>Stop Recording</span>
          </>
        ) : (
          <>
            <Mic className="w-3.5 h-3.5" />
            <span>Start Speaking</span>
          </>
        )}
      </button>

      {/* Animated audio levels */}
      {isRecording ? (
        <div className="flex items-center gap-1 px-3 py-1 bg-rose-50 rounded-lg border border-rose-100 flex-1">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse mr-2" />
          <span className="text-[11px] font-bold text-rose-700 mr-2 font-mono">REC</span>
          {[12, 24, 38, 18, 30, 42, 28, 14, 32, 20, 36, 16].map((h, i) => (
            <span
              key={i}
              style={{ height: `${h}px` }}
              className="w-1 bg-rose-500 rounded-full animate-pulse"
            />
          ))}
          <span className="text-[11px] text-rose-600 font-medium ml-auto">Audio input active...</span>
        </div>
      ) : (
        <span className="text-xs text-slate-500 font-medium">
          Click to simulate verbal thought explanation to the interviewer.
        </span>
      )}
    </div>
  );
};
