// Generate realistic activity heatmap data for 2024, 2025, and 2026

function generateYearData(year) {
  const days = [];
  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year, 11, 31);
  const currentSimulatedDate = new Date(2026, 8, 19); // Sep 19, 2026

  let currentDate = new Date(startDate);
  
  while (currentDate <= endDate) {
    const dateStr = currentDate.toISOString().split('T')[0];
    const dayOfWeek = currentDate.getDay();
    const month = currentDate.getMonth();
    
    // Create realistic activity distribution with active streaks
    let count = 0;
    const isFuture = currentDate > currentSimulatedDate;

    if (!isFuture) {
      const seed = (currentDate.getDate() * 17 + month * 31 + year) % 100;
      if (seed > 30) {
        if (seed > 85) count = Math.floor(seed % 6) + 4; // 4 - 9 problems
        else if (seed > 60) count = Math.floor(seed % 4) + 2; // 2 - 5 problems
        else count = 1; // 1 problem
      }
    }

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const formattedDate = `${monthNames[month]} ${currentDate.getDate()}, ${year}`;

    days.push({
      date: dateStr,
      formattedDate,
      count,
      isFuture,
      dayOfWeek,
      month,
      problemsSolved: count > 0 ? count : 0,
      contestProblems: count >= 3 ? Math.floor(count / 2) : 0,
      assessments: count >= 5 ? 1 : 0
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return days;
}

export const mockHeatmapData = {
  2026: generateYearData(2026),
  2025: generateYearData(2025),
  2024: generateYearData(2024),
};

export const userStats = {
  name: "Shaharyar Khan",
  username: "shah",
  title: "Full Stack Engineer & Algorithms Enthusiast",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  bio: "Passionate problem solver crafting high-performance systems. Top 2% in Global Contests.",
  location: "San Francisco, CA",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  website: "https://shah.dev",
  joined: "January 2024",
  stats: {
    totalSolved: 486,
    totalQuestions: 3100,
    easy: { solved: 245, total: 820 },
    medium: { solved: 185, total: 1650 },
    hard: { solved: 56, total: 630 },
    currentStreak: 28,
    longestStreak: 74,
    globalRank: 1240,
    contestRating: 2145,
    topPercentile: "Top 1.5%",
    contestsAttended: 34
  },
  badges: [
    { id: "100-problems", name: "Century Club", description: "Solved 100+ algorithmic problems", icon: "🏆", date: "Mar 2024" },
    { id: "30-day-streak", name: "Iron Will", description: "Maintained a 30-day coding streak", icon: "🔥", date: "May 2024" },
    { id: "contest-champ", name: "Contest Knight", description: "Achieved top 5% in Weekly Contest", icon: "⚔️", date: "Aug 2024" },
    { id: "dsa-master", name: "Graph Virtuoso", description: "Solved 50+ graph & tree challenges", icon: "🌐", date: "Nov 2024" },
    { id: "interview-ace", name: "Mock Master", description: "Aced 5 mock technical interviews", icon: "🎯", date: "Feb 2025" }
  ],
  topicProgress: [
    { topic: "Arrays & Hashing", solved: 92, total: 110, percentage: 83 },
    { topic: "Two Pointers", solved: 34, total: 42, percentage: 80 },
    { topic: "Sliding Window", solved: 28, total: 35, percentage: 80 },
    { topic: "Stack & Queue", solved: 41, total: 50, percentage: 82 },
    { topic: "Binary Search", solved: 32, total: 45, percentage: 71 },
    { topic: "Linked List", solved: 38, total: 45, percentage: 84 },
    { topic: "Trees & BST", solved: 64, total: 85, percentage: 75 },
    { topic: "Graphs & BFS/DFS", solved: 52, total: 75, percentage: 69 },
    { topic: "Dynamic Programming", solved: 48, total: 95, percentage: 50 },
    { topic: "Backtracking", solved: 22, total: 40, percentage: 55 },
    { topic: "Trie & Heap", solved: 35, total: 55, percentage: 63 }
  ]
};
