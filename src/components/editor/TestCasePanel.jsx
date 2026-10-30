import React, { useState, useEffect } from 'react';
import {
  Terminal,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  Play,
  Send,
  Loader2,
  ChevronUp,
  ChevronDown,
  AlertTriangle,
  WifiOff,
} from 'lucide-react';
import { Button } from '../common/Button';

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Pick the right status colour class */
function statusColor(status) {
  if (!status) return 'text-slate-400';
  const s = status.toLowerCase();
  if (s.includes('accepted')) return 'text-emerald-400';
  if (s.includes('wrong')) return 'text-rose-400';
  if (s.includes('time limit')) return 'text-amber-400';
  if (s.includes('compilation')) return 'text-orange-400';
  if (s.includes('runtime')) return 'text-rose-400';
  if (s.includes('rate') || s.includes('429')) return 'text-amber-400';
  if (s.includes('403') || s.includes('key')) return 'text-orange-400';
  if (s.includes('not configured') || s.includes('config')) return 'text-orange-400';
  if (s.includes('connection')) return 'text-slate-400';
  return 'text-rose-400';
}

function StatusIcon({ status, className = 'w-5 h-5' }) {
  const s = (status || '').toLowerCase();
  if (s.includes('accepted')) return <CheckCircle2 className={`${className} text-emerald-400`} />;
  if (s.includes('time limit')) return <Clock className={`${className} text-amber-400`} />;
  if (s.includes('rate') || s.includes('429') ||
    s.includes('403') || s.includes('key') ||
    s.includes('config') || s.includes('connection'))
    return <WifiOff className={`${className} text-amber-400`} />;
  if (s.includes('compilation')) return <AlertTriangle className={`${className} text-orange-400`} />;
  return <XCircle className={`${className} text-rose-400`} />;
}

