export const mockProblems = [
  {
    id: "two-sum",
    slug: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Arrays",
    topics: ["Array", "Hash Table"],
    companies: ["Google", "Amazon", "Apple", "Meta", "Microsoft"],
    acceptanceRate: "52.8%",
    frequency: 98,
    status: "Solved",
    description: `Given an array of integers \`nums\` and an integer \`target\`, return *indices of the two numbers such that they add up to \`target\`*.

You may assume that each input would have ***exactly one solution***, and you may not use the *same* element twice.

You can return the answer in any order.`,
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]."
      },
      {
        input: "nums = [3,3], target = 6",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 6, we return [0, 1]."
      }
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ],
    hints: [
      "A really brute force way would be to search for all possible pairs of numbers but that would be slow. Can we use extra space?",
      "Try using a hash map to look up if the complement (target - nums[i]) already exists in O(1) time."
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
      typescript: `function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement)!, i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
      python: `class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        lookup = {}
        for i, num in enumerate(nums):
            diff = target - num
            if diff in lookup:
                return [lookup[diff], i]
            lookup[num] = i
        return []`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int comp = target - nums[i];
            if (map.containsKey(comp)) {
                return new int[] { map.get(comp), i };
            }
            map.put(nums[i], i);
        }
        return new int[]{};
    }
}`,
      cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> mp;
        for (int i = 0; i < nums.size(); ++i) {
            int complement = target - nums[i];
            if (mp.count(complement)) {
                return {mp[complement], i};
            }
            mp[nums[i]] = i;
        }
        return {};
    }
};`
    },
    testCases: [
      { id: 1, input: "[2, 7, 11, 15], 9", expected: "[0, 1]" },
      { id: 2, input: "[3, 2, 4], 6", expected: "[1, 2]" },
      { id: 3, input: "[3, 3], 6", expected: "[0, 1]" }
    ],
    editorial: `### Method: One-Pass Hash Table
Instead of a nested loop checking each pair in $O(n^2)$ time, we can store each seen number and its index in a hash map.
For each element \`x\`, we check if \`target - x\` is already in the map.
- **Time Complexity:** $O(n)$ where $n$ is the array length.
- **Space Complexity:** $O(n)$ to store up to $n$ elements in the hash table.`
  },
  {
    id: "valid-parentheses",
    slug: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Stack",
    topics: ["String", "Stack"],
    companies: ["Amazon", "Google", "Microsoft", "Bloomberg"],
    acceptanceRate: "41.5%",
    frequency: 95,
    status: "Solved",
    description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    examples: [
      { input: 's = "()"', output: "true" },
      { input: 's = "()[]{}"', output: "true" },
      { input: 's = "(]"', output: "false" }
    ],
    constraints: [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only '()[]{}'."
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (const char of s) {
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char);
    } else {
      if (stack.pop() !== map[char]) return false;
    }
  }
  return stack.length === 0;
}`,
      typescript: `function isValid(s: string): boolean {
  const stack: string[] = [];
  const map: Record<string, string> = { ')': '(', '}': '{', ']': '[' };
  for (const char of s) {
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char);
    } else {
      if (stack.pop() !== map[char]) return false;
    }
  }
  return stack.length === 0;
}`,
      python: `class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        mapping = {')': '(', '}': '{', ']': '['}
        for char in s:
            if char in mapping.values():
                stack.append(char)
            elif char in mapping:
                if not stack or stack.pop() != mapping[char]:
                    return False
        return len(stack) == 0`,
      java: `class Solution {
    public boolean isValid(String s) {
        Deque<Character> stack = new ArrayDeque<>();
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c) return false;
        }
        return stack.isEmpty();
    }
}`,
      cpp: `class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        for (char c : s) {
            if (c == '(' || c == '{' || c == '[') st.push(c);
            else {
                if (st.empty()) return false;
                char top = st.top(); st.pop();
                if ((c == ')' && top != '(') ||
                    (c == '}' && top != '{') ||
                    (c == ']' && top != '[')) return false;
            }
        }
        return st.empty();
    }
};`
    },
    testCases: [
      { id: 1, input: '"()"', expected: "true" },
      { id: 2, input: '"()[]{}"', expected: "true" },
      { id: 3, input: '"(]"', expected: "false" }
    ],
    editorial: `### Method: Stack
