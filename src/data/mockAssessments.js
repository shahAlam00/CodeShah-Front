export const mockAssessments = [
  {
    id: "javascript-core-assessment",
    title: "JavaScript Core & Async Mastery",
    category: "JavaScript",
    description: "Test your depth on Event Loop, Closures, Prototypal Inheritance, Promises, and Microtasks.",
    duration: 30, // minutes
    questionsCount: 15,
    difficulty: "Medium",
    attempts: 41200,
    passingScore: 70,
    skillsCovered: ["Closures", "Event Loop", "Promises & async/await", "Prototypes", "Scope"],
    questions: [
      {
        id: 1,
        question: "What is the output of the following JavaScript code snippet?",
        codeSnippet: `console.log(1);
setTimeout(() => console.log(2), 0);
Promise.resolve().then(() => console.log(3));
console.log(4);`,
        options: [
          { label: "A", text: "1, 2, 3, 4" },
          { label: "B", text: "1, 4, 3, 2" },
          { label: "C", text: "1, 4, 2, 3" },
          { label: "D", text: "1, 3, 4, 2" }
        ],
        correctAnswer: "B",
        explanation: "Synchronous code (1, 4) executes first, followed by microtasks (Promise callback: 3), and finally macrotasks (setTimeout: 2)."
      },
      {
        id: 2,
        question: "How does event delegation work in the browser DOM?",
        options: [
          { label: "A", text: "Attaching an individual event listener to every single child node" },
          { label: "B", text: "Attaching a single event listener to a parent element and taking advantage of event bubbling" },
          { label: "C", text: "Canceling all propagation using event.stopPropagation()" },
          { label: "D", text: "Dispatching custom synthetic events from the window object" }
        ],
        correctAnswer: "B",
        explanation: "Event delegation relies on event bubbling to catch events on a common parent, saving memory and handling dynamically added children."
      },
      {
        id: 3,
        question: "What will `typeof NaN` evaluate to in JavaScript?",
        options: [
          { label: "A", text: "'nan'" },
          { label: "B", text: "'undefined'" },
          { label: "C", text: "'number'" },
          { label: "D", text: "'object'" }
        ],
        correctAnswer: "C",
        explanation: "In JavaScript (per IEEE 754), NaN stands for 'Not a Number' but its primitive type is still 'number'."
      },
      {
        id: 4,
        question: "What is the primary difference between `==` and `===`?",
        options: [
          { label: "A", text: "`==` does strict equality, `===` coerces types" },
          { label: "B", text: "`===` performs type coercion before comparison" },
          { label: "C", text: "`==` performs implicit type coercion, while `===` checks both value and type without coercion" },
          { label: "D", text: "There is no difference in ES6+" }
        ],
        correctAnswer: "C",
        explanation: "`==` converts operands to the same type before comparison, whereas `===` returns false immediately if types differ."
      },
      {
        id: 5,
        question: "What happens when you return a value inside a `finally` block of a try-catch statement?",
        options: [
          { label: "A", text: "A SyntaxError is thrown" },
          { label: "B", text: "The return statement in the `finally` block overrides any previous return or thrown exception in try or catch" },
          { label: "C", text: "The `finally` return statement is ignored" },
          { label: "D", text: "Both values are returned as an array" }
        ],
        correctAnswer: "B",
        explanation: "A control flow transfer (return/throw) in `finally` unconditionally overrides any preceding return or thrown error."
      }
    ]
  },
  {
    id: "react-architecture-assessment",
    title: "React 19 & State Architecture",
    category: "React",
    description: "Evaluate your practical knowledge of React reconciliation, custom hooks, memoization, Server Components, and Suspense.",
    duration: 35,
    questionsCount: 15,
    difficulty: "Medium",
    attempts: 32500,
    passingScore: 75,
    skillsCovered: ["Hooks", "Fiber Architecture", "Suspense & SSR", "Memoization", "Context API"],
    questions: [
      {
        id: 1,
        question: "Why does React require keys when rendering lists of elements?",
        options: [
          { label: "A", text: "To uniquely style each element with CSS" },
          { label: "B", text: "To help React identify which items have changed, been added, or been removed during reconciliation" },
          { label: "C", text: "To automatically bind click listeners" },
          { label: "D", text: "To enable server-side rendering" }
        ],
        correctAnswer: "B",
        explanation: "Keys provide a stable identity across renders, allowing React Fiber to efficiently reuse DOM nodes rather than recreating them."
      },
      {
        id: 2,
        question: "When should you use `useCallback` instead of declaring a plain inline function?",
        options: [
          { label: "A", text: "On every single function inside every component" },
          { label: "B", text: "When passing the callback to an optimized child component wrapped in `React.memo` or when used in dependency arrays" },
          { label: "C", text: "Only inside useEffect" },
          { label: "D", text: "To speed up JavaScript execution" }
        ],
        correctAnswer: "B",
        explanation: "`useCallback` preserves function instance identity across renders, preventing unnecessary re-renders of memoized child components."
      },
      {
        id: 3,
        question: "What is the primary benefit of React Server Components (RSC)?",
        options: [
          { label: "A", text: "They replace CSS and Tailwind" },
          { label: "B", text: "They run exclusively on the server, producing zero client-side JavaScript bundle overhead for non-interactive UI" },
          { label: "C", text: "They eliminate the need for databases" },
          { label: "D", text: "They allow direct DOM manipulation without React" }
        ],
        correctAnswer: "B",
        explanation: "RSC allows components to execute on the server, query databases directly, and send serialized virtual DOM without shipping JS bundles to the client."
      }
    ]
  },
  {
    id: "dsa-algorithmic-assessment",
    title: "DSA & Problem Solving Benchmark",
    category: "DSA",
    description: "Benchmark your computational complexity analysis, graph traversals, and dynamic programming intuitions.",
    duration: 45,
    questionsCount: 20,
    difficulty: "Hard",
    attempts: 28900,
    passingScore: 70,
    skillsCovered: ["Big-O Analysis", "Graph BFS/DFS", "Dynamic Programming", "Trees", "Sorting"],
    questions: [
      {
        id: 1,
        question: "What is the average time complexity of searching for an element in a balanced Binary Search Tree (AVL or Red-Black)?",
        options: [
          { label: "A", text: "O(1)" },
          { label: "B", text: "O(log n)" },
          { label: "C", text: "O(n)" },
          { label: "D", text: "O(n log n)" }
        ],
        correctAnswer: "B",
        explanation: "A balanced BST maintains a height bounded by O(log n), so search traversal takes O(log n) comparisons."
      },
      {
        id: 2,
        question: "Which algorithm finds the shortest path in a weighted graph with non-negative edge weights?",
        options: [
          { label: "A", text: "Prim's Algorithm" },
          { label: "B", text: "Dijkstra's Algorithm" },
          { label: "C", text: "Kruskal's Algorithm" },
          { label: "D", text: "Floyd-Warshall Algorithm only" }
        ],
        correctAnswer: "B",
        explanation: "Dijkstra's algorithm greedily expands the frontier using a min-priority queue to compute single-source shortest paths in non-negative weighted graphs."
      }
    ]
  },
  {
    id: "nodejs-backend-assessment",
    title: "Node.js & Backend Architecture",
    category: "Backend",
    description: "Deep dive into libuv, stream piping, cluster modules, REST caching headers, and database transactions.",
    duration: 30,
    questionsCount: 15,
    difficulty: "Medium",
    attempts: 21300,
    passingScore: 70,
    skillsCovered: ["Event Loop", "Streams", "Worker Threads", "HTTP/2", "Security"],
    questions: [
      {
        id: 1,
        question: "Which phase of the Node.js event loop executes callbacks scheduled by `process.nextTick()`?",
        options: [
          { label: "A", text: "Timers phase" },
          { label: "B", text: "Poll phase" },
          { label: "C", text: "Immediately after the current operation finishes, before entering the next event loop phase" },
          { label: "D", text: "Check phase" }
        ],
        correctAnswer: "C",
        explanation: "`process.nextTick()` is part of the microtask queue that runs immediately when the current call stack clears, before moving to another phase."
      }
    ]
  }
];
