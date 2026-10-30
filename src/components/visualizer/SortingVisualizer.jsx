import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  Sliders,
  Sparkles,
  Info,
  Code
} from 'lucide-react';
import { Button } from '../common/Button';

export const SortingVisualizer = () => {
  const [array, setArray] = useState([45, 22, 78, 31, 89, 14, 65, 50, 92, 28, 60, 38]);
  const [algorithm, setAlgorithm] = useState('bubble'); // bubble, selection, insertion, merge, quick
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(400); // ms per step
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [steps, setSteps] = useState([]);
  const timerRef = useRef(null);

  // Generate sorting animation trace steps
  const generateSteps = (initialArr, algo) => {
    const trace = [];
    const arr = [...initialArr];
    const n = arr.length;

    trace.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: [],
      explanation: `Initial array state with ${n} elements. Ready to execute ${algo.toUpperCase()} sort.`,
      activeCodeLine: 1
    });

    if (algo === 'bubble') {
      const sortedIndices = [];
      for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
          trace.push({
            array: [...arr],
            comparing: [j, j + 1],
            swapping: [],
            sorted: [...sortedIndices],
            explanation: `Comparing element ${arr[j]} at index ${j} and ${arr[j + 1]} at index ${j + 1}.`,
            activeCodeLine: 3
          });

          if (arr[j] > arr[j + 1]) {
            // Swap
            const temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;

            trace.push({
              array: [...arr],
              comparing: [],
              swapping: [j, j + 1],
              sorted: [...sortedIndices],
              explanation: `Since ${arr[j + 1]} < ${arr[j]}, we swap them to place larger value to the right.`,
              activeCodeLine: 4
            });
          }
        }
        sortedIndices.push(n - i - 1);
      }
      sortedIndices.push(0);
      trace.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: Array.from({ length: n }, (_, k) => k),
        explanation: "Sorting complete! All elements are arranged in ascending order.",
        activeCodeLine: 6
      });
    } else if (algo === 'selection') {
      const sortedIndices = [];
      for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
          trace.push({
            array: [...arr],
            comparing: [minIdx, j],
            swapping: [],
            sorted: [...sortedIndices],
            explanation: `Checking if element at index ${j} (${arr[j]}) is smaller than current minimum (${arr[minIdx]}).`,
            activeCodeLine: 3
          });
          if (arr[j] < arr[minIdx]) {
            minIdx = j;
          }
        }
        if (minIdx !== i) {
          const temp = arr[i];
          arr[i] = arr[minIdx];
          arr[minIdx] = temp;

          trace.push({
            array: [...arr],
            comparing: [],
            swapping: [i, minIdx],
            sorted: [...sortedIndices],
            explanation: `Swapping minimum element ${arr[i]} into sorted position index ${i}.`,
            activeCodeLine: 5
          });
        }
        sortedIndices.push(i);
      }
      sortedIndices.push(n - 1);
      trace.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: Array.from({ length: n }, (_, k) => k),
        explanation: "Selection sort finished successfully!",
        activeCodeLine: 6
      });
    } else if (algo === 'insertion') {
      const sortedIndices = [0];
      for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;
        trace.push({
          array: [...arr],
          comparing: [i, j],
          swapping: [],
          sorted: [...sortedIndices],
          explanation: `Picked ${key} as key. Comparing against sorted prefix on the left.`,
          activeCodeLine: 2
        });
        while (j >= 0 && arr[j] > key) {
          arr[j + 1] = arr[j];
          trace.push({
            array: [...arr],
            comparing: [],
            swapping: [j, j + 1],
            sorted: [...sortedIndices],
            explanation: `Shifted ${arr[j]} right because it is greater than key ${key}.`,
            activeCodeLine: 4
          });
          j = j - 1;
        }
        arr[j + 1] = key;
        sortedIndices.push(i);
      }
      trace.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: Array.from({ length: n }, (_, k) => k),
        explanation: "Insertion sort complete!",
        activeCodeLine: 6
      });
    } else {
      // Quick sort simplified trace
      trace.push({
        array: [...arr.sort((a, b) => a - b)],
        comparing: [],
        swapping: [],
        sorted: Array.from({ length: n }, (_, k) => k),
        explanation: "Partitioning around pivot element recursively O(N log N).",
        activeCodeLine: 4
      });
    }

    return trace;
  };

  // Reset and generate array
  const handleRandomizeArray = () => {
    setIsPlaying(false);
    clearInterval(timerRef.current);
    const newArr = Array.from({ length: 12 }, () => Math.floor(Math.random() * 85) + 12);
    setArray(newArr);
    const newSteps = generateSteps(newArr, algorithm);
    setSteps(newSteps);
    setCurrentStepIndex(0);
  };

  useEffect(() => {
    const newSteps = generateSteps(array, algorithm);
    setSteps(newSteps);
    setCurrentStepIndex(0);
    setIsPlaying(false);
    clearInterval(timerRef.current);
  }, [algorithm]);

  // Autoplay ticker
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev < steps.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            clearInterval(timerRef.current);
            return prev;
          }
        });
      }, speed);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isPlaying, steps, speed]);

  const currentStep = steps[currentStepIndex] || {
    array,
    comparing: [],
    swapping: [],
    sorted: [],
    explanation: "Ready to start",
    activeCodeLine: 1
  };

  const complexities = {
    bubble: { time: 'O(n²)', space: 'O(1)', best: 'O(n)' },
    selection: { time: 'O(n²)', space: 'O(1)', best: 'O(n²)' },
    insertion: { time: 'O(n²)', space: 'O(1)', best: 'O(n)' },
    merge: { time: 'O(n log n)', space: 'O(n)', best: 'O(n log n)' },
    quick: { time: 'O(n log n)', space: 'O(log n)', best: 'O(n log n)' }
  };

  const pseudocode = {
    bubble: [
      "1. for i from 0 to n-1:",
      "2.   for j from 0 to n-i-2:",
      "3.     if arr[j] > arr[j+1]:",
      "4.       swap(arr[j], arr[j+1])",
      "5.     end if",
      "6.   end for"
    ],
    selection: [
      "1. for i from 0 to n-2:",
      "2.   min_idx = i",
      "3.   for j from i+1 to n-1: if arr[j] < arr[min_idx]: min_idx = j",
      "4.   if min_idx != i:",
      "5.     swap(arr[i], arr[min_idx])",
      "6.   end if"
    ],
    insertion: [
      "1. for i from 1 to n-1:",
      "2.   key = arr[i]; j = i - 1",
      "3.   while j >= 0 and arr[j] > key:",
      "4.     arr[j + 1] = arr[j]; j = j - 1",
      "5.   arr[j + 1] = key",
      "6. end for"
    ],
    quick: [
      "1. function quickSort(arr, low, high):",
      "2.   if low < high:",
      "3.     pi = partition(arr, low, high)",
      "4.     quickSort(arr, low, pi - 1)",
      "5.     quickSort(arr, pi + 1, high)",
      "6. end function"
    ]
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-soft-sm flex flex-wrap items-center justify-between gap-4">
        {/* Algorithm selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Algorithm:</span>
          <select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            className="p-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl text-slate-800 outline-none cursor-pointer"
          >
            <option value="bubble">Bubble Sort</option>
            <option value="selection">Selection Sort</option>
            <option value="insertion">Insertion Sort</option>
            <option value="quick">Quick Sort</option>
          </select>
        </div>

        {/* Playback buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleRandomizeArray}
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            New Array
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsPlaying(!isPlaying)}
            leftIcon={isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </Button>

          <Button
            variant="outline"
            size="sm"
            disabled={isPlaying || currentStepIndex >= steps.length - 1}
            onClick={() => setCurrentStepIndex(prev => Math.min(steps.length - 1, prev + 1))}
            leftIcon={<SkipForward className="w-3.5 h-3.5" />}
          >
            Step
          </Button>
        </div>

        {/* Speed Slider */}
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <span>Speed:</span>
          <input
            type="range"
            min="100"
            max="1000"
            step="100"
            value={1100 - speed}
            onChange={(e) => setSpeed(1100 - parseInt(e.target.value, 10))}
            className="w-24 accent-brand-600 cursor-pointer"
          />
          <span className="font-mono text-slate-400">{(1000 / speed).toFixed(1)}x</span>
        </div>
      </div>

      {/* Main Visual Canvas */}
      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-lg min-h-[300px] flex flex-col justify-between">
        {/* Status indicators */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-6">
          <div className="flex items-center gap-3 font-sans">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-brand-500" /> Default</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-amber-400" /> Comparing</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-rose-500" /> Swapping</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-500" /> Sorted</span>
          </div>

          <span className="font-mono text-xs">
            Step {currentStepIndex + 1} / {steps.length}
          </span>
        </div>

        {/* Bar chart representation */}
        <div className="h-48 flex items-end justify-center gap-2 sm:gap-3 px-4">
          {currentStep.array.map((val, idx) => {
            const isComparing = currentStep.comparing.includes(idx);
            const isSwapping = currentStep.swapping.includes(idx);
            const isSorted = currentStep.sorted.includes(idx);

            let barColor = "bg-brand-500 hover:bg-brand-400";
            if (isSwapping) barColor = "bg-rose-500 scale-105 shadow-glow-blue";
            else if (isComparing) barColor = "bg-amber-400 scale-105";
            else if (isSorted) barColor = "bg-emerald-500";

            const heightPercent = (val / 100) * 100;

            return (
              <div key={idx} className="flex-1 max-w-[42px] flex flex-col items-center gap-2 group transition-all duration-150">
                <span className="text-[11px] font-bold text-slate-300 font-mono">{val}</span>
                <div
                  style={{ height: `${Math.max(16, heightPercent)}%` }}
                  className={`w-full rounded-t-lg transition-all duration-200 ${barColor}`}
                />
                <span className="text-[10px] text-slate-500 font-mono">[{idx}]</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Explanation & Complexity & Pseudocode Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Step Explanation */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-soft-sm space-y-2">
          <div className="flex items-center gap-2 text-brand-600 font-bold text-xs uppercase tracking-wider">
            <Info className="w-4 h-4" />
            <span>Execution Trace</span>
          </div>
          <p className="text-sm font-semibold text-slate-800">
            Step {currentStepIndex + 1} of {steps.length}
          </p>
          <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100 min-h-[60px]">
            {currentStep.explanation}
          </p>
        </div>

        {/* Complexity Analysis */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-soft-sm space-y-3">
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Complexity Bounds</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] uppercase font-sans font-semibold text-slate-400 block">Worst Time</span>
              <span className="text-sm font-bold text-slate-900">{complexities[algorithm]?.time}</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] uppercase font-sans font-semibold text-slate-400 block">Space</span>
              <span className="text-sm font-bold text-slate-900">{complexities[algorithm]?.space}</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 font-sans">
            In-place comparisons: <strong className="text-slate-700">Stable</strong>
          </p>
        </div>

        {/* Pseudocode Tracker */}
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-soft-sm space-y-2 text-xs font-mono text-slate-300">
          <div className="flex items-center gap-2 text-brand-400 font-bold uppercase tracking-wider">
            <Code className="w-4 h-4" />
            <span>Algorithm Logic</span>
          </div>
          <div className="space-y-1 bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
            {(pseudocode[algorithm] || pseudocode.bubble).map((line, i) => (
              <div
                key={i}
                className={`px-1.5 py-0.5 rounded ${
                  currentStep.activeCodeLine === i + 1
                    ? 'bg-brand-500/20 text-brand-400 border-l-2 border-brand-400 pl-2'
                    : 'text-slate-400'
                }`}
              >
                {line}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
