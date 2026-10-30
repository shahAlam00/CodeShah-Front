import { runCode as apiRun, submitCode as apiSubmit } from '../api/problemApi';

/**
 * Execute user code via the backend (Judge0).
 *
 * @param {string}           code
 * @param {string}           language   - 'javascript' | 'python' | 'java' | 'cpp' | 'typescript'
 * @param {object}           problem    - must have { slug }
 * @param {'run'|'submit'}   mode
 * @returns {Promise<ExecutionResult>}
 *
 * ExecutionResult shape:
 * {
 *   success:       boolean
 *   status:        string   — 'Accepted' | 'Wrong Answer' | 'Runtime Error' |
 *                             'Compilation Error' | 'Time Limit Exceeded' |
 *                             'Rate Limited (429)' | 'API Key Error (403)' |
 *                             'Not Configured' | …
 *   providerError: string | null  — 'RATE_LIMITED' | 'FORBIDDEN' | 'CONFIG' | null
 *   message:       string | null  — human-readable provider error detail
 *   runtime:       string
 *   memory:        string
 *   passed:        number | undefined
 *   total:         number | undefined
 *   cases:         CaseResult[]
 * }
 *
 * CaseResult shape:
 * {
 *   id:       number
 *   input:    string
 *   expected: string
 *   actual:   string   — stdout, or "[Compilation Error]\n…", or "[stderr]\n…"
 *   passed:   boolean
 *   status:   string
 *   time:     string | null
 *   memory:   string | null
 * }
 */
export const executeCode = async (code, language, problem, mode = 'run', testInput = null) => {
  // ── 1. Call backend ──────────────────────────────────────────────────────
  let data;
  try {
    const apiFn = mode === 'submit' ? apiSubmit : apiRun;
    const response = mode === 'submit'
      ? await apiFn(problem.slug, code, language)
      : await apiFn(problem.slug, code, language, testInput);
    data = response.data;
  } catch (axiosErr) {
    // Network-level error (backend unreachable, CORS, etc.) — never a Judge0 error
    const httpStatus = axiosErr.response?.status;
    const serverMsg = axiosErr.response?.data?.message || axiosErr.message || 'Network error';

    // Backend returned 503 → mis-configured key (already formatted by controller)
    if (httpStatus === 503) {
      return {
        success: false,
        status: 'Not Configured',
        providerError: 'CONFIG',
        message: axiosErr.response?.data?.message || serverMsg,
        runtime: '—',
        memory: '—',
        cases: [],
      };
    }

    return {
      success: false,
      status: 'Connection Error',
      providerError: null,
      message: `Could not reach the backend server: ${serverMsg}`,
      runtime: '—',
      memory: '—',
      cases: [],
    };
  }

  // ── 2. Backend returned success:false → provider error (429 / 403 / config) ──
  if (data.success === false) {
    return {
      success: false,
      status: data.status || 'Execution Error',
      providerError: data.providerError || null,
      message: data.message || 'An unknown provider error occurred.',
      runtime: '—',
      memory: '—',
      cases: normaliseCases(data.cases || []),
    };
  }

  // ── 3. Normal execution result ───────────────────────────────────────────
  return {
    success: true,
    status: data.status || 'Unknown',
    providerError: null,
    message: null,
    runtime: data.runtime || '—',
    memory: data.memory || '—',
    passed: data.passed,
    total: data.total,
    cases: normaliseCases(data.cases || []),
  };
};

// ── Helper ────────────────────────────────────────────────────────────────────
function normaliseCases(raw) {
  return raw.map((c, idx) => ({
    id: c.id ?? idx + 1,
    input: c.input ?? '',
    expected: c.expected ?? '',
    actual: c.actual ?? '',
    passed: c.passed ?? false,
    status: c.status ?? '',
    time: c.time ?? null,
    memory: c.memory ?? null,
  }));
}
