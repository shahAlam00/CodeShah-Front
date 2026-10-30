import React, { useState } from 'react';
import { Play, RotateCcw, Sparkles } from 'lucide-react';
import { Button } from '../common/Button';

export const TreeVisualizer = () => {
  const [activeNode, setActiveNode] = useState(null);
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [traversalType, setTraversalType] = useState('inorder');
  const [log, setLog] = useState('Select a traversal algorithm to begin.');

  // Binary Search Tree representation:
  //         50
  //       /    \
  //      30     70
  //     /  \   /  \
  //    20  40 60  80
  const treeNodes = [
    { id: 50, level: 1, x: 50, y: 15, left: 30, right: 70 },
    { id: 30, level: 2, x: 28, y: 45, left: 20, right: 40 },
    { id: 70, level: 2, x: 72, y: 45, left: 60, right: 80 },
    { id: 20, level: 3, x: 18, y: 78, left: null, right: null },
    { id: 40, level: 3, x: 38, y: 78, left: null, right: null },
    { id: 60, level: 3, x: 62, y: 78, left: null, right: null },
    { id: 80, level: 3, x: 82, y: 78, left: null, right: null }
  ];

  const sequences = {
    inorder: [20, 30, 40, 50, 60, 70, 80], // Left, Root, Right
    preorder: [50, 30, 20, 40, 70, 60, 80], // Root, Left, Right
    postorder: [20, 40, 30, 60, 80, 70, 50], // Left, Right, Root
    levelorder: [50, 30, 70, 20, 40, 60, 80] // BFS
  };

  const handleRunTraversal = () => {
    const seq = sequences[traversalType];
    setVisitedNodes([]);
    setActiveNode(null);
    setLog(`Starting ${traversalType.toUpperCase()} traversal: [${seq.join(', ')}]`);

    let i = 0;
    const interval = setInterval(() => {
      if (i < seq.length) {
        const nodeId = seq[i];
        setActiveNode(nodeId);
        setVisitedNodes(prev => [...prev, nodeId]);
        setLog(`Visited node ${nodeId} (${i + 1}/${seq.length}).`);
        i++;
      } else {
        clearInterval(interval);
        setActiveNode(null);
        setLog(`${traversalType.toUpperCase()} traversal completed successfully!`);
      }
    }, 700);
  };

  const handleReset = () => {
    setActiveNode(null);
    setVisitedNodes([]);
    setLog('Reset tree state.');
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-soft-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Traversal:</span>
          <select
            value={traversalType}
            onChange={(e) => { setTraversalType(e.target.value); handleReset(); }}
            className="p-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl text-slate-800 outline-none cursor-pointer"
          >
            <option value="inorder">Inorder (Left, Root, Right) - Sorted</option>
            <option value="preorder">Preorder (Root, Left, Right)</option>
            <option value="postorder">Postorder (Left, Right, Root)</option>
            <option value="levelorder">Level Order (BFS)</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="primary" size="sm" onClick={handleRunTraversal} leftIcon={<Play className="w-3.5 h-3.5 fill-white" />}>
            Run Traversal
          </Button>
          <Button variant="outline" size="sm" onClick={handleReset} leftIcon={<RotateCcw className="w-3.5 h-3.5" />}>
            Reset
          </Button>
        </div>
      </div>

      {/* SVG Tree Canvas */}
      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 relative h-80 flex items-center justify-center overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Edges */}
          <line x1="50" y1="15" x2="28" y2="45" stroke="#475569" strokeWidth="1" />
          <line x1="50" y1="15" x2="72" y2="45" stroke="#475569" strokeWidth="1" />
          <line x1="28" y1="45" x2="18" y2="78" stroke="#475569" strokeWidth="1" />
          <line x1="28" y1="45" x2="38" y2="78" stroke="#475569" strokeWidth="1" />
          <line x1="72" y1="45" x2="62" y2="78" stroke="#475569" strokeWidth="1" />
          <line x1="72" y1="45" x2="82" y2="78" stroke="#475569" strokeWidth="1" />
        </svg>

        {/* HTML Node Elements overlaid */}
        {treeNodes.map((n) => {
          const isActive = activeNode === n.id;
          const isVisited = visitedNodes.includes(n.id);

          return (
            <div
              key={n.id}
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center font-mono font-bold text-sm shadow-lg transition-all duration-300 border-2 ${
                isActive
                  ? 'bg-amber-400 text-slate-950 border-white scale-125 ring-4 ring-amber-400/40 z-20'
                  : isVisited
                  ? 'bg-emerald-500 text-white border-emerald-300'
                  : 'bg-slate-800 text-slate-200 border-slate-600'
              }`}
            >
              {n.id}
            </div>
          );
        })}
      </div>

      {/* Traversal Output Sequence */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-soft-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-brand-600 uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Traversal Sequence Output</span>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            {visitedNodes.length} / {treeNodes.length} visited
          </span>
        </div>

        <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 overflow-x-auto min-h-[48px]">
          {visitedNodes.length === 0 ? (
            <span className="text-xs text-slate-400 font-mono">Press Run Traversal to see animated visited sequence</span>
          ) : (
            visitedNodes.map((val, idx) => (
              <React.Fragment key={idx}>
                <span className="px-3 py-1 bg-emerald-500 text-white font-mono font-bold text-xs rounded-lg shadow-xs">
                  {val}
                </span>
                {idx < visitedNodes.length - 1 && (
                  <span className="text-slate-400 font-bold">→</span>
                )}
              </React.Fragment>
            ))
          )}
        </div>

        <p className="text-xs text-slate-600 font-medium">
          <strong>Log:</strong> {log}
        </p>
      </div>
    </div>
  );
};
