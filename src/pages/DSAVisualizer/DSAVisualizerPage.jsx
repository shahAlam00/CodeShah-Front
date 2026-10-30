import React, { useState } from 'react';
import { BarChart2, Link2, Layers, GitBranch, Share2, ChevronRight } from 'lucide-react';
import { SortingVisualizer } from '../../components/visualizer/SortingVisualizer';
import { LinkedListVisualizer } from '../../components/visualizer/LinkedListVisualizer';
import { StackQueueVisualizer } from '../../components/visualizer/StackQueueVisualizer';
import { TreeVisualizer } from '../../components/visualizer/TreeVisualizer';
import { GraphVisualizer } from '../../components/visualizer/GraphVisualizer';

const categories = [
  {
    id: 'sorting',
    label: 'Sorting Algorithms',
    icon: <BarChart2 className="w-4 h-4" />,
    description: 'Bubble, Insertion, Selection, Quick Sort',
    component: SortingVisualizer,
    color: 'from-brand-500 to-sky-400',
  },
  {
    id: 'linked-list',
    label: 'Linked List',
    icon: <Link2 className="w-4 h-4" />,
    description: 'Insert, Delete, Traverse nodes',
    component: LinkedListVisualizer,
    color: 'from-purple-500 to-violet-400',
  },
  {
    id: 'stack-queue',
    label: 'Stack & Queue',
    icon: <Layers className="w-4 h-4" />,
    description: 'LIFO Stack and FIFO Queue operations',
    component: StackQueueVisualizer,
    color: 'from-emerald-500 to-teal-400',
  },
  {
    id: 'tree',
    label: 'Binary Tree',
    icon: <GitBranch className="w-4 h-4" />,
    description: 'Inorder, Preorder, Postorder, BFS traversal',
    component: TreeVisualizer,
    color: 'from-amber-500 to-orange-400',
  },
  {
    id: 'graph',
    label: 'Graph',
    icon: <Share2 className="w-4 h-4" />,
    description: 'BFS and DFS traversal on nodes',
    component: GraphVisualizer,
    color: 'from-rose-500 to-pink-400',
  },
];

export const DSAVisualizerPage = () => {
  const [activeId, setActiveId] = useState('sorting');
  const activeCategory = categories.find(c => c.id === activeId);
  const ActiveComponent = activeCategory?.component;

  return (
    <div className="flex flex-col lg:flex-row gap-5 min-h-[calc(100vh-8rem)] pb-6">
      {/* Sidebar */}
      <div className="lg:w-64 flex-shrink-0 space-y-2">
        <div className="mb-4">
          <h1 className="text-xl font-black text-slate-900">DSA Visualizer</h1>
          <p className="text-xs text-slate-500 mt-0.5">Watch algorithms come alive in real-time</p>
        </div>

        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveId(cat.id)}
            className={`w-full flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all ${
              activeId === cat.id
                ? 'bg-brand-50 border-brand-300 shadow-soft-sm'
                : 'bg-white border-slate-200/80 hover:border-brand-200 hover:bg-slate-50'
            }`}
          >
            <div className={`w-9 h-9 rounded-lg bg-gradient-to-tr ${cat.color} flex items-center justify-center text-white flex-shrink-0`}>
              {cat.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-bold truncate ${activeId === cat.id ? 'text-brand-700' : 'text-slate-800'}`}>
                {cat.label}
              </p>
              <p className="text-[10px] text-slate-500 truncate">{cat.description}</p>
            </div>
            {activeId === cat.id && <ChevronRight className="w-4 h-4 text-brand-500 flex-shrink-0" />}
          </button>
        ))}

        {/* Legend */}
        <div className="pt-4 mt-4 border-t border-slate-200 space-y-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Legend</p>
          {[
            { color: 'bg-brand-500', label: 'Comparing' },
            { color: 'bg-emerald-500', label: 'Sorted / Visited' },
            { color: 'bg-amber-400', label: 'Current / Active' },
            { color: 'bg-slate-300', label: 'Unvisited' },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded ${color}`} />
              <span className="text-[11px] text-slate-600 font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Visualizer */}
      <div className="flex-1 bg-white rounded-2xl border border-slate-200/80 shadow-soft-sm overflow-hidden">
        <div className={`h-1.5 bg-gradient-to-r ${activeCategory?.color}`} />
        <div className="p-5 h-full">
          {ActiveComponent && <ActiveComponent />}
        </div>
      </div>
    </div>
  );
};