// ─────────────────────────────────────────────────────────────────────────────
export const TestCasePanel = ({
  testCases = [],
  executionResult,
  isRunning,
  isSubmitting,
  onRun,
  onSubmit,
  isCollapsed,
  onToggleCollapse,
}) => {
  const [activeTab, setActiveTab] = useState('testcases');
  const [selectedCaseIndex, setSelectedCaseIndex] = useState(0);

  // Switch to result tab as soon as execution starts or finishes
  useEffect(() => {
    if (isRunning || isSubmitting || executionResult) {
      setActiveTab('result');
    }
  }, [isRunning, isSubmitting, executionResult]);

  // Keep selected result case in sync when cases count changes
  const resultCases = executionResult?.cases || [];
  const safeCaseIdx = Math.min(selectedCaseIndex, Math.max(resultCases.length - 1, 0));
  const selectedCase = resultCases[safeCaseIdx];

  return (
    <div className="bg-slate-900 border-t border-slate-800 flex flex-col transition-all duration-200">

      {/* ── Top bar ──────────────────────────────────────────────────────── */}
      <div className="h-11 px-4 flex items-center justify-between border-b border-slate-800/80 bg-slate-900/90 select-none">
        <div className="flex items-center gap-1">
          <button
            onClick={() => { setActiveTab('testcases'); if (isCollapsed) onToggleCollapse(); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${activeTab === 'testcases' ? 'bg-slate-800 text-brand-400' : 'text-slate-400 hover:text-slate-200'
              }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Testcases</span>
          </button>

          <button
            onClick={() => { setActiveTab('result'); if (isCollapsed) onToggleCollapse(); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 relative transition-colors ${activeTab === 'result' ? 'bg-slate-800 text-brand-400' : 'text-slate-400 hover:text-slate-200'
              }`}
          >
            <span>Test Result</span>
            {executionResult && (
              <span className={`w-2 h-2 rounded-full ${executionResult.status === 'Accepted' ? 'bg-emerald-400' : 'bg-rose-400'
                }`} />
            )}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleCollapse}
            className="p-1 text-slate-400 hover:text-slate-200 mr-2"
            title={isCollapsed ? 'Expand Console' : 'Collapse Console'}
          >
            {isCollapsed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          <Button
            variant="outline" size="sm" onClick={onRun} isLoading={isRunning}
            leftIcon={<Play className="w-3.5 h-3.5 fill-slate-300" />}
            className="border-slate-700 text-slate-200 hover:bg-slate-800"
          >
            Run
          </Button>

          <Button
            variant="primary" size="sm" onClick={onSubmit} isLoading={isSubmitting}
            leftIcon={<Send className="w-3.5 h-3.5" />}
          >
            Submit
          </Button>
        </div>
      </div>

      {/* ── Content area ─────────────────────────────────────────────────── */}
      {!isCollapsed && (
        <div className="p-4 h-52 overflow-y-auto text-xs font-mono">

          {/* ══ TESTCASES TAB ══════════════════════════════════════════════ */}
          {activeTab === 'testcases' && (
            <div className="space-y-3">
              {testCases.length === 0 ? (
                <div className="flex items-center gap-2 text-amber-400 font-sans text-xs py-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>
                    No sample test cases configured for this problem.
                    Add them in the Admin panel → Test Cases.
                  </span>
                </div>
              ) : (
                <>
                  {/* Case selector buttons */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {testCases.map((tc, idx) => (
                      <button
                        key={tc.id ?? idx}
                        onClick={() => setSelectedCaseIndex(idx)}
                        className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${selectedCaseIndex === idx
                            ? 'bg-slate-800 text-slate-100 border border-slate-700'
                            : 'text-slate-400 hover:text-slate-200 bg-slate-900/60'
                          }`}
                      >
                        Case {idx + 1}
                      </button>
                    ))}
                  </div>

                  {/* Input + Expected Output */}
                  {testCases[selectedCaseIndex] && (
                    <div className="space-y-2 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                      <div>
                        <span className="text-[11px] font-sans font-semibold text-slate-400 block mb-1">Input:</span>
                        <pre className="text-slate-200 bg-slate-900 p-2 rounded border border-slate-800/80 whitespace-pre-wrap break-all">
                          {testCases[selectedCaseIndex].input || <span className="text-slate-500 italic">—</span>}
                        </pre>
                      </div>
                      <div>
                        <span className="text-[11px] font-sans font-semibold text-slate-400 block mb-1">Expected Output:</span>
                        {testCases[selectedCaseIndex].expected
                          ? (
                            <pre className="text-emerald-400 bg-slate-900 p-2 rounded border border-slate-800/80">
                              {testCases[selectedCaseIndex].expected}
                            </pre>
                          ) : (
                            <p className="text-amber-400 font-sans italic text-[11px]">
                              Expected output not configured — update this test case in the Admin panel.
                            </p>
                          )
                        }
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* ══ RESULT TAB ═════════════════════════════════════════════════ */}
          {activeTab === 'result' && (
            <>
              {/* Loading spinner */}
              {(isRunning || isSubmitting) && (
                <div className="h-36 flex flex-col items-center justify-center gap-2 text-slate-400">
                  <Loader2 className="w-6 h-6 animate-spin text-brand-500" />
                  <p className="font-sans font-medium text-slate-300">
                    {isSubmitting ? 'Running against full test suite…' : 'Executing sample test cases…'}
                  </p>
                  <p className="font-sans text-[11px] text-slate-500">
                    Judge0 runs cases sequentially — this may take a few seconds
                  </p>
                </div>
              )}

              {/* No result yet */}
              {!isRunning && !isSubmitting && !executionResult && (
                <div className="h-32 flex items-center justify-center text-slate-500 font-sans">
                  Click <strong className="text-slate-300 mx-1">Run</strong> or{' '}
                  <strong className="text-slate-300 mx-1">Submit</strong> to execute your code.
                </div>
              )}

              {/* Result available */}
              {!isRunning && !isSubmitting && executionResult && (
                <div className="space-y-3">

                  {/* ── Status banner ────────────────────────────────────── */}
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <StatusIcon status={executionResult.status} />
                      <span className={`text-base font-bold font-sans ${statusColor(executionResult.status)}`}>
                        {executionResult.status || 'Unknown'}
                      </span>
                      {executionResult.passed !== undefined && executionResult.total !== undefined && (
                        <span className="text-xs font-sans text-slate-400 ml-1">
                          ({executionResult.passed}/{executionResult.total} passed)
                        </span>
                      )}
                    </div>

                    {executionResult.status === 'Accepted' && (
                      <div className="flex items-center gap-3 text-xs text-slate-400 font-sans">
                        {executionResult.runtime && executionResult.runtime !== '—' && (
                          <span>Runtime: <strong className="text-slate-200">{executionResult.runtime}</strong></span>
                        )}
                        {executionResult.memory && executionResult.memory !== '—' && (
                          <span>Memory: <strong className="text-slate-200">{executionResult.memory}</strong></span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* ── Provider / config error message ──────────────────── */}
                  {executionResult.message && executionResult.success === false && (
                    <div className="bg-amber-950/40 border border-amber-800/60 rounded-xl p-3 font-sans text-[11px] text-amber-300 leading-relaxed">
                      <strong className="block mb-1">
                        {executionResult.providerError === 'RATE_LIMITED' && '⏳ Rate Limited (HTTP 429)'}
                        {executionResult.providerError === 'FORBIDDEN' && '🔑 API Key Error (HTTP 403)'}
                        {executionResult.providerError === 'UNAUTHORIZED' && '🔑 API Key Error (HTTP 401)'}
                        {executionResult.providerError === 'CONFIG' && '⚙️  Judge0 Not Configured'}
                        {executionResult.providerError === null && '⚠️  Execution Error'}
                        {!executionResult.providerError && executionResult.providerError !== null && '⚠️  Execution Error'}
                      </strong>
                      {executionResult.message}
                    </div>
                  )}

                  {/* ── Case selector + detail ────────────────────────────── */}
                  {resultCases.length > 0 && (
                    <>
                      {/* Per-case pass/fail badges */}
                      <div className="flex items-center gap-2 flex-wrap pt-1">
                        {resultCases.map((c, i) => (
                          <button
                            key={i}
                            onClick={() => setSelectedCaseIndex(i)}
                            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-colors border ${safeCaseIdx === i
                                ? c.passed
                                  ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700'
                                  : 'bg-rose-950/60 text-rose-300 border-rose-700'
                                : c.passed
                                  ? 'bg-emerald-950/30 text-emerald-500 border-emerald-900/60'
                                  : 'bg-rose-950/30 text-rose-500 border-rose-900/60'
                              }`}
                          >
                            {c.passed
                              ? <CheckCircle2 className="w-3 h-3" />
                              : <XCircle className="w-3 h-3" />
                            }
                            <span>Case {i + 1}</span>
                          </button>
                        ))}
                      </div>

                      {/* Detail for selected result case */}
                      {selectedCase && (
                        <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 space-y-2 mt-1">
                          {/* Status for this case */}
                          {selectedCase.status && selectedCase.status !== 'Accepted' && (
                            <p className={`font-sans text-[11px] font-semibold ${statusColor(selectedCase.status)}`}>
                              {selectedCase.status}
                            </p>
                          )}

                          {/* Input (shown only for visible / sample cases) */}
                          {selectedCase.input && selectedCase.input !== '[hidden]' && (
                            <div>
                              <span className="text-[11px] font-sans font-semibold text-slate-400 block mb-0.5">Input:</span>
                              <pre className="text-slate-300 bg-slate-900 p-2 rounded border border-slate-800/80 whitespace-pre-wrap break-all">
                                {selectedCase.input}
                              </pre>
                            </div>
                          )}

                          {/* Your Output */}
                          <div>
                            <span className="text-[11px] font-sans font-semibold text-slate-400 block mb-0.5">Your Output:</span>
                            <pre className={`bg-slate-900 p-2 rounded border border-slate-800/80 whitespace-pre-wrap break-all ${selectedCase.passed ? 'text-emerald-400' : 'text-rose-400'
                              }`}>
                              {selectedCase.actual || <span className="text-slate-500 italic">— (empty output)</span>}
                            </pre>
                          </div>

                          {/* Expected Output */}
                          {selectedCase.expected && selectedCase.expected !== '[hidden]' && (
                            <div>
                              <span className="text-[11px] font-sans font-semibold text-slate-400 block mb-0.5">Expected:</span>
                              <pre className="text-emerald-400 bg-slate-900 p-2 rounded border border-slate-800/80">
                                {selectedCase.expected}
                              </pre>
                            </div>
                          )}

                          {/* Runtime / memory for this case */}
                          {(selectedCase.time || selectedCase.memory) && (
                            <div className="flex gap-3 text-[11px] font-sans text-slate-500 pt-1">
                              {selectedCase.time && <span>Time: <strong className="text-slate-300">{selectedCase.time}</strong></span>}
                              {selectedCase.memory && <span>Memory: <strong className="text-slate-300">{selectedCase.memory}</strong></span>}
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
