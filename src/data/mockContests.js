export const mockContests = [
  {
    id: "weekly-contest-412",
    title: "Weekly Contest 412",
    type: "Weekly",
    status: "Upcoming",
    startTime: "Tomorrow at 08:00 AM UTC",
    duration: "90 Mins",
    participants: 14280,
    prizePool: "$1,500 + CodeFront Swag",
    difficulty: "Mixed (Easy to Hard)",
    registered: true,
    problems: [
      { id: "p1", title: "Minimum Operations to Equalize Array", points: 300, difficulty: "Easy" },
      { id: "p2", title: "Count Substrings with Unique Vowels", points: 400, difficulty: "Medium" },
      { id: "p3", title: "Maximum Flow in Server Topology", points: 600, difficulty: "Hard" },
      { id: "p4", title: "Lexicographically Smallest Hamiltonian Path", points: 800, difficulty: "Hard" }
    ],
    rules: [
      "No external LLM or plagiarism allowed. Code submissions are run against plagiarism detection.",
      "Penalty of 5 minutes for each wrong submission on accepted problems.",
      "Standings will be finalized 1 hour after the contest ends."
    ]
  },
  {
    id: "biweekly-contest-138",
    title: "Biweekly Contest 138",
    type: "Biweekly",
    status: "Active",
    startTime: "Started 25 mins ago",
    duration: "90 Mins",
    participants: 9840,
    prizePool: "$1,000 + Badges",
    difficulty: "Medium",
    registered: true,
    problems: [
      { id: "p1", title: "Find the Key of Numbers", points: 300, difficulty: "Easy" },
      { id: "p2", title: "Maximum Value of String Concatenation", points: 500, difficulty: "Medium" },
      { id: "p3", title: "Minimum Sum of Values and Indices", points: 600, difficulty: "Medium" },
      { id: "p4", title: "Damage Calculation with Cooldown", points: 700, difficulty: "Hard" }
    ]
  },
  {
    id: "championship-fall-2026",
    title: "CodeFront Autumn Championship 2026",
    type: "Championship",
    status: "Upcoming",
    startTime: "Sep 28, 2026, 02:00 PM UTC",
    duration: "180 Mins",
    participants: 38400,
    prizePool: "$10,000 + FAANG Fast-Track Referrals",
    difficulty: "Hard",
    registered: false,
    problems: [
      { id: "cp1", title: "Optimal Task Assignment with Deadlines", points: 400, difficulty: "Medium" },
      { id: "cp2", title: "Bitwise XOR Maximum Sequence", points: 600, difficulty: "Medium" },
      { id: "cp3", title: "Dynamic Tree Rebalancing", points: 900, difficulty: "Hard" },
      { id: "cp4", title: "Distributed Consensus Simulator", points: 1200, difficulty: "Hard" }
    ]
  },
  {
    id: "weekly-contest-411",
    title: "Weekly Contest 411",
    type: "Weekly",
    status: "Past",
    startTime: "Sep 12, 2026",
    duration: "90 Mins",
    participants: 18920,
    prizePool: "$1,500",
    difficulty: "Mixed",
    registered: true,
    userRank: 412,
    problems: [
      { id: "p1", title: "Count Substrings That Satisfy K-Constraint I", points: 300, difficulty: "Easy" },
      { id: "p2", title: "Maximum Energy Boost From Two Drinks", points: 500, difficulty: "Medium" },
      { id: "p3", title: "Find the Largest Palindrome Divisible by K", points: 600, difficulty: "Hard" },
      { id: "p4", title: "Count Substrings That Satisfy K-Constraint II", points: 800, difficulty: "Hard" }
    ]
  }
];
