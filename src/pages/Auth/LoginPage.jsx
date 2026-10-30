import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Terminal, Lock, Mail, ArrowRight, Github } from 'lucide-react';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import api from '../../lib/axios'; // Import your configured axios instance

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { login: authLogin } = useAuth();
  const { success, error: toastError } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Please enter a valid email";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      // API integration matching your backend route: /api/user/login
      const response = await api.post('/user/login', {
        email,
        password,
      });
console.log("Full Backend Response:", response.data);
      const { user, token } = response.data;
      // token is also stored in localStorage for API calls that need it
      if (authLogin) {
        authLogin(user, token);
      }

      success("Welcome back! Successfully logged into CodeFront.");
      navigate('/dashboard');
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Invalid email or password.";
      toastError(errorMsg);
      setErrors({ server: errorMsg });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthLogin = (provider) => {
    // OAuth not yet implemented on the backend — placeholder only
    toastError(`${provider} login is not available yet.`);
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Form Area */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-16 py-12 max-w-xl mx-auto w-full">
        {/* Brand header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-6">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-700 to-sky-400 flex items-center justify-center text-white">
              <Terminal className="w-5 h-5" />
            </div>
            <span className="text-xl font-black tracking-tight text-slate-900">
              Code<span className="text-brand-600">Front</span>
            </span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Welcome back</h1>
          <p className="text-xs text-slate-500 mt-1">Sign in to resume your daily streak and solved challenges.</p>
        </div>

        {errors.server && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-600 text-xs rounded-xl font-medium">
            {errors.server}
          </div>
        )}

        {/* OAuth Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            type="button"
            onClick={() => handleOAuthLogin('Google')}
            className="flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Google</span>
          </button>

          <button
            type="button"
            onClick={() => handleOAuthLogin('GitHub')}
            className="flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <Github className="w-4 h-4 text-slate-900" />
            <span>GitHub</span>
          </button>
        </div>

        <div className="relative flex items-center justify-center my-4">
          <div className="border-t border-slate-200 w-full" />
          <span className="bg-white px-3 text-slate-400 text-xs uppercase font-medium">Or continue with email</span>
        </div>

        {/* Email & Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            leftIcon={<Mail className="w-4 h-4" />}
            placeholder="you@domain.com"
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            leftIcon={<Lock className="w-4 h-4" />}
            placeholder="••••••••"
          />

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-slate-600">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500"
              />
              <span>Remember me</span>
            </label>

            <Link to="/forgot-password" className="font-semibold text-brand-600 hover:text-brand-700">
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full mt-2"
            isLoading={isLoading}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Sign in to Account
          </Button>
        </form>

        <p className="text-center text-xs text-slate-500 mt-8">
          Don't have an account yet?{' '}
          <Link to="/register" className="font-bold text-brand-600 hover:text-brand-700">
            Create free account
          </Link>
        </p>
      </div>

      {/* Right Decorative Split Hero */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-tr from-brand-900 via-slate-900 to-navy-950 p-12 flex-col justify-between text-white relative overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-brand-500/20 blur-[100px] rounded-full pointer-events-none" />

        <div className="flex items-center gap-2 text-xs font-bold text-brand-300 uppercase tracking-wider">
          <Terminal className="w-4 h-4" />
          <span>CodeFront Developer Cloud</span>
        </div>

        <div className="space-y-4 max-w-md">
          <div className="p-4 bg-slate-800/80 backdrop-blur-md rounded-2xl border border-slate-700 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-emerald-400">Daily Challenge Live</span>
              <span className="text-slate-400">Streak: 28 Days</span>
            </div>
            <p className="text-sm font-black text-slate-100">Course Schedule: Cycle Detection</p>
            <p className="text-xs text-slate-400">Topological sort with Kahn's Algorithm & In-degrees</p>
          </div>

          <h2 className="text-3xl font-black tracking-tight leading-tight">
            "The fastest way to build confidence for technical whiteboard rounds."
          </h2>
          <p className="text-xs text-slate-400">
            Join over 500,000 developers preparing with real-world problems, visualizers, and AI mock interviews.
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-400">
          <span>© {new Date().getFullYear()} CodeFront</span>
          <span>•</span>
          <span>Terms & Privacy</span>
        </div>
      </div>
    </div>
  );
};