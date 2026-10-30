import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Terminal, Lock, Mail, User, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import api from '../../lib/axios';

export const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Visibility states for passwords
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const { success, error: toastError } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Full name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Enter a valid email address";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (!agreeTerms) newErrors.terms = "You must accept terms of service to continue";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      const response = await api.post('/user/register', {
        fullName: name,   // backend expects 'fullName'
        email,
        password,
        confirmPassword,
      });
      console.log("Full Backend Response:", response.data);

      const { user, token } = response.data;
      // token is also stored in localStorage for API calls that need it
      if (login) {
        login(user, token);
      }

      success("Account created successfully! Welcome to CodeFront.");
      navigate('/dashboard');
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Registration failed. Please try again.";
      toastError(errorMsg);
      setErrors({ server: errorMsg });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Form Area */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-16 py-12 max-w-xl mx-auto w-full">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-6">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-700 to-sky-400 flex items-center justify-center text-white">
              <Terminal className="w-5 h-5" />
            </div>
            <span className="text-xl font-black tracking-tight text-slate-900">
              Code<span className="text-brand-600">Front</span>
            </span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Create your account</h1>
          <p className="text-xs text-slate-500 mt-1">Start practicing 5,000+ coding challenges and algorithm visualizers today.</p>
        </div>

        {errors.server && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-600 text-xs rounded-xl font-medium">
            {errors.server}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <Input
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
            leftIcon={<User className="w-4 h-4" />}
            placeholder="Shaharyar Khan"
          />

          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            leftIcon={<Mail className="w-4 h-4" />}
            placeholder="you@domain.com"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                leftIcon={<Lock className="w-4 h-4" />}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[34px] text-slate-400 hover:text-slate-600 focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <div className="relative">
              <Input
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={errors.confirmPassword}
                leftIcon={<Lock className="w-4 h-4" />}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-[34px] text-slate-400 hover:text-slate-600 focus:outline-none"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="pt-1">
            <label className="flex items-start gap-2 cursor-pointer text-xs text-slate-600">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 mt-0.5"
              />
              <span>
                I agree to the <a href="#" className="font-semibold text-brand-600">Terms of Service</a> and <a href="#" className="font-semibold text-brand-600">Privacy Policy</a>.
              </span>
            </label>
            {errors.terms && <p className="text-xs text-rose-600 mt-1 font-medium">{errors.terms}</p>}
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full mt-3"
            isLoading={isLoading}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Create Free Account
          </Button>
        </form>

        <p className="text-center text-xs text-slate-500 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-brand-600 hover:text-brand-700">
            Sign in
          </Link>
        </p>
      </div>

      {/* Right Split Graphic */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-tr from-brand-900 via-slate-900 to-navy-950 p-12 flex-col justify-between text-white relative overflow-hidden">
        <div className="space-y-4 max-w-md my-auto">
          <div className="p-3 bg-brand-500/20 text-brand-300 rounded-xl text-xs font-bold inline-block">
            Start Your 30-Day Streak Challenge
          </div>
          <h2 className="text-3xl font-black tracking-tight leading-tight">
            Master Data Structures & Algorithms with Interactive Feedback
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Gain deep intuitive mastery through visual animations, real-time Monaco editor evaluations, and live mock interview scenarios.
          </p>
        </div>
      </div>
    </div>
  );
};