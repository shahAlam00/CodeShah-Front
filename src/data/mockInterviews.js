export const mockInterviewTracks = [
  {
    id: "technical-dsa",
    title: "DSA & Algorithmic Problem Solving",
    description: "Rigorous coding round focusing on time-space tradeoffs, edge cases, clean modular code, and verbal thought process.",
    role: "Software Engineer (L4/L5)",
    icon: "Cpu",
    category: "Coding",
    durationOptions: [30, 45, 60],
    defaultDuration: 45,
    difficulties: ["Easy", "Medium", "Hard"],
    suggestedQuestions: [
      {
        id: "int-dsa-1",
        type: "coding",
        title: "Find Longest Substring Without Repeating Characters",
        slug: "longest-substring-without-repeating-characters",
        timeLimit: 25,
        interviewerPrompt: "Hello! Today we will work on a string problem. Take a look at the prompt in front of you. Can you first walk me through your high-level approach before writing any code?",
        followUps: [
          "What is the time complexity if the alphabet is limited to ASCII vs Unicode?",
          "Can you optimize the space if we only have lowercase English characters?"
        ]
      },
      {
        id: "int-dsa-2",
        type: "coding",
        title: "Course Schedule Cycle Detection",
        slug: "course-schedule",
        timeLimit: 20,
        interviewerPrompt: "Great job! Let's move to a graph problem. We need to determine if all courses can be finished given prerequisite dependencies. How would you model this?",
        followUps: [
          "How does Kahn's algorithm (topological sort via BFS) compare to DFS cycle detection?",
          "What if we need to return the actual ordering of courses instead of just a boolean?"
        ]
      }
    ]
  },
  {
    id: "frontend-system-design",
    title: "Frontend Architecture & Coding",
    description: "Deep dive into component hierarchy, state synchronization, caching, virtualization, and accessibility.",
    role: "Senior Frontend Engineer",
    icon: "Layout",
    category: "Frontend",
    durationOptions: [45, 60],
    defaultDuration: 45,
    difficulties: ["Medium", "Hard"],
    suggestedQuestions: [
      {
        id: "int-fe-1",
        type: "system-design",
        title: "Design an Infinite Scrolling Feed (e.g. Twitter / Instagram)",
        timeLimit: 25,
        interviewerPrompt: "Let's design a high-performance infinite scrolling feed in React. How would you handle DOM node explosion when the user scrolls past 5,000 items?",
        followUps: [
          "How would you implement windowing or virtualization using IntersectionObserver?",
          "How do you handle variable height images and prevent layout shifts (CLS)?"
        ]
      },
      {
        id: "int-fe-2",
        type: "coding",
        title: "Implement an LRU Cache for Client-Side API Responses",
        slug: "lru-cache",
        timeLimit: 20,
        interviewerPrompt: "Now let's implement the core client-side cache data structure: an LRU Cache with O(1) reads and writes.",
        followUps: [
          "How would you integrate a TTL (time-to-live) expiration policy?",
          "What are the concurrency considerations if multiple Web Workers access this cache?"
        ]
      }
    ]
  },
  {
    id: "backend-distributed",
    title: "Backend & Distributed Systems",
    description: "Test your architectural decisions on rate limiting, database sharding, idempotent transactions, and caching.",
    role: "Senior Backend / Platform Engineer",
    icon: "Server",
    category: "Backend",
    durationOptions: [45, 60],
    defaultDuration: 45,
    difficulties: ["Medium", "Hard"],
    suggestedQuestions: [
      {
        id: "int-be-1",
        type: "system-design",
        title: "Design a Distributed Rate Limiter",
        timeLimit: 25,
        interviewerPrompt: "Imagine our API gateway receives 100,000 requests/sec across 5 global regions. How would you design a rate limiter that enforces a 100 req/minute quota per user?",
        followUps: [
          "Compare Token Bucket vs Sliding Window Log algorithms.",
          "How do you handle Redis cluster failures or network partitions without degrading request latency?"
        ]
      }
    ]
  },
  {
    id: "behavioral-leadership",
    title: "Behavioral & Engineering Leadership",
    description: "STAR method interview covering conflict resolution, technical disagreements, mentoring, and delivering under tight deadlines.",
    role: "All Engineering Levels",
    icon: "Users",
    category: "Behavioral",
    durationOptions: [30, 45],
    defaultDuration: 30,
    difficulties: ["Standard"],
    suggestedQuestions: [
      {
        id: "int-bh-1",
        type: "behavioral",
        title: "Navigating Technical Disagreements",
        timeLimit: 12,
        interviewerPrompt: "Tell me about a time when you strongly disagreed with an architectural decision made by a senior teammate or tech lead. How did you handle it?",
        followUps: [
          "What was the ultimate outcome, and what did you learn from that experience?",
          "If the project had failed, how would you have handled post-mortem discussions?"
        ]
      },
      {
        id: "int-bh-2",
        type: "behavioral",
        title: "Overcoming a Critical Production Incident",
        timeLimit: 15,
        interviewerPrompt: "Describe a situation where a major bug or outage occurred in production under your watch. What was your immediate reaction and remediation?",
        followUps: [
          "How did you communicate with stakeholders and customers during the incident?",
          "What preventative mechanisms did you put in place to ensure it doesn't recur?"
        ]
      }
    ]
  }
];

export const mockInterviewFeedbackSample = {
  overallScore: 88,
  verdict: "Strong Hire",
  summary: "Candidate demonstrated exceptional algorithmic intuition, proactive communication, and structured problem decomposition. Quickly recognized the sliding window pattern and validated boundary constraints prior to coding.",
  categories: [
    { name: "Problem Solving", score: 92, max: 100, comment: "Identified optimal O(n) two-pointer/sliding window approach immediately." },
    { name: "Communication", score: 88, max: 100, comment: "Continuously verbalized thought process and proactively discussed edge cases." },
    { name: "Code Quality", score: 86, max: 100, comment: "Clean variable naming and modular helper separation. Minor room for cleaner type guards." },
    { name: "Technical Depth", score: 90, max: 100, comment: "Clear understanding of memory allocations, hash map amortized O(1) lookups, and Unicode edge cases." },
    { name: "Time Management", score: 84, max: 100, comment: "Completed coding and dry run with 6 minutes to spare." }
  ],
  strengths: [
    "Asked clarifying questions about character encoding (ASCII vs Unicode) before jumping into code.",
    "Wrote unit test cases covering empty strings, duplicate sequences, and single character inputs.",
    "Accurately derived both time and space complexity without prompting."
  ],
  areasForImprovement: [
    "Could have mentioned space-saving optimizations using fixed-size 128-element integer arrays instead of generic hash maps for ASCII inputs.",
    "Take an extra minute to sketch the sliding window pointer movement on paper before typing."
  ]
};