A Last-In-First-Out (LIFO) stack is optimal. Whenever we encounter an opening bracket, we push it onto the stack. When we see a closing bracket, we check whether it matches the top of the stack.
- **Time Complexity:** $O(n)$
- **Space Complexity:** $O(n)$`
  },
  {
    id: "merge-two-sorted-lists",
    slug: "merge-two-sorted-lists",
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    category: "Linked List",
    topics: ["Linked List", "Recursion"],
    companies: ["Amazon", "Microsoft", "Apple", "Uber"],
    acceptanceRate: "64.2%",
    frequency: 90,
    status: "Attempted",
    description: `You are given the heads of two sorted linked lists \`list1\` and \`list2\`.

Merge the two lists into one **sorted** list. The list should be made by splicing together the nodes of the first two lists.

Return *the head of the merged linked list*.`,
    examples: [
      { input: "list1 = [1,2,4], list2 = [1,3,4]", output: "[1,1,2,3,4,4]" },
      { input: "list1 = [], list2 = []", output: "[]" }
    ],
    constraints: [
      "The number of nodes in both lists is in the range [0, 50].",
      "-100 <= Node.val <= 100",
      "Both list1 and list2 are sorted in non-decreasing order."
    ],
    starterCode: {
      javascript: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
function mergeTwoLists(list1, list2) {
  const dummy = { val: 0, next: null };
  let current = dummy;
  while (list1 && list2) {
    if (list1.val <= list2.val) {
      current.next = list1;
      list1 = list1.next;
    } else {
      current.next = list2;
      list2 = list2.next;
    }
    current = current.next;
  }
  current.next = list1 || list2;
  return dummy.next;
}`,
      python: `class Solution:
    def mergeTwoLists(self, list1, list2):
        dummy = ListNode()
        curr = dummy
        while list1 and list2:
            if list1.val <= list2.val:
                curr.next = list1
                list1 = list1.next
            else:
                curr.next = list2
                list2 = list2.next
            curr = curr.next
        curr.next = list1 or list2
        return dummy.next`
    },
    testCases: [
      { id: 1, input: "[1,2,4], [1,3,4]", expected: "[1,1,2,3,4,4]" },
      { id: 2, input: "[], []", expected: "[]" }
    ]
  },
  {
    id: "best-time-to-buy-and-sell-stock",
    slug: "best-time-to-buy-and-sell-stock",
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    category: "Arrays",
    topics: ["Array", "Dynamic Programming"],
    companies: ["Amazon", "Google", "Facebook", "Goldman Sachs"],
    acceptanceRate: "54.1%",
    frequency: 93,
    status: "Solved",
    description: `You are given an array \`prices\` where \`prices[i]\` is the price of a given stock on the \`i\`th day.

You want to maximize your profit by choosing a **single day** to buy one stock and choosing a **different day in the future** to sell that stock.

Return *the maximum profit you can achieve from this transaction*. If you cannot achieve any profit, return \`0\`.`,
    examples: [
      { input: "prices = [7,1,5,3,6,4]", output: "5", explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5." },
      { input: "prices = [7,6,4,3,1]", output: "0", explanation: "In this case, no transactions are done and the max profit = 0." }
    ],
    constraints: ["1 <= prices.length <= 10^5", "0 <= prices[i] <= 10^4"],
    starterCode: {
      javascript: `function maxProfit(prices) {
  let minPrice = Infinity;
  let maxProfit = 0;
  for (const price of prices) {
    if (price < minPrice) {
      minPrice = price;
    } else if (price - minPrice > maxProfit) {
      maxProfit = price - minPrice;
    }
  }
  return maxProfit;
}`,
      python: `class Solution:
    def maxProfit(self, prices: list[int]) -> int:
        min_p = float('inf')
        max_p = 0
        for p in prices:
            if p < min_p:
                min_p = p
            elif p - min_p > max_p:
                max_p = p - min_p
        return max_p`
    },
    testCases: [
      { id: 1, input: "[7, 1, 5, 3, 6, 4]", expected: "5" },
      { id: 2, input: "[7, 6, 4, 3, 1]", expected: "0" }
    ]
  },
  {
    id: "maximum-subarray",
    slug: "maximum-subarray",
    title: "Maximum Subarray",
    difficulty: "Medium",
    category: "Dynamic Programming",
    topics: ["Array", "Divide and Conquer", "Dynamic Programming"],
    companies: ["Amazon", "Microsoft", "LinkedIn", "Apple"],
    acceptanceRate: "50.4%",
    frequency: 88,
    status: "Unsolved",
    description: `Given an integer array \`nums\`, find the subarray with the largest sum, and return *its sum*.`,
    examples: [
      { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "The subarray [4,-1,2,1] has the largest sum 6." },
      { input: "nums = [1]", output: "1" },
      { input: "nums = [5,4,-1,7,8]", output: "23" }
    ],
    constraints: ["1 <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],
    starterCode: {
      javascript: `function maxSubArray(nums) {
  let currentSum = nums[0];
  let maxSum = nums[0];
  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  return maxSum;
}`,
      python: `class Solution:
    def maxSubArray(self, nums: list[int]) -> int:
        cur = max_sub = nums[0]
        for x in nums[1:]:
            cur = max(x, cur + x)
            max_sub = max(max_sub, cur)
        return max_sub`
    },
    testCases: [
      { id: 1, input: "[-2,1,-3,4,-1,2,1,-5,4]", expected: "6" },
      { id: 2, input: "[1]", expected: "1" },
      { id: 3, input: "[5,4,-1,7,8]", expected: "23" }
    ]
  },
  {
    id: "longest-substring-without-repeating-characters",
    slug: "longest-substring-without-repeating-characters",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    category: "Strings",
    topics: ["Hash Table", "String", "Sliding Window"],
    companies: ["Amazon", "Bloomberg", "Meta", "Google"],
    acceptanceRate: "34.5%",
    frequency: 94,
    status: "Solved",
    description: `Given a string \`s\`, find the length of the **longest substring** without repeating characters.`,
    examples: [
      { input: 's = "abcabcbb"', output: "3", explanation: 'The answer is "abc", with the length of 3.' },
      { input: 's = "bbbbb"', output: "1", explanation: 'The answer is "b", with the length of 1.' },
      { input: 's = "pwwkew"', output: "3", explanation: 'The answer is "wke", with the length of 3.' }
    ],
    constraints: ["0 <= s.length <= 5 * 10^4", "s consists of English letters, digits, symbols and spaces."],
    starterCode: {
      javascript: `function lengthOfLongestSubstring(s) {
  const map = new Map();
  let left = 0, maxLength = 0;
  for (let right = 0; right < s.length; right++) {
    if (map.has(s[right])) {
      left = Math.max(left, map.get(s[right]) + 1);
    }
    map.set(s[right], right);
    maxLength = Math.max(maxLength, right - left + 1);
  }
  return maxLength;
}`,
      python: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        seen = {}
        left = 0
        ans = 0
        for right, ch in enumerate(s):
            if ch in seen and seen[ch] >= left:
                left = seen[ch] + 1
            seen[ch] = right
            ans = max(ans, right - left + 1)
        return ans`
    },
    testCases: [
      { id: 1, input: '"abcabcbb"', expected: "3" },
      { id: 2, input: '"bbbbb"', expected: "1" },
      { id: 3, input: '"pwwkew"', expected: "3" }
    ]
  },
  {
    id: "number-of-islands",
    slug: "number-of-islands",
    title: "Number of Islands",
    difficulty: "Medium",
    category: "Graphs",
    topics: ["Array", "DFS", "BFS", "Union Find", "Matrix"],
    companies: ["Amazon", "Microsoft", "Google", "Bloomberg"],
    acceptanceRate: "58.2%",
    frequency: 92,
    status: "Attempted",
    description: `Given an \`m x n\` 2D binary grid \`grid\` which represents a map of \`'1'\`s (land) and \`'0'\`s (water), return *the number of islands*.

An **island** is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.`,
    examples: [
      {
        input: `grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]`,
        output: "1"
      }
    ],
    constraints: ["m == grid.length", "n == grid[i].length", "1 <= m, n <= 300", "grid[i][j] is '0' or '1'."],
    starterCode: {
      javascript: `function numIslands(grid) {
  if (!grid || grid.length === 0) return 0;
  let count = 0;
  const m = grid.length, n = grid[0].length;

  function dfs(r, c) {
    if (r < 0 || c < 0 || r >= m || c >= n || grid[r][c] === '0') return;
    grid[r][c] = '0';
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === '1') {
        count++;
        dfs(i, j);
      }
    }
  }
  return count;
}`,
      python: `class Solution:
    def numIslands(self, grid: list[list[str]]) -> int:
        if not grid: return 0
        rows, cols = len(grid), len(grid[0])
        count = 0
        def dfs(r, c):
            if r < 0 or c < 0 or r >= rows or c >= cols or grid[r][c] != '1':
                return
            grid[r][c] = '0'
            for dr, dc in ((1,0), (-1,0), (0,1), (0,-1)):
                dfs(r + dr, c + dc)
        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == '1':
                    count += 1
                    dfs(r, c)
        return count`
    },
    testCases: [
      { id: 1, input: '[["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', expected: "1" }
    ]
  },
  {
    id: "climbing-stairs",
    slug: "climbing-stairs",
    title: "Climbing Stairs",
    difficulty: "Easy",
    category: "Dynamic Programming",
    topics: ["Math", "Dynamic Programming", "Memoization"],
    companies: ["Amazon", "Google", "Apple", "Adobe"],
    acceptanceRate: "52.4%",
    frequency: 85,
    status: "Solved",
    description: `You are climbing a staircase. It takes \`n\` steps to reach the top.

Each time you can either climb \`1\` or \`2\` steps. In how many distinct ways can you climb to the top?`,
    examples: [
      { input: "n = 2", output: "2", explanation: "1. 1 step + 1 step\n2. 2 steps" },
      { input: "n = 3", output: "3", explanation: "1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step" }
    ],
    constraints: ["1 <= n <= 45"],
    starterCode: {
      javascript: `function climbStairs(n) {
  if (n <= 2) return n;
  let prev1 = 1, prev2 = 2;
  for (let i = 3; i <= n; i++) {
    const temp = prev1 + prev2;
    prev1 = prev2;
    prev2 = temp;
  }
  return prev2;
}`,
      python: `class Solution:
    def climbStairs(self, n: int) -> int:
        if n <= 2: return n
        a, b = 1, 2
        for _ in range(3, n + 1):
            a, b = b, a + b
        return b`
    },
    testCases: [
      { id: 1, input: "2", expected: "2" },
      { id: 2, input: "3", expected: "3" },
      { id: 3, input: "5", expected: "8" }
    ]
  },
  {
    id: "coin-change",
    slug: "coin-change",
    title: "Coin Change",
    difficulty: "Medium",
    category: "Dynamic Programming",
    topics: ["Array", "Dynamic Programming", "Breadth-First Search"],
    companies: ["Amazon", "Microsoft", "Uber", "Goldman Sachs"],
    acceptanceRate: "43.1%",
    frequency: 89,
    status: "Unsolved",
    description: `You are given an integer array \`coins\` representing coins of different denominations and an integer \`amount\` representing a total amount of money.

Return *the fewest number of coins that you need to make up that amount*. If that amount of money cannot be made up by any combination of the coins, return \`-1\`.

You may assume that you have an infinite number of each kind of coin.`,
    examples: [
      { input: "coins = [1,2,5], amount = 11", output: "3", explanation: "11 = 5 + 5 + 1" },
      { input: "coins = [2], amount = 3", output: "-1" },
      { input: "coins = [1], amount = 0", output: "0" }
    ],
    constraints: ["1 <= coins.length <= 12", "1 <= coins[i] <= 2^31 - 1", "0 <= amount <= 10^4"],
    starterCode: {
      javascript: `function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (i - coin >= 0) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}`,
      python: `class Solution:
    def coinChange(self, coins: list[int], amount: int) -> int:
        dp = [float('inf')] * (amount + 1)
        dp[0] = 0
        for i in range(1, amount + 1):
            for c in coins:
                if i - c >= 0:
                    dp[i] = min(dp[i], dp[i - c] + 1)
        return dp[amount] if dp[amount] != float('inf') else -1`
    },
    testCases: [
      { id: 1, input: "[1, 2, 5], 11", expected: "3" },
      { id: 2, input: "[2], 3", expected: "-1" },
      { id: 3, input: "[1], 0", expected: "0" }
    ]
  },
  {
    id: "invert-binary-tree",
    slug: "invert-binary-tree",
    title: "Invert Binary Tree",
    difficulty: "Easy",
    category: "Trees",
    topics: ["Tree", "DFS", "BFS", "Binary Tree"],
    companies: ["Google", "Amazon", "Apple", "Twitter"],
    acceptanceRate: "76.3%",
    frequency: 86,
    status: "Solved",
    description: `Given the \`root\` of a binary tree, invert the tree, and return *its root*.`,
    examples: [
      { input: "root = [4,2,7,1,3,6,9]", output: "[4,7,2,9,6,3,1]" },
      { input: "root = [2,1,3]", output: "[2,3,1]" }
    ],
    constraints: ["The number of nodes in the tree is in the range [0, 100].", "-100 <= Node.val <= 100"],
    starterCode: {
      javascript: `function invertTree(root) {
  if (!root) return null;
  const temp = root.left;
  root.left = invertTree(root.right);
  root.right = invertTree(temp);
  return root;
}`,
      python: `class Solution:
    def invertTree(self, root):
        if not root: return None
        root.left, root.right = self.invertTree(root.right), self.invertTree(root.left)
        return root`
    },
    testCases: [
      { id: 1, input: "[4,2,7,1,3,6,9]", expected: "[4,7,2,9,6,3,1]" }
    ]
  },
  {
    id: "trapping-rain-water",
    slug: "trapping-rain-water",
    title: "Trapping Rain Water",
    difficulty: "Hard",
    category: "Arrays",
    topics: ["Array", "Two Pointers", "Dynamic Programming", "Stack", "Monotonic Stack"],
    companies: ["Goldman Sachs", "Google", "Amazon", "Meta", "Bloomberg"],
    acceptanceRate: "61.2%",
    frequency: 97,
    status: "Unsolved",
    description: `Given \`n\` non-negative integers representing an elevation map where the width of each bar is \`1\`, compute how much water it can trap after raining.`,
    examples: [
      { input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", output: "6" },
      { input: "height = [4,2,0,3,2,5]", output: "9" }
    ],
    constraints: ["n == height.length", "1 <= n <= 2 * 10^4", "0 <= height[i] <= 10^5"],
    starterCode: {
      javascript: `function trap(height) {
  let left = 0, right = height.length - 1;
  let leftMax = 0, rightMax = 0;
  let trapped = 0;

  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] >= leftMax) leftMax = height[left];
      else trapped += leftMax - height[left];
      left++;
    } else {
      if (height[right] >= rightMax) rightMax = height[right];
      else trapped += rightMax - height[right];
      right--;
    }
  }
  return trapped;
}`,
      python: `class Solution:
    def trap(self, height: list[int]) -> int:
        l, r = 0, len(height) - 1
        l_max, r_max = 0, 0
        water = 0
        while l < r:
            if height[l] < height[r]:
                if height[l] >= l_max: l_max = height[l]
                else: water += l_max - height[l]
                l += 1
            else:
                if height[r] >= r_max: r_max = height[r]
                else: water += r_max - height[r]
                r -= 1
        return water`
    },
    testCases: [
      { id: 1, input: "[0,1,0,2,1,0,1,3,2,1,2,1]", expected: "6" },
      { id: 2, input: "[4,2,0,3,2,5]", expected: "9" }
    ]
  },
  {
    id: "median-of-two-sorted-arrays",
    slug: "median-of-two-sorted-arrays",
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    category: "Arrays",
    topics: ["Array", "Binary Search", "Divide and Conquer"],
    companies: ["Google", "Amazon", "Microsoft", "Apple"],
    acceptanceRate: "39.1%",
    frequency: 91,
    status: "Unsolved",
    description: `Given two sorted arrays \`nums1\` and \`nums2\` of size \`m\` and \`n\` respectively, return **the median** of the two sorted arrays.

The overall run time complexity should be \`O(log (m+n))\`.`,
    examples: [
      { input: "nums1 = [1,3], nums2 = [2]", output: "2.00000" },
      { input: "nums1 = [1,2], nums2 = [3,4]", output: "2.50000" }
    ],
    constraints: ["nums1.length == m", "nums2.length == n", "0 <= m <= 1000", "0 <= n <= 1000", "1 <= m + n <= 2000"],
    starterCode: {
      javascript: `function findMedianSortedArrays(nums1, nums2) {
  // O(log(min(m, n))) binary search partition
}`,
      python: `class Solution:
    def findMedianSortedArrays(self, nums1: list[int], nums2: list[int]) -> float:
        pass`
    },
    testCases: [
      { id: 1, input: "[1, 3], [2]", expected: "2.0" }
    ]
  },
  {
    id: "lru-cache",
    slug: "lru-cache",
    title: "LRU Cache",
    difficulty: "Medium",
    category: "Design",
    topics: ["Hash Table", "Linked List", "Design", "Doubly-Linked List"],
    companies: ["Meta", "Amazon", "Microsoft", "Netflix"],
    acceptanceRate: "42.7%",
    frequency: 96,
    status: "Solved",
    description: `Design a data structure that follows the constraints of a **Least Recently Used (LRU) cache**.

Implement the \`LRUCache\` class:
- \`LRUCache(int capacity)\` Initialize the LRU cache with positive size \`capacity\`.
- \`int get(int key)\` Return the value of the \`key\` if the key exists, otherwise return \`-1\`.
- \`void put(int key, int value)\` Update the value of the \`key\` if the \`key\` exists. Otherwise, add the \`key-value\` pair to the cache. If the number of keys exceeds the \`capacity\` from this operation, **evict** the least recently used key.

The functions \`get\` and \`put\` must each run in \`O(1)\` average time complexity.`,
    examples: [
      {
        input: '["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]\n[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]',
        output: "[null, null, null, 1, null, -1, null, -1, 3, 4]"
      }
    ],
    constraints: ["1 <= capacity <= 3000", "0 <= key <= 10^4", "0 <= value <= 10^5", "At most 2 * 10^5 calls will be made to get and put."],
    starterCode: {
      javascript: `class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
  }

  get(key) {
    if (!this.map.has(key)) return -1;
    const val = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, val);
    return val;
  }

  put(key, value) {
    if (this.map.has(key)) this.map.delete(key);
    this.map.set(key, value);
    if (this.map.size > this.capacity) {
      const firstKey = this.map.keys().next().value;
      this.map.delete(firstKey);
    }
  }
}`,
      python: `class LRUCache:
    def __init__(self, capacity: int):
        self.cap = capacity
        self.cache = OrderedDict()

    def get(self, key: int) -> int:
        if key not in self.cache: return -1
        self.cache.move_to_end(key)
        return self.cache[key]

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.cap:
            self.cache.popitem(last=False)`
    },
    testCases: [
      { id: 1, input: "Capacity 2, operations test", expected: "[null, 1, -1, 3, 4]" }
    ]
  },
  {
    id: "word-search",
    slug: "word-search",
    title: "Word Search",
    difficulty: "Medium",
    category: "Backtracking",
    topics: ["Array", "Backtracking", "Matrix"],
    companies: ["Amazon", "Uber", "Bloomberg", "Snapchat"],
    acceptanceRate: "41.8%",
    frequency: 84,
    status: "Unsolved",
    description: `Given an \`m x n\` grid of characters \`board\` and a string \`word\`, return \`true\` *if* \`word\` *exists in the grid*.

The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.`,
    examples: [
      { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"', output: "true" },
      { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"', output: "true" }
    ],
    constraints: ["m == board.length", "n = board[i].length", "1 <= m, n <= 6", "1 <= word.length <= 15"],
    starterCode: {
      javascript: `function exist(board, word) {
  // Backtracking DFS implementation
  const rows = board.length, cols = board[0].length;
  function dfs(r, c, index) {
    if (index === word.length) return true;
    if (r < 0 || c < 0 || r >= rows || c >= cols || board[r][c] !== word[index]) return false;
    const temp = board[r][c];
    board[r][c] = '#';
    const found = dfs(r+1, c, index+1) || dfs(r-1, c, index+1) || dfs(r, c+1, index+1) || dfs(r, c-1, index+1);
    board[r][c] = temp;
    return found;
  }
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (dfs(i, j, 0)) return true;
    }
  }
  return false;
}`
    },
    testCases: [
      { id: 1, input: '[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ABCCED"', expected: "true" }
    ]
  },
  {
    id: "merge-intervals",
    slug: "merge-intervals",
    title: "Merge Intervals",
    difficulty: "Medium",
    category: "Arrays",
    topics: ["Array", "Sorting"],
    companies: ["Google", "Meta", "Amazon", "Microsoft"],
    acceptanceRate: "47.2%",
    frequency: 89,
    status: "Solved",
    description: `Given an array of \`intervals\` where \`intervals[i] = [starti, endi]\`, merge all overlapping intervals, and return *an array of the non-overlapping intervals that cover all the intervals in the input*.`,
    examples: [
      { input: "intervals = [[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]" },
      { input: "intervals = [[1,4],[4,5]]", output: "[[1,5]]" }
    ],
    constraints: ["1 <= intervals.length <= 10^4", "intervals[i].length == 2", "0 <= starti <= endi <= 10^4"],
    starterCode: {
      javascript: `function merge(intervals) {
  if (!intervals.length) return [];
  intervals.sort((a, b) => a[0] - b[0]);
  const res = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    const current = intervals[i];
    const last = res[res.length - 1];
    if (current[0] <= last[1]) {
      last[1] = Math.max(last[1], current[1]);
    } else {
      res.push(current);
    }
  }
  return res;
}`
    },
    testCases: [
      { id: 1, input: "[[1,3],[2,6],[8,10],[15,18]]", expected: "[[1,6],[8,10],[15,18]]" },
      { id: 2, input: "[[1,4],[4,5]]", expected: "[[1,5]]" }
    ]
  },
  {
    id: "binary-search",
    slug: "binary-search",
    title: "Binary Search",
    difficulty: "Easy",
    category: "Searching",
    topics: ["Array", "Binary Search"],
    companies: ["Apple", "Google", "Amazon", "Microsoft"],
    acceptanceRate: "57.8%",
    frequency: 93,
    status: "Solved",
    description: `Given an array of integers \`nums\` which is sorted in ascending order, and an integer \`target\`, write a function to search \`target\` in \`nums\`. If \`target\` exists, then return its index. Otherwise, return \`-1\`.

You must write an algorithm with \`O(log n)\` runtime complexity.`,
    examples: [
      { input: "nums = [-1,0,3,5,9,12], target = 9", output: "4" },
      { input: "nums = [-1,0,3,5,9,12], target = 2", output: "-1" }
    ],
    constraints: ["1 <= nums.length <= 10^4", "-10^4 < nums[i], target < 10^4", "All the integers in nums are unique."],
    starterCode: {
      javascript: `function search(nums, target) {
  let low = 0, high = nums.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (nums[mid] === target) return mid;
    else if (nums[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}`
    },
    testCases: [
      { id: 1, input: "[-1,0,3,5,9,12], 9", expected: "4" },
      { id: 2, input: "[-1,0,3,5,9,12], 2", expected: "-1" }
    ]
  },
  {
    id: "course-schedule",
    slug: "course-schedule",
    title: "Course Schedule",
    difficulty: "Medium",
    category: "Graphs",
    topics: ["DFS", "BFS", "Graph", "Topological Sort"],
    companies: ["Amazon", "Google", "Meta", "Twitter"],
    acceptanceRate: "46.9%",
    frequency: 87,
    status: "Attempted",
    description: `There are a total of \`numCourses\` courses you have to take, labeled from \`0\` to \`numCourses - 1\`. You are given an array \`prerequisites\` where \`prerequisites[i] = [ai, bi]\` indicates that you **must** take course \`bi\` first if you want to take course \`ai\`.

Return \`true\` if you can finish all courses. Otherwise, return \`false\`.`,
    examples: [
      { input: "numCourses = 2, prerequisites = [[1,0]]", output: "true" },
      { input: "numCourses = 2, prerequisites = [[1,0],[0,1]]", output: "false" }
    ],
    constraints: ["1 <= numCourses <= 2000", "0 <= prerequisites.length <= 5000"],
    starterCode: {
      javascript: `function canFinish(numCourses, prerequisites) {
  const inDegree = new Array(numCourses).fill(0);
  const adj = Array.from({ length: numCourses }, () => []);
  for (const [course, pre] of prerequisites) {
    adj[pre].push(course);
    inDegree[course]++;
  }
  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }
  let count = 0;
  while (queue.length > 0) {
    const curr = queue.shift();
    count++;
    for (const next of adj[curr]) {
      inDegree[next]--;
      if (inDegree[next] === 0) queue.push(next);
    }
  }
  return count === numCourses;
}`
    },
    testCases: [
      { id: 1, input: "2, [[1,0]]", expected: "true" },
      { id: 2, input: "2, [[1,0],[0,1]]", expected: "false" }
    ]
  },
  {
    id: "kth-largest-element-in-an-array",
    slug: "kth-largest-element-in-an-array",
    title: "Kth Largest Element in an Array",
    difficulty: "Medium",
    category: "Heap",
    topics: ["Array", "Divide and Conquer", "Sorting", "Heap", "Quickselect"],
    companies: ["Meta", "Amazon", "Google", "Microsoft"],
    acceptanceRate: "67.1%",
    frequency: 88,
    status: "Unsolved",
    description: `Given an integer array \`nums\` and an integer \`k\`, return *the \`k\`th largest element in the array*.

Note that it is the \`k\`th largest element in the sorted order, not the \`k\`th distinct element.

Can you solve it without sorting?`,
    examples: [
      { input: "nums = [3,2,1,5,6,4], k = 2", output: "5" },
      { input: "nums = [3,2,3,1,2,4,5,5,6], k = 4", output: "4" }
    ],
    constraints: ["1 <= k <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],
    starterCode: {
      javascript: `function findKthLargest(nums, k) {
  nums.sort((a, b) => b - a);
  return nums[k - 1];
}`
    },
    testCases: [
      { id: 1, input: "[3,2,1,5,6,4], 2", expected: "5" }
    ]
  },
  {
    id: "validate-binary-search-tree",
    slug: "validate-binary-search-tree",
    title: "Validate Binary Search Tree",
    difficulty: "Medium",
    category: "Trees",
    topics: ["Tree", "DFS", "Binary Search Tree", "Binary Tree"],
    companies: ["Amazon", "Bloomberg", "Google", "Facebook"],
    acceptanceRate: "32.6%",
    frequency: 87,
    status: "Solved",
    description: `Given the \`root\` of a binary tree, *determine if it is a valid binary search tree (BST)*.

A **valid BST** is defined as follows:
- The left subtree of a node contains only nodes with keys **less than** the node's key.
- The right subtree of a node contains only nodes with keys **greater than** the node's key.
- Both the left and right subtrees must also be binary search trees.`,
    examples: [
      { input: "root = [2,1,3]", output: "true" },
      { input: "root = [5,1,4,null,null,3,6]", output: "false" }
    ],
    constraints: ["The number of nodes in the tree is in the range [1, 10^4].", "-2^31 <= Node.val <= 2^31 - 1"],
    starterCode: {
      javascript: `function isValidBST(root, min = -Infinity, max = Infinity) {
  if (!root) return true;
  if (root.val <= min || root.val >= max) return false;
  return isValidBST(root.left, min, root.val) && isValidBST(root.right, root.val, max);
}`
    },
    testCases: [
      { id: 1, input: "[2,1,3]", expected: "true" },
      { id: 2, input: "[5,1,4,null,null,3,6]", expected: "false" }
    ]
  },
  {
    id: "min-stack",
    slug: "min-stack",
    title: "Min Stack",
    difficulty: "Medium",
    category: "Stack",
    topics: ["Stack", "Design"],
    companies: ["Amazon", "Bloomberg", "Goldman Sachs"],
    acceptanceRate: "53.6%",
    frequency: 82,
    status: "Solved",
    description: `Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

Implement the \`MinStack\` class:
- \`MinStack()\` initializes the stack object.
- \`void push(int val)\` pushes the element val onto the stack.
- \`void pop()\` removes the element on the top of the stack.
- \`int top()\` gets the top element of the stack.
- \`int getMin()\` retrieves the minimum element in the stack.

You must implement a solution with \`O(1)\` time complexity for each function.`,
    examples: [
      {
        input: '["MinStack","push","push","push","getMin","pop","top","getMin"]\n[[],[-2],[0],[-3],[],[],[],[]]',
        output: "[null,null,null,null,-3,null,0,-2]"
      }
    ],
    constraints: ["-2^31 <= val <= 2^31 - 1", "Methods pop, top and getMin operations will always be called on non-empty stacks."],
    starterCode: {
      javascript: `class MinStack {
  constructor() {
    this.stack = [];
    this.minStack = [];
  }
  push(val) {
    this.stack.push(val);
    if (!this.minStack.length || val <= this.minStack[this.minStack.length - 1]) {
      this.minStack.push(val);
    }
  }
  pop() {
    const val = this.stack.pop();
    if (val === this.minStack[this.minStack.length - 1]) {
      this.minStack.pop();
    }
  }
  top() {
    return this.stack[this.stack.length - 1];
  }
  getMin() {
    return this.minStack[this.minStack.length - 1];
  }
}`
    },
    testCases: [
      { id: 1, input: "Push [-2, 0, -3], getMin, pop, top, getMin", expected: "[-3, 0, -2]" }
    ]
  },
  {
    id: "subsets",
    slug: "subsets",
    title: "Subsets",
    difficulty: "Medium",
    category: "Backtracking",
    topics: ["Array", "Backtracking", "Bit Manipulation"],
    companies: ["Meta", "Amazon", "Google", "Apple"],
    acceptanceRate: "77.5%",
    frequency: 81,
    status: "Unsolved",
    description: `Given an integer array \`nums\` of **unique** elements, return *all possible subsets (the power set)*.

The solution set **must not** contain duplicate subsets. Return the solution in **any order**.`,
    examples: [
      { input: "nums = [1,2,3]", output: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]" },
      { input: "nums = [0]", output: "[[],[0]]" }
    ],
    constraints: ["1 <= nums.length <= 10", "-10 <= nums[i] <= 10", "All the numbers of nums are unique."],
    starterCode: {
      javascript: `function subsets(nums) {
  const result = [];
  function backtrack(start, current) {
    result.push([...current]);
    for (let i = start; i < nums.length; i++) {
      current.push(nums[i]);
      backtrack(i + 1, current);
      current.pop();
    }
  }
  backtrack(0, []);
  return result;
}`
    },
    testCases: [
      { id: 1, input: "[1,2,3]", expected: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]" }
    ]
  },
  {
    id: "product-of-array-except-self",
    slug: "product-of-array-except-self",
    title: "Product of Array Except Self",
    difficulty: "Medium",
    category: "Arrays",
    topics: ["Array", "Prefix Sum"],
    companies: ["Amazon", "Apple", "Google", "Meta"],
    acceptanceRate: "66.0%",
    frequency: 91,
    status: "Solved",
    description: `Given an integer array \`nums\`, return *an array* \`answer\` *such that* \`answer[i]\` *is equal to the product of all the elements of* \`nums\` *except* \`nums[i]\`.

The product of any prefix or suffix of \`nums\` is **guaranteed** to fit in a **32-bit** integer.

You must write an algorithm that runs in \`O(n)\` time and without using the division operation.`,
    examples: [
      { input: "nums = [1,2,3,4]", output: "[24,12,8,6]" },
      { input: "nums = [-1,1,0,-3,3]", output: "[0,0,9,0,0]" }
    ],
    constraints: ["2 <= nums.length <= 10^5", "-30 <= nums[i] <= 30"],
    starterCode: {
      javascript: `function productExceptSelf(nums) {
  const n = nums.length;
  const res = new Array(n).fill(1);
  let prefix = 1;
  for (let i = 0; i < n; i++) {
    res[i] = prefix;
    prefix *= nums[i];
  }
  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) {
    res[i] *= suffix;
    suffix *= nums[i];
  }
  return res;
}`
    },
    testCases: [
      { id: 1, input: "[1,2,3,4]", expected: "[24,12,8,6]" }
    ]
  },
  {
    id: "maximum-depth-of-binary-tree",
    slug: "maximum-depth-of-binary-tree",
    title: "Maximum Depth of Binary Tree",
    difficulty: "Easy",
    category: "Trees",
    topics: ["Tree", "DFS", "BFS", "Binary Tree"],
    companies: ["Amazon", "Google", "Apple", "Microsoft"],
    acceptanceRate: "75.4%",
    frequency: 84,
    status: "Solved",
    description: `Given the \`root\` of a binary tree, return *its maximum depth*.

A binary tree's **maximum depth** is the number of nodes along the longest path from the root node down to the farthest leaf node.`,
    examples: [
      { input: "root = [3,9,20,null,null,15,7]", output: "3" },
      { input: "root = [1,null,2]", output: "2" }
    ],
    constraints: ["The number of nodes in the tree is in the range [0, 10^4].", "-100 <= Node.val <= 100"],
    starterCode: {
      javascript: `function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`
    },
    testCases: [
      { id: 1, input: "[3,9,20,null,null,15,7]", expected: "3" }
    ]
  },
  {
    id: "3sum",
    slug: "3sum",
    title: "3Sum",
    difficulty: "Medium",
    category: "Arrays",
    topics: ["Array", "Two Pointers", "Sorting"],
    companies: ["Meta", "Amazon", "Apple", "Bloomberg"],
    acceptanceRate: "34.7%",
    frequency: 92,
    status: "Attempted",
    description: `Given an integer array nums, return all the triplets \`[nums[i], nums[j], nums[k]]\` such that \`i != j\`, \`i != k\`, and \`j != k\`, and \`nums[i] + nums[j] + nums[k] == 0\`.

Notice that the solution set must not contain duplicate triplets.`,
    examples: [
      { input: "nums = [-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]" },
      { input: "nums = [0,1,1]", output: "[]" }
    ],
    constraints: ["3 <= nums.length <= 3000", "-10^5 <= nums[i] <= 10^5"],
    starterCode: {
      javascript: `function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const res = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let l = i + 1, r = nums.length - 1;
    while (l < r) {
      const sum = nums[i] + nums[l] + nums[r];
      if (sum === 0) {
        res.push([nums[i], nums[l], nums[r]]);
        while (l < r && nums[l] === nums[l + 1]) l++;
        while (l < r && nums[r] === nums[r - 1]) r--;
        l++;
        r--;
      } else if (sum < 0) l++;
      else r--;
    }
  }
  return res;
}`
    },
    testCases: [
      { id: 1, input: "[-1,0,1,2,-1,-4]", expected: "[[-1,-1,2],[-1,0,1]]" }
    ]
  },
  {
    id: "house-robber",
    slug: "house-robber",
    title: "House Robber",
    difficulty: "Medium",
    category: "Dynamic Programming",
    topics: ["Array", "Dynamic Programming"],
    companies: ["Google", "Amazon", "Microsoft", "Cisco"],
    acceptanceRate: "50.8%",
    frequency: 83,
    status: "Solved",
    description: `You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and **it will automatically contact the police if two adjacent houses were broken into on the same night**.

Given an integer array \`nums\` representing the amount of money of each house, return *the maximum amount of money you can rob tonight without alerting the police*.`,
    examples: [
      { input: "nums = [1,2,3,1]", output: "4", explanation: "Rob house 1 (money = 1) and house 3 (money = 3). Total = 1 + 3 = 4." },
      { input: "nums = [2,7,9,3,1]", output: "12", explanation: "Rob house 1, 3, and 5. Total = 2 + 9 + 1 = 12." }
    ],
    constraints: ["1 <= nums.length <= 100", "0 <= nums[i] <= 400"],
    starterCode: {
      javascript: `function rob(nums) {
  let prev1 = 0, prev2 = 0;
  for (const num of nums) {
    const temp = Math.max(prev2, prev1 + num);
    prev1 = prev2;
    prev2 = temp;
  }
  return prev2;
}`
    },
    testCases: [
      { id: 1, input: "[1,2,3,1]", expected: "4" },
      { id: 2, input: "[2,7,9,3,1]", expected: "12" }
    ]
  },
  {
    id: "container-with-most-water",
    slug: "container-with-most-water",
    title: "Container With Most Water",
    difficulty: "Medium",
    category: "Arrays",
    topics: ["Array", "Two Pointers", "Greedy"],
    companies: ["Amazon", "Google", "Facebook", "Adobe"],
    acceptanceRate: "55.0%",
    frequency: 89,
    status: "Solved",
    description: `You are given an integer array \`height\` of length \`n\`. There are \`n\` vertical lines drawn such that the two endpoints of the \`i\`th line are \`(i, 0)\` and \`(i, height[i])\`.

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return *the maximum amount of water a container can store*.`,
    examples: [
      { input: "height = [1,8,6,2,5,4,8,3,7]", output: "49" },
      { input: "height = [1,1]", output: "1" }
    ],
    constraints: ["n == height.length", "2 <= n <= 10^5", "0 <= height[i] <= 10^4"],
    starterCode: {
      javascript: `function maxArea(height) {
  let l = 0, r = height.length - 1;
  let max = 0;
  while (l < r) {
    const w = r - l;
    const h = Math.min(height[l], height[r]);
    max = Math.max(max, w * h);
    if (height[l] < height[r]) l++;
    else r--;
  }
  return max;
}`
    },
    testCases: [
      { id: 1, input: "[1,8,6,2,5,4,8,3,7]", expected: "49" }
    ]
  },
  {
    id: "group-anagrams",
    slug: "group-anagrams",
    title: "Group Anagrams",
    difficulty: "Medium",
    category: "Strings",
    topics: ["Array", "Hash Table", "String", "Sorting"],
    companies: ["Amazon", "Apple", "Google", "Meta"],
    acceptanceRate: "68.3%",
    frequency: 90,
    status: "Solved",
    description: `Given an array of strings \`strs\`, group **the anagrams** together. You can return the answer in **any order**.

An **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.`,
    examples: [
      { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]' }
    ],
    constraints: ["1 <= strs.length <= 10^4", "0 <= strs[i].length <= 100", "strs[i] consists of lowercase English letters."],
    starterCode: {
      javascript: `function groupAnagrams(strs) {
  const map = {};
  for (const s of strs) {
    const key = s.split('').sort().join('');
    if (!map[key]) map[key] = [];
    map[key].push(s);
  }
  return Object.values(map);
}`
    },
    testCases: [
      { id: 1, input: '["eat","tea","tan","ate","nat","bat"]', expected: '[["eat","tea","ate"],["tan","nat"],["bat"]]' }
    ]
  },
  {
    id: "word-break",
    slug: "word-break",
    title: "Word Break",
    difficulty: "Medium",
    category: "Dynamic Programming",
    topics: ["Hash Table", "String", "Dynamic Programming", "Trie", "Memoization"],
    companies: ["Amazon", "Bloomberg", "Google", "Meta"],
    acceptanceRate: "46.2%",
    frequency: 86,
    status: "Unsolved",
    description: `Given a string \`s\` and a dictionary of strings \`wordDict\`, return \`true\` if \`s\` can be segmented into a space-separated sequence of one or more dictionary words.

Note that the same word in the dictionary may be reused multiple times in the segmentation.`,
    examples: [
      { input: 's = "leetcode", wordDict = ["leet","code"]', output: "true" },
      { input: 's = "applepenapple", wordDict = ["apple","pen"]', output: "true" }
    ],
    constraints: ["1 <= s.length <= 300", "1 <= wordDict.length <= 1000", "1 <= wordDict[i].length <= 20"],
    starterCode: {
      javascript: `function wordBreak(s, wordDict) {
  const words = new Set(wordDict);
  const dp = new Array(s.length + 1).fill(false);
  dp[0] = true;
  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && words.has(s.substring(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }
  return dp[s.length];
}`
    },
    testCases: [
      { id: 1, input: '"leetcode", ["leet","code"]', expected: "true" }
    ]
  },
  {
    id: "implement-trie-prefix-tree",
    slug: "implement-trie-prefix-tree",
    title: "Implement Trie (Prefix Tree)",
    difficulty: "Medium",
    category: "Design",
    topics: ["Hash Table", "String", "Design", "Trie"],
    companies: ["Google", "Twitter", "Amazon", "Microsoft"],
    acceptanceRate: "65.1%",
    frequency: 84,
    status: "Attempted",
    description: `A **trie** (pronounced as "try") or **prefix tree** is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.

Implement the \`Trie\` class:
- \`Trie()\` Initializes the trie object.
- \`void insert(String word)\` Inserts the string \`word\` into the trie.
- \`boolean search(String word)\` Returns \`true\` if the string \`word\` is in the trie, and \`false\` otherwise.
- \`boolean startsWith(String prefix)\` Returns \`true\` if there is a previously inserted string \`word\` that has the prefix \`prefix\`, and \`false\` otherwise.`,
    examples: [
      {
        input: '["Trie", "insert", "search", "search", "startsWith", "insert", "search"]\n[[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]',
        output: "[null, null, true, false, true, null, true]"
      }
    ],
    constraints: ["1 <= word.length, prefix.length <= 2000", "word and prefix consist only of lowercase English letters."],
    starterCode: {
      javascript: `class Trie {
  constructor() {
    this.root = {};
  }
  insert(word) {
    let node = this.root;
    for (const char of word) {
      if (!node[char]) node[char] = {};
      node = node[char];
    }
    node.isEnd = true;
  }
  search(word) {
    let node = this.root;
    for (const char of word) {
      if (!node[char]) return false;
      node = node[char];
    }
    return !!node.isEnd;
  }
  startsWith(prefix) {
    let node = this.root;
    for (const char of prefix) {
      if (!node[char]) return false;
      node = node[char];
    }
    return true;
  }
}`
    },
    testCases: [
      { id: 1, input: "Trie operations test", expected: "[null, null, true, false, true]" }
    ]
  },
  {
    id: "n-queens",
    slug: "n-queens",
    title: "N-Queens",
    difficulty: "Hard",
    category: "Backtracking",
    topics: ["Array", "Backtracking"],
    companies: ["Google", "Amazon", "Microsoft", "Meta"],
    acceptanceRate: "68.9%",
    frequency: 85,
    status: "Unsolved",
    description: `The **n-queens** puzzle is the problem of placing \`n\` queens on an \`n x n\` chessboard such that no two queens attack each other.

Given an integer \`n\`, return *all distinct solutions to the **n-queens puzzle***. You may return the answer in **any order**.

Each solution contains a distinct board configuration of the n-queens' placement, where \`'Q'\` and \`'.'\` both indicate a queen and an empty space, respectively.`,
    examples: [
      { input: "n = 4", output: '[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]' },
      { input: "n = 1", output: '[["Q"]]' }
    ],
    constraints: ["1 <= n <= 9"],
    starterCode: {
      javascript: `function solveNQueens(n) {
  const result = [];
  const cols = new Set();
  const posDiag = new Set(); // (r + c)
  const negDiag = new Set(); // (r - c)
  const board = Array.from({ length: n }, () => new Array(n).fill('.'));

  function backtrack(r) {
    if (r === n) {
      result.push(board.map(row => row.join('')));
      return;
    }
    for (let c = 0; c < n; c++) {
      if (cols.has(c) || posDiag.has(r + c) || negDiag.has(r - c)) continue;
      cols.add(c);
      posDiag.add(r + c);
      negDiag.add(r - c);
      board[r][c] = 'Q';

      backtrack(r + 1);

      cols.delete(c);
      posDiag.delete(r + c);
      negDiag.delete(r - c);
      board[r][c] = '.';
    }
  }
  backtrack(0);
  return result;
}`
    },
    testCases: [
      { id: 1, input: "4", expected: "2 solutions" }
    ]
  }
];

export const problemTopicsList = [
  "All",
  "Array",
  "String",
  "Linked List",
  "Stack",
  "Queue",
  "Trees",
  "Graphs",
  "Dynamic Programming",
  "Backtracking",
  "Heap",
  "Searching",
  "Design"
];

export const companyList = [
  "All Companies",
  "Google",
  "Amazon",
  "Meta",
  "Microsoft",
  "Apple",
  "Netflix",
  "Bloomberg",
  "Uber"
];
