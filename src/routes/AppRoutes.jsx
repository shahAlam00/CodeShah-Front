import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { PublicLayout } from '../layouts/PublicLayout';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { CodingLayout } from '../layouts/CodingLayout';

// Public Pages
import { LandingPage } from '../pages/Landing/LandingPage';
import { LoginPage } from '../pages/Auth/LoginPage';
import { RegisterPage } from '../pages/Auth/RegisterPage';
import { ForgotPasswordPage } from '../pages/Auth/ForgotPasswordPage';

// Dashboard Pages
import { DashboardPage } from '../pages/Dashboard/DashboardPage';
import { ProblemsPage } from '../pages/Problems/ProblemsPage';

// DSA Visualizer
import { DSAVisualizerPage } from '../pages/DSAVisualizer/DSAVisualizerPage';

// Interview
import { InterviewPage } from '../pages/Interview/InterviewPage';
import { InterviewSetupPage } from '../pages/Interview/InterviewSetupPage';
import { InterviewRoomPage } from '../pages/Interview/InterviewRoomPage';

// Assessments
import { AssessmentsPage } from '../pages/Assessments/AssessmentsPage';
import { AssessmentTakePage } from '../pages/Assessments/AssessmentTakePage';
import { AssessmentResultPage } from '../pages/Assessments/AssessmentResultPage';

// Contests
import { ContestsPage } from '../pages/Contests/ContestsPage';
import { ContestDetailPage } from '../pages/Contests/ContestDetailPage';

// Leaderboard
import { LeaderboardPage } from '../pages/Leaderboard/LeaderboardPage';

// Profile
import { ProfilePage } from '../pages/Profile/ProfilePage';

// Roadmaps
import { RoadmapsPage } from '../pages/Roadmaps/RoadmapsPage';
import { RoadmapDetailPage } from '../pages/Roadmaps/RoadmapDetailPage';

// Discussions
import { DiscussionsPage } from '../pages/Discussions/DiscussionsPage';
import { DiscussionDetailPage } from '../pages/Discussions/DiscussionDetailPage';

// Settings
import { SettingsPage } from '../pages/Settings/SettingsPage';

// Coding Problem Page
import { ProblemDetailsPage } from '../pages/ProblemDetails/ProblemDetailsPage';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* ─── PUBLIC ROUTES ─── */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Route>

      {/* ─── CODING EDITOR (full screen, no sidebar) ─── */}
      <Route element={<CodingLayout />}>
        <Route path="/problems/:slug" element={<ProblemDetailsPage />} />
        <Route path="/interview/room/:trackId" element={<InterviewRoomPage />} />
      </Route>

      {/* ─── DASHBOARD ROUTES ─── */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />

        {/* Problems */}
        <Route path="/problems" element={<ProblemsPage />} />

        {/* DSA Visualizer */}
        <Route path="/visualizer" element={<DSAVisualizerPage />} />

        {/* Roadmaps */}
        <Route path="/roadmaps" element={<RoadmapsPage />} />
        <Route path="/roadmaps/:slug" element={<RoadmapDetailPage />} />

        {/* Contests */}
        <Route path="/contests" element={<ContestsPage />} />
        <Route path="/contests/:id" element={<ContestDetailPage />} />

        {/* Interview */}
        <Route path="/interview" element={<InterviewPage />} />
        <Route path="/interview/setup/:trackId" element={<InterviewSetupPage />} />

        {/* Assessments */}
        <Route path="/assessments" element={<AssessmentsPage />} />
        <Route path="/assessments/:id" element={<AssessmentTakePage />} />
        <Route path="/assessments/:id/result" element={<AssessmentResultPage />} />

        {/* Leaderboard */}
        <Route path="/leaderboard" element={<LeaderboardPage />} />

        {/* Profile */}
        <Route path="/profile/:username" element={<ProfilePage />} />

        {/* Discussions */}
        <Route path="/discussions" element={<DiscussionsPage />} />
        <Route path="/discussions/:id" element={<DiscussionDetailPage />} />

        {/* Settings */}
        <Route path="/settings" element={<SettingsPage />} />

        {/* Fallback redirect for /app root */}
        <Route path="/app" element={<Navigate to="/dashboard" replace />} />
      </Route>

      {/* ─── CATCH-ALL ─── */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};
