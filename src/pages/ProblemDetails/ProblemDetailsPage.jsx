import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { ChevronLeft, Terminal } from 'lucide-react';
import { Tabs } from '../../components/common/Tabs';
import { ProblemStatement } from '../../components/problem/ProblemStatement';
import { EditorialTab } from '../../components/problem/EditorialTab';
import { OfficialSolutionsTab } from '../../components/problem/OfficialSolutionsTab';
import { SubmissionsTab } from '../../components/problem/SubmissionsTab';
import { DiscussionTab } from '../../components/problem/DiscussionTab';
import { EditorToolbar } from '../../components/editor/EditorToolbar';
import { TestCasePanel } from '../../components/editor/TestCasePanel';
import { SubmissionModal } from '../../components/editor/SubmissionModal';
import { mockProblems } from '../../data/mockProblems';
import { fetchProblemBySlug } from '../../api/problemApi';
import { useProgress } from '../../context/ProgressContext';
import { useSettings } from '../../context/SettingsContext';
import { useToast } from '../../context/ToastContext';
import { executeCode } from '../../utils/codeRunner';

export const ProblemDetailsPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { recordSubmission, markSolved } = useProgress();
  const { editorSettings } = useSettings();
  const { success, error: showError } = useToast();

  const [problem, setProblem] = useState(() => mockProblems.find(p => p.slug === slug) || null);
  const [problemLoading, setProblemLoading] = useState(true);

  const [activeTab, setActiveTab] = useState('description');
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState(problem?.starterCode?.javascript || '// Write your solution here');

  // Fetch real problem from backend, fallback to mock already set in state
  useEffect(() => {
    fetchProblemBySlug(slug)
      .then(({ data }) => {
        if (data.problem) {
          const p = data.problem;
          // Normalise DB shape → UI shape:
          //   _id        → id
          //   testCases[i].expectedOutput → testCases[i].expected
          //   testCases[i]._id           → testCases[i].id
          const normalisedTestCases = (p.testCases || [])
            .filter((tc) => tc.isSample)           // only show sample cases in the panel
            .map((tc, idx) => ({
              id: tc._id ?? idx + 1,
              input: tc.input ?? '',
              expected: tc.expectedOutput ?? '',   // ← key fix: DB field → UI field
            }));

          const normalised = {
            ...p,
            id: p._id,
            testCases: normalisedTestCases,
          };
          setProblem(normalised);
          setCode(normalised.starterCode?.javascript || '// Write your solution here');
        }
      })
      .catch(() => {
        // backend not reachable — keep mock data already in state
      })
      .finally(() => setProblemLoading(false));
  }, [slug]);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [executionResult, setExecutionResult] = useState(null);
  const [isConsoleCollapsed, setIsConsoleCollapsed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [selectedTestInput, setSelectedTestInput] = useState(null);
  const [submissionRefreshKey, setSubmissionRefreshKey] = useState(0);
  const editorRef = useRef(null);

  if (!problem) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-600 gap-4">
        <Terminal className="w-12 h-12 text-slate-300" />
        <p className="text-lg font-bold">Problem not found</p>
        <Link to="/problems" className="text-brand-600 hover:underline text-sm font-semibold">← Back to Problems</Link>
      </div>
    );
  }

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    // Use backend starterCode if available, otherwise show a generic placeholder
    const starter = problem.starterCode?.[lang];
    setCode(starter || `// Write your ${lang} solution here\n`);
    setExecutionResult(null);
  };

  const handleReset = () => {
    setCode(problem.starterCode?.[language] || '');
    setExecutionResult(null);
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText(code);
  };

  const handleRun = async () => {
    if (!code.trim()) { showError("Please write some code first!"); return; }
    setIsRunning(true);
    setExecutionResult(null);
    setIsConsoleCollapsed(false);
    try {
      const result = await executeCode(code, language, problem, 'run', selectedTestInput);
      setExecutionResult(result);
    } catch (e) {
      setExecutionResult({ status: 'Runtime Error', error: e.message, cases: [] });
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    if (!code.trim()) { showError("Please write some code first!"); return; }
    setIsSubmitting(true);
    setExecutionResult(null);
    setIsConsoleCollapsed(false);
    try {
      const result = await executeCode(code, language, problem, 'submit');
      // Simulate full test suite
      const fullResult = { ...result, runtime: result.runtime || `${Math.floor(Math.random() * 30 + 35)} ms`, memory: result.memory || `${(Math.random() * 6 + 36).toFixed(1)} MB` };
      setExecutionResult(fullResult);
      setSubmissionRefreshKey(k => k + 1);
      if (fullResult.status === 'Accepted') {
        markSolved(problem.id, problem.title, language);
        setShowSubmissionModal(true);
        success("🎉 Solution Accepted! All test cases passed.");
      } else {
        recordSubmission({
          id: `sub-${Date.now()}`,
          problemId: problem.id,
          problemTitle: problem.title,
          status: fullResult.status,
          runtime: fullResult.runtime,
          memory: fullResult.memory,
          language,
          timestamp: 'Just now'
        });
        showError(`Submission: ${fullResult.status}`);
      }
    } catch (e) {
      showError("Runtime Error: " + e.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const leftTabs = [
    { id: 'description', label: 'Description' },
    { id: 'editorial', label: 'Editorial' },
    { id: 'solutions', label: 'Solutions' },
    { id: 'submissions', label: 'Submissions' },
    { id: 'discussion', label: 'Discussion' },
  ];

  return (
    <div className="flex flex-col h-screen bg-slate-100 overflow-hidden">
      {/* Top Navigation Bar */}
      <div className="h-12 bg-white border-b border-slate-200 flex items-center px-4 gap-4 flex-shrink-0 z-20">
        <Link to="/problems" className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-brand-600 transition-colors">
          <ChevronLeft className="w-4 h-4" />
          Problems
        </Link>
        <div className="w-px h-4 bg-slate-200" />
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-slate-900 truncate max-w-xs">{problem.title}</span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${problem.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-800'
            : problem.difficulty === 'Medium' ? 'bg-amber-100 text-amber-800'
              : 'bg-rose-100 text-rose-800'
            }`}>
            {problem.difficulty}
          </span>
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* LEFT PANEL - Problem Description */}
        <div className={`flex flex-col bg-white border-r border-slate-200 transition-all duration-300 ${isFullscreen ? 'w-0 overflow-hidden' : 'w-full md:w-[45%] xl:w-[40%]'
          } min-w-0`}>
          {/* Left Tabs */}
          <div className="px-4 pt-3 border-b border-slate-100 flex-shrink-0">
            <Tabs
              tabs={leftTabs}
              activeTab={activeTab}
              onChange={setActiveTab}
            />
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto min-h-0">
            {activeTab === 'description' && <ProblemStatement problem={problem} />}
            {activeTab === 'editorial' && <EditorialTab problem={problem} />}
            {activeTab === 'solutions' && (
              <OfficialSolutionsTab problem={problem} />
            )}
            {activeTab === 'submissions' && <SubmissionsTab key={submissionRefreshKey} slug={slug} />}
            {activeTab === 'discussion' && <DiscussionTab problemTitle={problem.title} problemId={problem._id} />}
          </div>
        </div>

        {/* RIGHT PANEL - Code Editor */}
        <div className="flex flex-col flex-1 min-w-0 min-h-0">
          {/* Editor Toolbar */}
          <EditorToolbar
            language={language}
            onLanguageChange={handleLanguageChange}
            onReset={handleReset}
            onCopy={handleCopy}
            isFullscreen={isFullscreen}
            onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
            onRun={handleRun}
            onSubmit={handleSubmit}
            isRunning={isRunning}
            isSubmitting={isSubmitting}
          />

          {/* Monaco Editor */}
          <div className="flex-1 min-h-0">
            <Editor
              height="100%"
              language={language === 'cpp' ? 'cpp' : language}
              value={code}
              onChange={(val) => setCode(val || '')}
              onMount={(editor) => { editorRef.current = editor; }}
              theme={editorSettings.theme}
              options={{
                fontSize: editorSettings.fontSize,
                tabSize: editorSettings.tabSize,
                wordWrap: editorSettings.wordWrap,
                minimap: { enabled: editorSettings.minimap },
                fontFamily: editorSettings.fontFamily,
                lineNumbers: editorSettings.lineNumbers,
                scrollBeyondLastLine: false,
                padding: { top: 12, bottom: 12 },
                renderLineHighlight: 'gutter',
                cursorBlinking: 'smooth',
                smoothScrolling: true,
                fontLigatures: true,
              }}
            />
          </div>

          {/* Test Case Console */}
          <TestCasePanel
            testCases={problem.testCases}
            executionResult={executionResult}
            isRunning={isRunning}
            isSubmitting={isSubmitting}
            onRun={handleRun}
            onSubmit={handleSubmit}
            isCollapsed={isConsoleCollapsed}
            onToggleCollapse={() => setIsConsoleCollapsed(!isConsoleCollapsed)}
          />
        </div>
      </div>

      {/* Submission Success Modal */}
      <SubmissionModal
        isOpen={showSubmissionModal}
        onClose={() => setShowSubmissionModal(false)}
        problem={problem}
        result={executionResult}
      />
    </div>
  );
};
