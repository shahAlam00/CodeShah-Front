import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Terminal,
  Code2,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Flame,
  Trophy,
  Users,
  Video,
  FileCheck2,
  Map,
  Layers,
  Zap,
  Play,
  Star,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

export const LandingPage = () => {
  const [activeVisualizerTab, setActiveVisualizerTab] = useState('bubble');

  const stats = [
    { label: "Active Developers", value: "500K+" },
    { label: "Curated Problems", value: "5,000+" },
    { label: "Technical Assessments", value: "200+" },
    { label: "Interactive Visualizations", value: "50+" }
  ];

  const features = [
    {
      icon: <Code2 className="w-6 h-6 text-brand-600" />,
      title: "Practice Problems",
      description: "5,000+ hand-curated DSA challenges tagged by company frequency, algorithmic patterns, and difficulty levels.",
      link: "/problems"
    },
    {
      icon: <Video className="w-6 h-6 text-brand-600" />,
      title: "AI Technical Interview",
      description: "Simulate live coding and behavioral rounds with an AI interviewer giving instant radar-chart feedback.",
      link: "/interview"
    },
    {
      icon: <Sparkles className="w-6 h-6 text-brand-600" />,
      title: "Interactive DSA Visualizer",
      description: "Watch algorithms execute step-by-step with synchronized pseudocode, swap highlights, and complexity bounds.",
      link: "/visualizer"
    },
    {
      icon: <Map className="w-6 h-6 text-brand-600" />,
      title: "Structured Roadmaps",
      description: "Follow sequential paths from DSA foundations to Senior System Design, Frontend, Backend, and AI Engineering.",
      link: "/roadmaps"
    },
    {
      icon: <FileCheck2 className="w-6 h-6 text-brand-600" />,
      title: "Timed Assessments",
      description: "Benchmark your domain depth with timed technical quizzes covering JavaScript, React, Node, and Algorithms.",
      link: "/assessments"
    },
    {
      icon: <Trophy className="w-6 h-6 text-brand-600" />,
      title: "Competitive Contests",
      description: "Compete in weekly and biweekly challenges against thousands of developers worldwide for ratings and prizes.",
      link: "/contests"
    }
  ];

  const dsaTopics = [
    "Arrays", "Strings", "Linked List", "Stack", "Queue",
    "Trees", "Graphs", "Dynamic Programming", "Recursion", "Backtracking",
    "Heaps", "Binary Search", "Bit Manipulation"
  ];

  const testimonials = [
    {
      name: "Devon Edwards",
      role: "Software Engineer at Google",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80",
      content: "CodeFront's interactive visualizer was the single tool that finally made complex graph BFS/DFS and DP state transitions click for me. Cleared my L4 interview in 4 weeks."
    },
    {
      name: "Sonia Morales",
      role: "Frontend Engineer at Meta",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
      content: "The AI mock interview room felt so real. The speech evaluation, follow-up edge questions, and detailed score breakdown helped me overcome interview anxiety completely."
    },
    {
      name: "Karan Johar",
      role: "Full Stack Engineer at Microsoft",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
      content: "The problem set quality and Monaco editor execution speed blow traditional platforms out of the water. Plus the streak heatmap keeps me relentlessly consistent."
    }
  ];

  return (
    <div className="space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 overflow-hidden bg-gradient-to-b from-brand-50/70 via-white to-slate-50/50 bg-grid-pattern">
        {/* Subtle glowing radial gradient accents */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-brand-400/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-200/80 text-brand-700 text-xs font-semibold shadow-soft-sm">
                <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                <span>Level Up Your Coding Journey</span>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-600" />
                <span className="text-[10px] text-brand-600 font-bold uppercase">v2.0 Live</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">
                Master DSA. <br />
                <span className="bg-gradient-to-r from-brand-600 via-sky-600 to-brand-800 bg-clip-text text-transparent">
                  Crack Interviews.
                </span> <br />
                Build Your Future.
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                The all-in-one ecosystem for ambitious engineers. Solve 5,000+ problems in a lightning-fast Monaco editor, visualize algorithms interactively, and practice with real-time AI mock interviewers.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                <Link to="/problems">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Start Coding Free
                  </Button>
                </Link>
                <Link to="/visualizer">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    Explore DSA Visualizer
                  </Button>
                </Link>
              </div>

              {/* Trust markers */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> No credit card required
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-brand-600" /> 100% Free Core Tier
                </span>
              </div>
            </div>

            {/* Right Hero Code Editor Mockup */}
            <div className="lg:col-span-6 relative">
              {/* Floating streak & solved badges */}
              <div className="absolute -top-6 -left-4 z-20 hidden sm:flex items-center gap-3 p-3 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-slate-200/80 animate-pulse-subtle">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 border border-amber-200">
                  <Flame className="w-5 h-5 fill-amber-500" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Coding Streak</p>
                  <p className="text-sm font-black text-slate-900">28 Days Active 🔥</p>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-4 z-20 hidden sm:flex items-center gap-3 p-3 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-slate-200/80">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-200">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Problems Solved</p>
                  <p className="text-sm font-black text-slate-900">486 / 3,100 (Top 1.5%)</p>
                </div>
              </div>

              {/* Main Mockup Box */}
              <div className="bg-slate-900 rounded-3xl shadow-2xl border border-slate-800 overflow-hidden">
                {/* Editor Window Header */}
                <div className="h-10 bg-slate-950 px-4 flex items-center justify-between border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="ml-3 text-xs font-mono text-slate-400">two-sum.js — CodeFront Studio</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                      Accepted ✓ (42 ms)
                    </span>
                  </div>
                </div>

                {/* Problem snippet preview */}
                <div className="p-4 bg-slate-850 border-b border-slate-800 text-xs text-slate-300 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-100">1. Two Sum</span>
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-950 text-emerald-400 rounded">Easy</span>
                  </div>
                  <span className="text-slate-400 text-[11px]">Hash Table • O(N)</span>
                </div>

                {/* Code syntax mockup */}
                <div className="p-5 font-mono text-xs leading-relaxed text-slate-300 space-y-1 bg-slate-900/90">
                  <p><span className="text-purple-400">function</span> <span className="text-blue-400">twoSum</span>(nums, target) &#123;</p>
                  <p className="pl-4 text-slate-500">// One-pass Hash Map for O(1) lookups</p>
                  <p className="pl-4"><span className="text-purple-400">const</span> map = <span className="text-purple-400">new</span> <span className="text-yellow-300">Map</span>();</p>
                  <p className="pl-4"><span className="text-purple-400">for</span> (<span className="text-purple-400">let</span> i = 0; i &lt; nums.length; i++) &#123;</p>
                  <p className="pl-8"><span className="text-purple-400">const</span> complement = target - nums[i];</p>
                  <p className="pl-8"><span className="text-purple-400">if</span> (map.<span className="text-blue-300">has</span>(complement)) &#123;</p>
                  <p className="pl-12 text-emerald-400 font-bold"><span className="text-purple-400">return</span> [map.<span className="text-blue-300">get</span>(complement), i];</p>
                  <p className="pl-8">&#125;</p>
                  <p className="pl-8">map.<span className="text-blue-300">set</span>(nums[i], i);</p>
                  <p className="pl-4">&#125;</p>
                  <p className="pl-4"><span className="text-purple-400">return</span> [];</p>
                  <p>&#125;</p>
                </div>

                {/* Console Output Bar */}
                <div className="p-3 bg-slate-950 border-t border-slate-800 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-400 font-mono">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Case 1: Passed [0, 1]</span>
                    <span className="text-slate-500">•</span>
                    <span>Case 2: Passed [1, 2]</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">Memory: 38.2 MB</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-soft-sm grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s, idx) => (
            <div key={idx} className="space-y-1">
              <p className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">{s.value}</p>
              <p className="text-xs sm:text-sm font-semibold text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FEATURES GRID SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="brand" size="md">Engineered For Excellence</Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Everything you need to crack FAANG & Tier-1 interviews
          </h2>
          <p className="text-sm text-slate-600">
            No more switching between five fragmented sites. From visual algorithm intuition to mock AI whiteboard interviews.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, idx) => (
            <Link
              key={idx}
              to={f.link}
              className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-soft-sm hover:shadow-soft-md hover:border-brand-300 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                  {f.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {f.description}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-brand-600 group-hover:translate-x-1 transition-transform">
                <span>Explore</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. LEARN BY DOING WORKFLOW */}
      <section className="bg-slate-900 py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-400">The Mastery Pipeline</span>
            <h2 className="text-3xl font-black tracking-tight">Learn by Doing. Retain Forever.</h2>
            <p className="text-xs sm:text-sm text-slate-400">
              A scientifically structured progression from abstract data structure concepts to real-world interview confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center">
            {[
              { step: "01", title: "DSA Fundamentals", desc: "Visualize arrays, trees & graphs" },
              { step: "02", title: "Hands-on Coding", desc: "Solve 5,000+ curated problems" },
              { step: "03", title: "Assessment", desc: "Test speed & core domain mastery" },
              { step: "04", title: "AI Mock Interview", desc: "Verbalize thought & code under pressure" },
              { step: "05", title: "Job Ready", desc: "Pass Tier-1 onsite rounds with ease" },
            ].map((st, i) => (
              <div key={i} className="p-5 bg-slate-800/80 rounded-2xl border border-slate-700/80 text-left space-y-2">
                <span className="text-xs font-mono font-bold text-brand-400">{st.step}</span>
                <h4 className="text-sm font-bold text-slate-100">{st.title}</h4>
                <p className="text-xs text-slate-400">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. POPULAR DSA TOPICS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">Essential Patterns</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              Master the Most Tested DSA Topics
            </h2>
          </div>
          <Link to="/problems">
            <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              View All Topics
            </Button>
          </Link>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {dsaTopics.map((topic) => (
            <Link
              key={topic}
              to={`/problems?topic=${topic}`}
              className="px-4 py-2.5 bg-white hover:bg-brand-50 hover:text-brand-700 hover:border-brand-300 text-slate-700 text-xs font-bold rounded-xl border border-slate-200/80 shadow-soft-sm transition-all flex items-center gap-2 group"
            >
              <span>{topic}</span>
              <span className="text-[10px] text-slate-400 group-hover:text-brand-600">→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. INTERACTIVE AI INTERVIEW HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 bg-gradient-to-tr from-brand-900 via-slate-900 to-navy-900 rounded-3xl text-white grid grid-cols-1 lg:grid-cols-2 gap-8 items-center shadow-xl">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 border border-brand-400/30 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-brand-400" />
              <span>Real-Time AI Interviewer</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
              Experience Real Interview Pressure Before The Real Thing
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Our AI interviewer listens to your explanations, suggests hints when you are stuck, checks your code against hidden test cases, and outputs a comprehensive rubric report across 5 key competencies.
            </p>

            <div className="grid grid-cols-2 gap-4 text-xs font-medium text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Technical & System Design
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> STAR Behavioral Rounds
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Live Speech Recording
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Radar Chart Scorecards
              </div>
            </div>

            <Link to="/interview">
              <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Launch Mock Interview
              </Button>
            </Link>
          </div>

          {/* Interviewer UI Card Graphic */}
          <div className="bg-slate-800/90 p-6 rounded-2xl border border-slate-700 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-700 pb-3 text-xs">
              <span className="font-bold text-slate-200">Session: Technical DSA Round (L4)</span>
              <span className="text-amber-400 font-mono">24:18 remaining</span>
            </div>

            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white font-bold">
                AI
              </div>
              <div>
                <p className="text-xs font-bold text-slate-200">Interviewer (Dr. Vance)</p>
                <p className="text-[11px] text-slate-400">"Can you explain your choice of sliding window vs two pointers?"</p>
              </div>
            </div>

            <div className="p-4 bg-emerald-950/40 rounded-xl border border-emerald-800/60 text-xs text-emerald-300 space-y-1">
              <div className="flex items-center justify-between font-bold">
                <span>Evaluation Verdict: Strong Hire</span>
                <span>Score: 88 / 100</span>
              </div>
              <p className="text-[11px] text-slate-400">Problem Solving (92) • Communication (88) • Code Quality (86)</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">Social Proof</span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Loved by 500,000+ Software Engineers
          </h2>
          <p className="text-xs text-slate-500">From aspiring bootcamp grads to Senior FAANG staff engineers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div key={idx} className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-soft-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  "{t.content}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full object-cover" />
                <div>
                  <p className="text-xs font-bold text-slate-900">{t.name}</p>
                  <p className="text-[11px] text-slate-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-8">
        <div className="p-10 sm:p-14 bg-gradient-to-b from-brand-50 to-white rounded-3xl border border-brand-200 space-y-6 shadow-soft-md">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Ready to Ace Your Next Technical Interview?
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Join thousands of developers solving problems daily, maintaining active streaks, and preparing for high-paying software engineering careers.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/register">
              <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Create Free Account
              </Button>
            </Link>
            <Link to="/problems">
              <Button variant="outline" size="lg">
                Explore Problems
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
