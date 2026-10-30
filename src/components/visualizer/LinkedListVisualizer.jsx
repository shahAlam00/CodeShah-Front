import React, { useState } from 'react';
import { ArrowRight, Plus, Trash2, Play, RotateCcw } from 'lucide-react';
import { Button } from '../common/Button';

export const LinkedListVisualizer = () => {
  const [nodes, setNodes] = useState([12, 45, 78, 23, 90]);
  const [inputValue, setInputValue] = useState('');
  const [activeTraverseIndex, setActiveTraverseIndex] = useState(-1);
  const [statusMessage, setStatusMessage] = useState('Singly Linked List initialized with 5 nodes.');

  const handleInsertHead = () => {
    const val = parseInt(inputValue, 10) || Math.floor(Math.random() * 90) + 10;
    setNodes([val, ...nodes]);
    setInputValue('');
    setStatusMessage(`Inserted new node with value ${val} at Head. Head pointer updated.`);
  };

  const handleInsertTail = () => {
    const val = parseInt(inputValue, 10) || Math.floor(Math.random() * 90) + 10;
    setNodes([...nodes, val]);
    setInputValue('');
    setStatusMessage(`Appended new node with value ${val} at Tail. Previous tail.next points to ${val}.`);
  };

  const handleDeleteTail = () => {
    if (nodes.length === 0) return;
    const removed = nodes[nodes.length - 1];
    setNodes(nodes.slice(0, -1));
    setStatusMessage(`Deleted Tail node (${removed}). Second-to-last node.next now points to NULL.`);
  };

  const handleTraverse = () => {
    setActiveTraverseIndex(0);
    setStatusMessage(`Starting traversal from HEAD (index 0).`);

    let curr = 0;
    const interval = setInterval(() => {
      curr++;
      if (curr < nodes.length) {
        setActiveTraverseIndex(curr);
        setStatusMessage(`Traversing node ${curr} (value: ${nodes[curr]}).`);
      } else {
        clearInterval(interval);
        setActiveTraverseIndex(-1);
        setStatusMessage(`Reached NULL. Traversal completed!`);
      }
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-soft-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Value (e.g. 50)"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-28 p-2 text-xs border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-500/20"
          />
          <Button variant="primary" size="sm" onClick={handleInsertHead} leftIcon={<Plus className="w-3.5 h-3.5" />}>
            Insert Head
          </Button>
          <Button variant="secondary" size="sm" onClick={handleInsertTail} leftIcon={<Plus className="w-3.5 h-3.5" />}>
            Insert Tail
          </Button>
          <Button variant="outline" size="sm" onClick={handleDeleteTail} leftIcon={<Trash2 className="w-3.5 h-3.5 text-rose-500" />}>
            Delete Tail
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleTraverse} leftIcon={<Play className="w-3.5 h-3.5 fill-slate-500" />}>
            Traverse List
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setNodes([10, 20, 30, 40])} leftIcon={<RotateCcw className="w-3.5 h-3.5" />}>
            Reset
          </Button>
        </div>
      </div>

      {/* Canvas */}
      <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800 min-h-[220px] flex items-center overflow-x-auto">
        <div className="flex items-center gap-2 py-4">
          <span className="text-xs font-bold text-brand-400 mr-2 uppercase tracking-wider">HEAD →</span>

          {nodes.map((val, idx) => {
            const isActive = activeTraverseIndex === idx;

            return (
              <div key={idx} className="flex items-center gap-2 animate-fade-in">
                {/* Node Box */}
                <div
                  className={`flex rounded-xl overflow-hidden border transition-all duration-200 shadow-md ${
                    isActive
                      ? 'border-amber-400 ring-4 ring-amber-400/20 scale-110'
                      : 'border-slate-700 bg-slate-800'
                  }`}
                >
                  <div className={`px-4 py-3 text-sm font-black font-mono ${isActive ? 'bg-amber-400 text-slate-950' : 'text-slate-100'}`}>
                    {val}
                  </div>
                  <div className="px-2.5 py-3 bg-slate-700/80 text-[10px] font-mono text-slate-400 flex items-center border-l border-slate-700">
                    next
                  </div>
                </div>

                {/* Arrow */}
                <ArrowRight className="w-5 h-5 text-slate-500 flex-shrink-0" />
              </div>
            );
          })}

          <div className="px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-lg text-xs font-mono font-bold text-rose-400">
            NULL
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200/80 text-xs text-slate-700 font-medium">
        <strong>Status:</strong> {statusMessage}
      </div>
    </div>
  );
};
