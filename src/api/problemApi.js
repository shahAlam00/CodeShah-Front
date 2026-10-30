import api from '../lib/axios';

// ── Problem list & detail ─────────────────────────────────────────────────────

/** Fetch all problems (lean list, no testCases/starterCode) */
export const fetchAllProblems = (params = {}) =>
  api.get('/problem/all', { params });

/** Fetch full problem detail by slug */
export const fetchProblemBySlug = (slug) =>
  api.get(`/problem/${slug}`);

// ── Code execution ────────────────────────────────────────────────────────────

/**
 * Run code against sample test cases only.
 * @param {string} slug  - problem slug
 * @param {string} code  - user's source code
 * @param {string} language - 'javascript' | 'python' | 'java' | 'cpp' | 'typescript'
 * @param {string} [testInput] - optional custom stdin
 */
export const runCode = (slug, code, language, testInput) =>
  api.post(`/problem/${slug}/run`, { code, language, testInput });

/**
 * Submit code against all test cases (including hidden).
 * @param {string} slug
 * @param {string} code
 * @param {string} language
 */
export const submitCode = (slug, code, language) =>
  api.post(`/problem/${slug}/submit`, { code, language });
