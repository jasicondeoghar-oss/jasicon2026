
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, ArrowRight, Loader, Eye, EyeOff } from 'lucide-react';

const Signup: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { signup, googleLogin, user } = useAuth();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (user) {
            navigate('/dashboard', { replace: true });
        }
    }, [user, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !password) {
            return setError('Please fill all fields');
        }

        try {
            setError('');
            setLoading(true);
            await signup(email, password, name);
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Failed to create an account');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            setError('');
            setLoading(true);
            await googleLogin();
            navigate('/dashboard');
        } catch (err: any) {
            setError('Failed to sign up with Google.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80')] bg-cover bg-center relative">
            <div className="absolute inset-0 bg-[#0B0F14]/80 backdrop-blur-sm"></div>

            <div className="relative z-10 w-full max-w-md bg-[#121826]/90 border border-[#1F2937] p-8 rounded-2xl shadow-2xl animate-fade-in-up">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold serif text-[#C9A24D] mb-2">Create Account</h2>
                    <p className="text-sm text-[#9AA4B2]">Join us for JASICON 2026</p>
                </div>

                {error && <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-sm mb-6 text-center">{error}</div>}

                <div className="space-y-4 mb-6">
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

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-1">
                        <label className="text-xs uppercase tracking-wider font-bold text-[#9AA4B2]">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 text-[#9AA4B2]" size={18} />
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-[#0B0F14] border border-[#1F2937] rounded-xl py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-[#C9A24D] transition-colors"
                                placeholder="Dr. John Doe"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs uppercase tracking-wider font-bold text-[#9AA4B2]">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 text-[#9AA4B2]" size={18} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-[#0B0F14] border border-[#1F2937] rounded-xl py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-[#C9A24D] transition-colors"
                                placeholder="faculty@example.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs uppercase tracking-wider font-bold text-[#9AA4B2]">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 text-[#9AA4B2]" size={18} />
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-[#0B0F14] border border-[#1F2937] rounded-xl py-2.5 pl-10 pr-10 text-white focus:outline-none focus:border-[#C9A24D] transition-colors"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3 text-[#9AA4B2] hover:text-[#C9A24D] transition-colors"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#C9A24D] text-[#0B0F14] py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-white transition-all transform hover:scale-[1.02] mt-4 flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader className="animate-spin" size={20} /> : <>Sign Up <ArrowRight size={18} /></>}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-[#9AA4B2]">
                    Already have an account? <Link to="/login" className="text-[#C9A24D] hover:underline font-bold">Login here</Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
