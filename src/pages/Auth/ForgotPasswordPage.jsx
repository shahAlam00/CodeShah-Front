import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Mail, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 700);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-slate-200/80 shadow-soft-md text-center space-y-6">
        <Link to="/" className="inline-flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-700 to-sky-400 flex items-center justify-center text-white">
            <Terminal className="w-5 h-5" />
          </div>
          <span className="text-xl font-black tracking-tight text-slate-900">
            Code<span className="text-brand-600">Front</span>
          </span>
        </Link>

        {isSubmitted ? (
          <div className="space-y-4 animate-fade-in">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">Check your inbox</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              We've dispatched password reset instructions to <strong className="text-slate-800">{email}</strong>. Please check your spam folder if it doesn't appear within 2 minutes.
            </p>
            <Link to="/login" className="inline-block mt-4">
              <Button variant="secondary" size="sm" leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}>
                Back to sign in
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center space-y-1">
              <h2 className="text-2xl font-black text-slate-900">Reset password</h2>
              <p className="text-xs text-slate-500">
                Enter your account email and we'll send you instructions to reset your password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <Input
                label="Account Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                leftIcon={<Mail className="w-4 h-4" />}
                placeholder="shah@codefront.dev"
              />

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                isLoading={isLoading}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Send Reset Link
              </Button>
            </form>

            <Link to="/login" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 mt-2">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to login</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
