import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Award, Zap, HardDrive, ArrowRight, RotateCcw } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useNavigate } from 'react-router-dom';

export const SubmissionModal = ({ isOpen, onClose, problem, result }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && result?.status === 'Accepted') {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Confetti fallback safe
      }
    }
  }, [isOpen, result]);

  if (!isOpen || !result) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-md" showClose={true}>
      <div className="text-center py-2">
        {/* Success Icon */}
        <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-emerald-200/80 shadow-soft-sm">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <h3 className="text-2xl font-black text-slate-900 tracking-tight">Accepted</h3>
        <p className="text-xs text-slate-500 mt-1">
          All test cases passed successfully for <strong className="text-slate-800">{problem?.title}</strong>
        </p>

        {/* Runtime & Memory Stats Cards */}
        <div className="grid grid-cols-2 gap-3 my-6">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 text-left">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Runtime</span>
            </div>
            <p className="text-lg font-black text-slate-900">{result.runtime || "42 ms"}</p>
            <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">Beats 92.4% of submissions</p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 text-left">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
              <HardDrive className="w-3.5 h-3.5 text-sky-500" />
              <span>Memory</span>
            </div>
            <p className="text-lg font-black text-slate-900">{result.memory || "38.2 MB"}</p>
            <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">Beats 86.1% of submissions</p>
          </div>
        </div>

        {/* Testcase verification breakdown */}
        <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 flex items-center justify-between text-xs text-emerald-900 mb-6 font-medium">
          <span>Test cases passed:</span>
          <span className="font-bold">52 / 52 Passed ✓</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="flex-1 text-xs"
            onClick={onClose}
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            Review Code
          </Button>

          <Button
            variant="primary"
            className="flex-1 text-xs"
            onClick={() => {
              onClose();
              navigate('/problems');
            }}
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            Next Problem
          </Button>
        </div>
      </div>
    </Modal>
  );
};
