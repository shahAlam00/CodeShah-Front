import React, { useState } from 'react';
import { Play, RotateCcw, Network } from 'lucide-react';
import { Button } from '../common/Button';

export const GraphVisualizer = () => {
  const [algorithm, setAlgorithm] = useState('bfs'); // 'bfs' | 'dfs'
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [activeNode, setActiveNode] = useState(null);
  const [log, setLog] = useState('Select BFS or DFS and click Run.');

  // Graph vertices
  const nodes = [
    { id: 0, label: '0', x: 20, y: 30 },
    { id: 1, label: '1', x: 50, y: 20 },
    { id: 2, label: '2', x: 80, y: 30 },
    { id: 3, label: '3', x: 25, y: 75 },
    { id: 4, label: '4', x: 55, y: 80 },
    { id: 5, label: '5', x: 85, y: 75 }
  ];

  // Adjacency graph
  const edges = [
    [0, 1], [0, 3],
    [1, 2], [1, 4],
    [2, 5],
    [3, 4],
    [4, 5]
  ];

  const bfsOrder = [0, 1, 3, 2, 4, 5];
  const dfsOrder = [0, 1, 2, 5, 4, 3];

  const handleRun = () => {
    const seq = algorithm === 'bfs' ? bfsOrder : dfsOrder;
    setVisitedNodes([]);
    setActiveNode(null);
    setLog(`Starting ${algorithm.toUpperCase()} traversal from Node 0.`);

    let i = 0;
    const interval = setInterval(() => {
      if (i < seq.length) {
        const nodeId = seq[i];
        setActiveNode(nodeId);
        setVisitedNodes(prev => [...prev, nodeId]);
        setLog(`${algorithm.toUpperCase()}: Visited Vertex ${nodeId}.`);
        i++;
      } else {
        clearInterval(interval);
        setActiveNode(null);
        setLog(`All reachable vertices visited via ${algorithm.toUpperCase()}.`);
      }
    }, 700);
  };

  const handleReset = () => {
    setActiveNode(null);
    setVisitedNodes([]);
    setLog('Reset graph state.');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-soft-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Search Method:</span>
          <select
            value={algorithm}
            onChange={(e) => { setAlgorithm(e.target.value); handleReset(); }}
            className="p-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl text-slate-800 outline-none cursor-pointer"
          >
            <option value="bfs">Breadth-First Search (Queue / Level by Level)</option>
            <option value="dfs">Depth-First Search (Stack / Deepest Path First)</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="primary" size="sm" onClick={handleRun} leftIcon={<Play className="w-3.5 h-3.5 fill-white" />}>
            Run Graph Search
          </Button>
          <Button variant="outline" size="sm" onClick={handleReset} leftIcon={<RotateCcw className="w-3.5 h-3.5" />}>
            Reset
          </Button>
        </div>
      </div>

      {/* SVG Graph Canvas */}
      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 relative h-80 flex items-center justify-center overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {edges.map(([u, v], idx) => {
            const nodeU = nodes.find(n => n.id === u);
            const nodeV = nodes.find(n => n.id === v);
            const isTraversed = visitedNodes.includes(u) && visitedNodes.includes(v);

            return (
              <line
                key={idx}
                x1={nodeU.x}
                y1={nodeU.y}
                x2={nodeV.x}
                y2={nodeV.y}
                stroke={isTraversed ? "#10b981" : "#475569"}
                strokeWidth={isTraversed ? "1.5" : "1"}
                strokeDasharray={isTraversed ? "none" : "2,2"}
              />
            );
          })}
        </svg>

        {nodes.map((n) => {
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
              {n.label}
            </div>
          );
        })}
      </div>

      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-soft-sm space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-brand-600 uppercase tracking-wider">Visited Order</span>
          <span className="text-slate-500 font-mono">{visitedNodes.length} / {nodes.length} nodes</span>
        </div>
        <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 overflow-x-auto min-h-[44px]">
          {visitedNodes.map((val, idx) => (
            <React.Fragment key={idx}>
              <span className="px-2.5 py-0.5 bg-emerald-500 text-white font-mono font-bold text-xs rounded-md">
                Node {val}
              </span>
              {idx < visitedNodes.length - 1 && <span className="text-slate-400">→</span>}
            </React.Fragment>
          ))}
        </div>
        <p className="text-xs text-slate-600 font-medium"><strong>Log:</strong> {log}</p>
      </div>
    </div>
  );
};
