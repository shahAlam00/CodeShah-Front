import React, { createContext, useContext, useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useAuth } from './AuthContext';

const ProgressContext = createContext(null);

const todayStr = () => new Date().toISOString().split('T')[0];

// Per-user localStorage key helper
const key = (email, suffix) => `codefront_${email}_${suffix}`;

function computeStreak(solvedDates) {
  if (!solvedDates || Object.keys(solvedDates).length === 0) return { current: 0, longest: 0 };
  const sorted = Object.keys(solvedDates).sort();
  let longest = 1, cur = 1;
  for (let i = sorted.length - 1; i > 0; i--) {
    const diff = (new Date(sorted[i]) - new Date(sorted[i - 1])) / 86400000;
    if (diff === 1) cur++;
    else break;
  }
  let tmp = 1;
  for (let i = 1; i < sorted.length; i++) {
    const diff = (new Date(sorted[i]) - new Date(sorted[i - 1])) / 86400000;
    if (diff === 1) { tmp++; longest = Math.max(longest, tmp); }
    else tmp = 1;
  }
  longest = Math.max(longest, cur);
  const last = sorted[sorted.length - 1];
  const today = todayStr();
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  if (last !== today && last !== yesterday) cur = 0;
  return { current: cur, longest };
}

function loadFromStorage(email, suffix, fallback) {
  if (!email) return fallback;
  const saved = localStorage.getItem(key(email, suffix));
  if (saved) { try { return JSON.parse(saved); } catch (e) { } }
  return fallback;
}

export const ProgressProvider = ({ children }) => {
  const { user } = useAuth();
  const email = user?.email || null;

  // Re-initialize all state whenever the logged-in user changes
  const [solvedIds, setSolvedIds] = useState(() => loadFromStorage(email, 'solved', []));
  const [attemptedIds, setAttemptedIds] = useState(() => loadFromStorage(email, 'attempted', []));
  const [solvedDates, setSolvedDates] = useState(() => loadFromStorage(email, 'solved_dates', {}));
  const [bookmarkedIds, setBookmarkedIds] = useState(() => loadFromStorage(email, 'bookmarks', []));
  const [submissions, setSubmissions] = useState(() => loadFromStorage(email, 'submissions', []));

  // When user switches (login / logout), reload state from that user's storage
  // skipPersist ref prevents the persist effect (below) from writing the *old*
  // user's in-memory state to the *new* user's localStorage key during the same
  // render cycle — that was the root cause of solved status leaking across emails.
  const skipPersist = useRef(false);

  useEffect(() => {
    skipPersist.current = true;   // tell persist effect to skip this cycle
    setSolvedIds(loadFromStorage(email, 'solved', []));
    setAttemptedIds(loadFromStorage(email, 'attempted', []));
    setSolvedDates(loadFromStorage(email, 'solved_dates', {}));
    setBookmarkedIds(loadFromStorage(email, 'bookmarks', []));
    setSubmissions(loadFromStorage(email, 'submissions', []));
  }, [email]);

  // Persist all state to the current user's localStorage keys.
  // Single combined effect so skipPersist only needs to be checked once.
  useEffect(() => {
    if (skipPersist.current) {
      skipPersist.current = false;   // consume the skip — state will persist on the next render
      return;
    }
    if (!email) return;
    localStorage.setItem(key(email, 'solved'), JSON.stringify(solvedIds));
    localStorage.setItem(key(email, 'attempted'), JSON.stringify(attemptedIds));
    localStorage.setItem(key(email, 'solved_dates'), JSON.stringify(solvedDates));
    localStorage.setItem(key(email, 'bookmarks'), JSON.stringify(bookmarkedIds));
    localStorage.setItem(key(email, 'submissions'), JSON.stringify(submissions));
  }, [email, solvedIds, attemptedIds, solvedDates, bookmarkedIds, submissions]);

  const streakData = useMemo(() => computeStreak(solvedDates), [solvedDates]);

  // Replace local solved state with the backend's per-user solved set.
  // The backend is the source of truth — this wipes any stale localStorage
  // data that may have leaked from a previous account.
  const syncSolvedFromBackend = useCallback((backendSolvedIds = []) => {
    setSolvedIds(backendSolvedIds);
  }, []);

  const markSolved = (problemId, problemTitle, language = 'javascript') => {
    const today = todayStr();
    setSolvedIds(prev => prev.includes(problemId) ? prev : [...prev, problemId]);
    setSolvedDates(prev => ({ ...prev, [today]: (prev[today] || 0) + 1 }));
    setSubmissions(prev => [{
      id: `sub-${Date.now()}`,
      problemId, problemTitle,
      status: 'Accepted',
      runtime: `${Math.floor(Math.random() * 30 + 35)} ms`,
      memory: `${(Math.random() * 8 + 36).toFixed(1)} MB`,
      language,
      timestamp: new Date().toISOString(),
    }, ...prev]);
  };

  const recordSubmission = (submission) => {
    const today = todayStr();
    const sub = { ...submission, timestamp: submission.timestamp || new Date().toISOString() };
    setSubmissions(prev => [sub, ...prev]);
    if (submission.status === 'Accepted') {
      setSolvedIds(prev => prev.includes(submission.problemId) ? prev : [...prev, submission.problemId]);
      setSolvedDates(prev => ({ ...prev, [today]: (prev[today] || 0) + 1 }));
    } else {
      setAttemptedIds(prev => prev.includes(submission.problemId) ? prev : [...prev, submission.problemId]);
    }
  };

  const toggleBookmark = (problemId) => {
    setBookmarkedIds(prev =>
      prev.includes(problemId) ? prev.filter(id => id !== problemId) : [...prev, problemId]
    );
  };

  return (
    <ProgressContext.Provider value={{
      solvedIds,
      attemptedIds,
      bookmarkedIds,
      solvedDates,
      streak: streakData.current,
      longestStreak: streakData.longest,
      submissions,
      markSolved,
      recordSubmission,
      syncSolvedFromBackend,
      toggleBookmark,
      isSolved: (id) => solvedIds.includes(id),
      isAttempted: (id) => attemptedIds.includes(id),
      isBookmarked: (id) => bookmarkedIds.includes(id),
    }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) throw new Error('useProgress must be used within a ProgressProvider');
  return context;
};
