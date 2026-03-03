import { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { Lock, Mail, Shield, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminLogin: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { login, isAuthenticated, user } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated && user) {
            if (user.role === 'admin') {
                navigate('/admin/dashboard', { replace: true });
            } else if (user.role === 'reception') {
                navigate('/reception/dashboard', { replace: true });
            }
        }
    }, [isAuthenticated, user, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await api.post('/auth/admin/login', { email, password });
            if (response && response.success && response.data.token) {
                const loggedInUser = response.data.user;

                login(response.data.token, loggedInUser);

                if (loggedInUser.role === 'reception') {
                    navigate('/reception/dashboard');
                } else {
                    navigate('/admin/dashboard');
                }
            } else {
                throw new Error(response.message || 'Authentication failed. Please check your credentials.');
            }
        } catch (err: any) {
            console.error('Login Error:', err);
            setError(err.message || 'An unexpected error occurred. Access denied.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#0F172A] relative overflow-hidden font-sans">
            {/* Dynamic Background */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rose-600/10 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2 animate-pulse"></div>

            {/* Decorative Grid */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full max-w-md p-6 relative z-10"
            >
                <div className="bg-white/[0.02] backdrop-blur-3xl p-10 rounded-[2.5rem] border border-white/5 shadow-2xl space-y-8">
                    <div className="text-center space-y-2">
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="w-24 h-24 bg-white rounded-[2rem] mx-auto flex items-center justify-center shadow-2xl overflow-hidden border-4 border-white/10 mb-8"
                        >
                            <img src="/shankhamul-logo.jpg" alt="Shankhamul Logo" className="w-full h-full object-cover" />
                        </motion.div>
                        <h2 className="text-3xl font-black text-white tracking-tighter">Shankhamul Health Club</h2>
                        <div className="flex items-center justify-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#EE4B6A] animate-pulse"></div>
                            <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">Management Portal Access</p>
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-2xl flex items-center gap-3 text-rose-400 text-sm font-semibold"
                            >
                                <AlertCircle size={18} className="shrink-0" />
                                <p>{error}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-3">
                            <label className="block text-slate-500 text-[10px] font-black uppercase tracking-[0.15em] ml-2" htmlFor="email">
                                Email Address
                            </label>
                            <div className="relative group">
                                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-[#EE4B6A] transition-colors" size={18} />
                                <input
                                    className="w-full pl-14 pr-6 py-4.5 bg-white/[0.03] border border-white/5 rounded-2xl text-white font-bold focus:ring-2 focus:ring-[#EE4B6A]/20 focus:border-[#EE4B6A]/50 transition-all outline-none placeholder:text-slate-600 disabled:opacity-50"
                                    id="email"
                                    type="email"
                                    placeholder="admin@shankhamulgym.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="block text-slate-500 text-[10px] font-black uppercase tracking-[0.15em] ml-2" htmlFor="password">
                                Security Password
                            </label>
                            <div className="relative group">
                                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-[#EE4B6A] transition-colors" size={18} />
                                <input
                                    className="w-full pl-14 pr-6 py-4.5 bg-white/[0.03] border border-white/5 rounded-2xl text-white font-bold focus:ring-2 focus:ring-[#EE4B6A]/20 focus:border-[#EE4B6A]/50 transition-all outline-none placeholder:text-slate-600 disabled:opacity-50"
                                    id="password"
                                    type="password"
                                    placeholder="••••••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        <div className="pt-6">
                            <button
                                className="group w-full py-5 bg-[#EE4B6A] hover:bg-[#D43D5B] text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-rose-900/40 transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <Loader2 className="animate-spin" size={20} />
                                ) : (
                                    <>
                                        <span>Sign In Now</span>
                                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="text-center pt-4">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.02] rounded-full border border-white/5">
                            <Shield size={12} className="text-slate-500" />
                            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">
                                SECURE MANAGEMENT ACCESS
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
