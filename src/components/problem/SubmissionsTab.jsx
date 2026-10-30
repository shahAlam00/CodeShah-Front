import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, Clock, Zap, HardDrive, Calendar } from 'lucide-react';
import api from '../../lib/axios'; // <--- Aapka apna configured api instance

export const SubmissionsTab = ({ slug }) => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        // Base URL pehle se set hai, toh bas endpoint likhna hai
        const { data } = await api.get(`/problem/${slug}/submissions`);
        
        if (data.success) {
          setSubmissions(data.submissions || []);
        }
      } catch (error) {
        console.error("Error fetching submissions:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchSubmissions();
    } else {
      setLoading(false);
    }
  }, [slug]);

  if (loading) {
    return <div className="p-6 text-center text-xs text-slate-500">Loading submissions...</div>;
  }

  return (
    <div className="p-5 lg:p-6 text-slate-800 space-y-4 text-sm overflow-y-auto max-h-full">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-slate-900">Your Submissions</h3>
        <span className="text-xs text-slate-500 font-medium">{submissions.length} recorded</span>
      </div>

      {submissions.length === 0 ? (
        <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200">
          <Clock className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-700">No submissions yet</p>
          <p className="text-xs text-slate-500 mt-0.5">Write your solution in the editor and click Submit.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {submissions.map((sub) => (
            <div
              key={sub._id}
              className="p-3.5 bg-white rounded-xl border border-slate-200/80 shadow-soft-sm flex items-center justify-between hover:border-slate-300 transition-colors"
            >
              <div className="flex items-center gap-3">
                {sub.status === 'Accepted' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold ${
                      sub.status === 'Accepted' ? 'text-emerald-700' : 'text-rose-700'
                    }`}>
                      {sub.status}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                      {sub.language}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {new Date(sub.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="text-right text-xs">
                {sub.status === 'Accepted' ? (
                  <div className="space-y-0.5">
                    <span className="font-semibold text-slate-800 flex items-center justify-end gap-1">
                      <Zap className="w-3 h-3 text-amber-500" /> {sub.runtime}
                    </span>
                    <span className="text-slate-500 flex items-center justify-end gap-1">
                      <HardDrive className="w-3 h-3 text-sky-500" /> {sub.memory}
                    </span>
                  </div>
                ) : (
                  <span className="text-slate-400 font-mono text-[11px] max-w-[150px] truncate block">
                    {sub.errorDetails || "Failed"}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubmissionsTab;