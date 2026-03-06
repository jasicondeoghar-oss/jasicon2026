
import React, { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, LogIn, Loader2, User, ArrowRight, Eye, EyeOff } from 'lucide-react';

const Login: React.FC = () => {
  const { login, googleLogin, resetPassword } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetMessage, setResetMessage] = useState({ type: '', text: '' });
  const { user } = useAuth();

  React.useEffect(() => {
    if (user) {
      const redirectPath = searchParams.get('redirect') || '/dashboard';
      navigate(redirectPath, { replace: true });
    }
  }, [user, navigate, searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      return setError('Please fill in all fields');
    }

    try {
      setError('');
      setLoading(true);
      await login(email, password);

      const redirectPath = searchParams.get('redirect') || '/dashboard';
      navigate(redirectPath, { replace: true });
    } catch (err: any) {
      setError('Failed to sign in. Please check your credentials.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setError('');
      setLoading(true);
      await googleLogin();
      const redirectPath = searchParams.get('redirect') || '/dashboard';
      navigate(redirectPath, { replace: true });
    } catch (err: any) {
      setError('Failed to sign in with Google.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) return;

    try {
      setResetLoading(true);
      setResetMessage({ type: '', text: '' });
      await resetPassword(resetEmail);
      setResetMessage({ type: 'success', text: 'Password reset email sent! Please check your inbox.' });
      setTimeout(() => {
        setShowForgotModal(false);
        setResetMessage({ type: '', text: '' });
        setResetEmail('');
      }, 5000);
    } catch (err: any) {
      console.error(err);
      setResetMessage({ type: 'error', text: 'Failed to send reset email. Please check the email address.' });
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop')] bg-cover bg-center relative">
      <div className="absolute inset-0 bg-[#0B0F14]/80 backdrop-blur-sm"></div>

      <div className="relative z-10 w-full max-w-md bg-[#121826]/90 border border-[#1F2937] p-8 rounded-2xl shadow-2xl animate-fade-in-up">
        <div className="text-center mb-8">
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C9A24D] mb-2">Member Access</div>
          <h2 className="text-3xl font-bold serif text-[#E6EAF0]">Welcome Back</h2>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-sm mb-6 text-center">{error}</div>}

        <div className="space-y-4">
          <button
            onClick={handleGoogleLogin}
            type="button"
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white text-[#0B0F14] font-bold py-3 rounded-xl hover:bg-gray-100 transition-all transform active:scale-95 disabled:opacity-70"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
            <span className="text-xs uppercase tracking-wider">Continue with Google</span>
          </button>

          <div className="relative flex items-center justify-center py-2">
            <div className="w-full h-px bg-[#1F2937]"></div>
            <span className="absolute bg-[#121826] px-4 text-[10px] font-bold uppercase tracking-widest text-[#9AA4B2]">Or use email</span>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-6 mt-6">
          <div className="space-y-2">
            <label className="text-[9px] uppercase tracking-[0.2em] text-[#9AA4B2] font-black">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1F2937] group-focus-within:text-[#C9A24D] transition-colors" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0B0F14]/50 border border-[#1F2937] rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-[#C9A24D] transition-all text-sm text-white"
                placeholder="name@example.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[9px] uppercase tracking-[0.2em] text-[#9AA4B2] font-black">Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1F2937] group-focus-within:text-[#C9A24D] transition-colors" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0B0F14]/50 border border-[#1F2937] rounded-xl pl-12 pr-12 py-3 focus:outline-none focus:border-[#C9A24D] transition-all text-sm text-white"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1F2937] hover:text-[#C9A24D] transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="text-[10px] uppercase tracking-wider text-[#C9A24D] hover:underline font-bold"
              >
                Forgot Password?
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#C9A24D] text-[#0B0F14] font-black text-[10px] uppercase tracking-[0.2em] py-4 rounded-xl flex items-center justify-center space-x-2 hover:bg-white transition-all transform active:scale-95 shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <><span>Login</span> <ArrowRight size={18} /></>}
          </button>
        </form>

        <div className="mt-8 text-center pt-6 border-t border-[#1F2937]">
          <p className="text-sm text-[#9AA4B2]">
            Don't have an account?
            <Link to="/signup" className="text-[#C9A24D] font-bold ml-2 hover:underline">Register Now</Link>
          </p>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B0F14]/90 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-sm bg-[#121826] border border-[#1C2533] p-8 rounded-2xl shadow-2xl relative">
            <button
              onClick={() => setShowForgotModal(false)}
              className="absolute top-4 right-4 text-[#9AA4B2] hover:text-white transition-colors"
            >
              <EyeOff size={20} />
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-[#C9A24D]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="text-[#C9A24D]" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Reset Password</h3>
              <p className="text-xs text-[#9AA4B2]">Enter your email address and we'll send you a link to reset your password.</p>
            </div>

            {resetMessage.text && (
              <div className={`p-3 rounded-lg text-[10px] font-bold uppercase tracking-wider mb-6 text-center ${resetMessage.type === 'success' ? 'bg-green-500/10 text-green-500 border border-green-500/50' : 'bg-red-500/10 text-red-500 border border-red-500/50'
                }`}>
                {resetMessage.text}
              </div>
            )}

            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-[0.2em] text-[#9AA4B2] font-black">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1F2937] group-focus-within:text-[#C9A24D] transition-colors" size={18} />
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="w-full bg-[#0B0F14] border border-[#1C2533] rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-[#C9A24D] transition-all text-sm text-white"
                    placeholder="name@example.com"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={resetLoading}
                className="w-full bg-[#C9A24D] text-[#0B0F14] font-black text-[10px] uppercase tracking-[0.2em] py-4 rounded-xl flex items-center justify-center space-x-2 hover:bg-white transition-all transform active:scale-95 shadow-xl disabled:opacity-70"
              >
                {resetLoading ? <Loader2 size={18} className="animate-spin" /> : <span>Send Reset Link</span>}
              </button>

              <button
                type="button"
                onClick={() => setShowForgotModal(false)}
                className="w-full text-[9px] uppercase tracking-widest text-[#9AA4B2] font-bold hover:text-white transition-colors py-2"
              >
                Back to Login
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
