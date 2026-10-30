import React, { useState } from 'react';
import { Plus, Minus, RotateCcw, ArrowDown, ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';

export const StackQueueVisualizer = () => {
  const [mode, setMode] = useState('stack'); // 'stack' | 'queue'
  const [stack, setStack] = useState([24, 76, 15, 88]);
  const [queue, setQueue] = useState([12, 34, 56, 78]);
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('Select an operation to begin.');

  // Stack operations
  const handlePush = () => {
    const val = parseInt(inputValue, 10) || Math.floor(Math.random() * 90) + 10;
    if (stack.length >= 7) {
      setMessage("Stack Overflow! Maximum stack capacity reached (7 items).");
      return;
    }
    setStack([val, ...stack]);
    setInputValue('');
    setMessage(`Pushed element ${val} onto top of stack (LIFO).`);
  };

  const handlePop = () => {
    if (stack.length === 0) {
      setMessage("Stack Underflow! Cannot pop from empty stack.");
      return;
    }
    const popped = stack[0];
    setStack(stack.slice(1));
    setMessage(`Popped element ${popped} from the top of the stack.`);
  };

  // Queue operations
  const handleEnqueue = () => {
    const val = parseInt(inputValue, 10) || Math.floor(Math.random() * 90) + 10;
    if (queue.length >= 8) {
      setMessage("Queue Full! Maximum queue size reached.");
      return;
    }
    setQueue([...queue, val]);
    setInputValue('');
    setMessage(`Enqueued element ${val} at the REAR of the queue.`);
  };

  const handleDequeue = () => {
    if (queue.length === 0) {
      setMessage("Queue Empty! No elements to dequeue.");
      return;
    }
    const dequeued = queue[0];
    setQueue(queue.slice(1));
    setMessage(`Dequeued element ${dequeued} from the FRONT of the queue (FIFO).`);
  };

  return (
    <div className="space-y-6">
      {/* Mode Switcher */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200/80 shadow-soft-sm flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => { setMode('stack'); setMessage("Stack selected (LIFO - Last In First Out)."); }}
              className={`px-4 py-1.5 rounded-lg transition-all ${
                mode === 'stack' ? 'bg-white text-brand-700 shadow-sm' : 'text-slate-600'
              }`}
            >
              Stack (LIFO)
            </button>
            <button
              onClick={() => { setMode('queue'); setMessage("Queue selected (FIFO - First In First Out)."); }}
              className={`px-4 py-1.5 rounded-lg transition-all ${
                mode === 'queue' ? 'bg-white text-brand-700 shadow-sm' : 'text-slate-600'
              }`}
            >
              Queue (FIFO)
            </button>
          </div>
        </div>

        {/* Input and Actions */}
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Value"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-24 p-2 text-xs border border-slate-200 rounded-xl outline-none"
          />

          {mode === 'stack' ? (
            <>
              <Button variant="primary" size="sm" onClick={handlePush} leftIcon={<Plus className="w-3.5 h-3.5" />}>
                Push
              </Button>
              <Button variant="danger" size="sm" onClick={handlePop} leftIcon={<Minus className="w-3.5 h-3.5" />}>
                Pop
              </Button>
            </>
          ) : (
            <>
              <Button variant="primary" size="sm" onClick={handleEnqueue} leftIcon={<Plus className="w-3.5 h-3.5" />}>
                Enqueue
              </Button>
              <Button variant="danger" size="sm" onClick={handleDequeue} leftIcon={<Minus className="w-3.5 h-3.5" />}>
                Dequeue
              </Button>
            </>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (mode === 'stack') setStack([24, 76, 15, 88]);
              else setQueue([12, 34, 56, 78]);
              setMessage("Reset to initial values.");
            }}
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            Reset
          </Button>
        </div>
      </div>

      {/* Visual Canvas */}
      <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800 min-h-[300px] flex items-center justify-center">
        {mode === 'stack' ? (
          /* Stack Vertical Bucket */
          <div className="flex flex-col items-center">
            <span className="text-xs font-bold text-amber-400 mb-2 flex items-center gap-1 font-mono uppercase tracking-wider">
              <ArrowDown className="w-3.5 h-3.5 animate-bounce" /> TOP Pointer
            </span>

            <div className="w-44 border-2 border-t-0 border-slate-700 bg-slate-950/60 p-3 rounded-b-2xl flex flex-col gap-2 min-h-[220px] justify-end shadow-inner">
              {stack.map((val, idx) => (
                <div
                  key={idx}
                  className={`py-2 px-4 rounded-xl text-center font-mono font-bold text-sm text-slate-100 shadow-md transition-all duration-200 ${
                    idx === 0
                      ? 'bg-amber-500 text-slate-950 border-2 border-amber-300 scale-105'
                      : 'bg-slate-800 border border-slate-700'
                  }`}
                >
                  {val} {idx === 0 && <span className="text-[10px] ml-1 uppercase font-sans font-black">(Top)</span>}
                </div>
              ))}
              {stack.length === 0 && (
                <div className="text-center text-xs text-slate-600 font-mono py-12">Stack is Empty</div>
              )}
            </div>
            <span className="text-[11px] text-slate-500 font-mono mt-2">Bottom of Stack</span>
          </div>
        ) : (
          /* Queue Horizontal Runway */
          <div className="w-full flex flex-col items-center">
            <div className="flex items-center justify-between w-full max-w-xl text-xs font-mono font-bold text-slate-400 mb-3 px-2">
              <span className="text-rose-400 flex items-center gap-1">FRONT (Dequeue)</span>
              <span className="text-emerald-400 flex items-center gap-1">REAR (Enqueue)</span>
            </div>

            <div className="w-full max-w-xl h-24 border-y-2 border-slate-700 bg-slate-950/60 rounded-xl flex items-center px-4 gap-3 overflow-x-auto shadow-inner">
              {queue.map((val, idx) => (
                <div
                  key={idx}
                  className={`h-14 min-w-[64px] rounded-xl flex items-center justify-center font-mono font-bold text-sm shadow-md transition-all duration-200 ${
                    idx === 0
                      ? 'bg-rose-500 text-white border-2 border-rose-300 scale-105'
                      : idx === queue.length - 1
                      ? 'bg-emerald-500 text-white border-2 border-emerald-300'
                      : 'bg-slate-800 text-slate-100 border border-slate-700'
                  }`}
                >
                  {val}
                </div>
              ))}
              {queue.length === 0 && (
                <div className="text-center w-full text-xs text-slate-600 font-mono">Queue is Empty</div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200/80 text-xs text-slate-700 font-medium">
        <strong>Operation Log:</strong> {message}
      </div>
    </div>
  );
};
