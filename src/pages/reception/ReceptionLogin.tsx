import { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { Lock, Mail, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ReceptionLogin: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { login, isAuthenticated, user } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated && user) {
            if (user.role === 'reception' || user.role === 'admin') {
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

                // Allow both admin and reception to access reception dashboard
                if (loggedInUser.role === 'reception' || loggedInUser.role === 'admin') {
                    login(response.data.token, loggedInUser);
                    navigate('/reception/dashboard');
                } else {
                    throw new Error('Unauthorized: This portal is for reception staff only.');
                }
            } else {
                throw new Error(response.message || 'Login failed. Please check your credentials.');
            }
        } catch (err: any) {
            console.error('Login Error:', err);
            setError(err.message || 'An unexpected error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#F8FAFC] relative overflow-hidden font-sans">
            {/* Soft Background Accents */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-sky-500/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md p-6 relative z-10"
            >
                <div className="bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 space-y-8">
                    <div className="text-center space-y-3">
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            className="w-24 h-24 bg-white rounded-[2rem] mx-auto flex items-center justify-center shadow-2xl overflow-hidden border-4 border-indigo-50 mb-6"
                        >
                            <img src="/shankhamul-logo.jpg" alt="Shankhamul Logo" className="w-full h-full object-cover" />
                        </motion.div>
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Front Desk</h2>
                        <p className="text-slate-500 font-medium text-sm">Reception Management Portal</p>
                    </div>

                    <AnimatePresence mode="wait">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="bg-rose-50 border border-rose-100 p-4 rounded-2xl flex items-center gap-3 text-rose-600 text-sm font-semibold"
                            >
                                <AlertCircle size={18} className="shrink-0" />
                                <p>{error}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-slate-400 text-[11px] font-bold uppercase tracking-wider ml-1">
                                Email Address
                            </label>
                            <div className="relative group">
                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                                <input
                                    className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-semibold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all outline-none placeholder:text-slate-300"
                                    type="email"
                                    placeholder="yourname@gym.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-slate-400 text-[11px] font-bold uppercase tracking-wider ml-1">
                                Password
                            </label>
                            <div className="relative group">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                                <input
                                    className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-semibold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all outline-none placeholder:text-slate-300"
                                    type="password"
                                    placeholder="••••••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                className="group w-full py-4.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-100 transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <Loader2 className="animate-spin" size={20} />
                                ) : (
                                    <>
                                        <span>Unlock Dashboard</span>
                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="text-center">
                        <p className="text-[10px] text-slate-300 font-bold uppercase tracking-[0.2em]">
                            System Security Verified
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ReceptionLogin;
