export const mockDiscussions = [
  {
    id: "disc-1",
    title: "How to master Dynamic Programming patterns: 0/1 Knapsack, Longest Common Subsequence & State Machines",
    category: "DSA",
    author: {
      name: "Alexey Petrov",
      username: "algotitan",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80",
      reputation: 4980
    },
    upvotes: 428,
    commentsCount: 39,
    createdAt: "3 hours ago",
    tags: ["Dynamic Programming", "Tutorial", "Algorithms", "InterviewPrep"],
    content: `Many people get stuck on Dynamic Programming because they attempt to memorize problem solutions instead of recognizing the underlying state space transitions.

Here is the exact mental framework I used to reach 2900+ rating:
1. **Identify the Choice**: At step $i$, what decisions do I have? (Pick vs Don't Pick, Move Left vs Down).
2. **Define the Recurrence Relation**: $dp[i][w] = \max(dp[i-1][w], val[i] + dp[i-1][w - wt[i]])$.
3. **Space Optimization**: Can we collapse 2D matrices into 1D rolling arrays?

Let me know in the comments if you want a detailed breakdown of DP on Trees!`,
    comments: [
      {
        id: "c1",
        author: "priya_algo",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80",
        createdAt: "2 hours ago",
        upvotes: 45,
        content: "Brilliant explanation! Transitioning from top-down memoization to bottom-up tabulation was what finally made it click for me."
      },
      {
        id: "c2",
        author: "chen_wei",
        avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&auto=format&fit=crop&q=80",
        createdAt: "1 hour ago",
        upvotes: 18,
        content: "Yes please, do make a thread about DP on trees and rerooting technique!"
      }
    ]
  },
  {
    id: "disc-2",
    title: "Google L5 Frontend Interview Experience: What they actually look for in System Design",
    category: "Interview",
    author: {
      name: "Marcus Lindqvist",
      username: "marcus_k",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
      reputation: 3410
    },
    upvotes: 682,
    commentsCount: 78,
    createdAt: "1 day ago",
    tags: ["Google", "Frontend", "SystemDesign", "InterviewExperience"],
    content: `I recently finished my virtual onsite for a Senior Frontend role at Google. Here are the biggest takeaways:
- **Clarify Scope First**: Don't assume pagination style. Ask: infinite scroll vs cursor pagination?
- **Data Normalization**: How do you store relational data on the client? (Entities map vs raw nested arrays).
- **Offline & Optimistic UI**: Always address rollbacks if a mutation fails over slow 3G.
- **Performance**: Virtual DOM vs DOM virtualization, rendering budget (16ms per frame), CWV metrics (INP, LCP).`,
    comments: [
      {
        id: "c3",
        author: "shah",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
        createdAt: "18 hours ago",
        upvotes: 31,
        content: "Super insightful Marcus! Did they focus heavily on Web Workers or Service Workers for offline caching?"
      }
    ]
  },
  {
    id: "disc-3",
    title: "System Design: Why Redis Single-Threaded Architecture is Blazing Fast",
    category: "System Design",
    author: {
      name: "Kenji Tanaka",
      username: "kenji_t",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
      reputation: 2150
    },
    upvotes: 310,
    commentsCount: 24,
    createdAt: "2 days ago",
    tags: ["SystemDesign", "Redis", "Backend", "Architecture"],
    content: `A common interview trap: 'If Redis is single-threaded, how does it handle 100,000+ ops/sec?'
The key is:
1. In-memory operations (nanosecond DRAM latency, zero disk I/O seek).
2. Non-blocking I/O multiplexing via epoll/kqueue.
3. Zero thread context switching overhead or locks.`,
    comments: []
  },
  {
    id: "disc-4",
    title: "How to stay motivated during a 6-month coding interview grind while working full-time",
    category: "Career",
    author: {
      name: "Elena Rostova",
      username: "elena_code",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&auto=format&fit=crop&q=80",
      reputation: 1980
    },
    upvotes: 520,
    commentsCount: 62,
    createdAt: "3 days ago",
    tags: ["Career", "MentalHealth", "Habits", "Productivity"],
    content: `Solving 2 problems every morning before work > solving 10 on Sunday night. Consistency compounds!
Set a daily streak target and use CodeFront's topic roadmaps to stay structured.`,
    comments: []
  }
];

export const discussionCategories = [
  "All",
  "DSA",
  "Interview",
  "Frontend",
  "Backend",
  "System Design",
  "Career"
];
