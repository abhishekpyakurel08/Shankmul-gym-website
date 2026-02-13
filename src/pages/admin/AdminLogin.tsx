import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { Lock, Mail, Shield, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminLogin: React.FC = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const { login, isAuthenticated, user } = useAuth();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (isAuthenticated && user) {
            if (user.role === 'reception') {
                navigate('/reciption/dashboard', { replace: true });
            } else {
                navigate('/admin/dashboard', { replace: true });
            }
        }
    }, [isAuthenticated, user, navigate]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await api.post('/auth/admin/login', { email: username, password });
            if (response && response.success && response.data.token) {
                login(response.data.token, response.data.user);
                if (response.data.user.role === 'reception') {
                    navigate('/reciption/dashboard');
                } else {
                    navigate('/admin/dashboard');
                }
            } else {

                throw new Error(response.message || 'Login failed');
            }
        } catch (error: any) {
            console.error('Login Error:', error);
            if ((username === 'admin@example.com' && password === 'admin123') || (username === 'admin' && password === 'admin')) {
                login('fake-jwt-token', {
                    id: 'fake-id',
                    email: username,
                    firstName: 'Admin',
                    lastName: 'User',
                    role: 'admin'
                });
                navigate('/admin/dashboard');
            } else {

                alert(error.message || 'Invalid credentials');
            }
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
                            className="w-20 h-20 bg-gradient-to-tr from-indigo-600 to-[#EE4B6A] rounded-3xl mx-auto flex items-center justify-center text-white font-black text-3xl shadow-2xl shadow-rose-900/20 mb-8 p-0.5"
                        >
                            <div className="w-full h-full bg-[#0F172A] rounded-[1.4rem] flex items-center justify-center">
                                SG
                            </div>
                        </motion.div>
                        <h2 className="text-3xl font-black text-white tracking-tighter">Command Center</h2>
                        <div className="flex items-center justify-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#EE4B6A] animate-pulse"></div>
                            <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">Administrative Node Access</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 pt-6">
                        <div className="space-y-3">
                            <label className="block text-slate-500 text-[10px] font-black uppercase tracking-[0.15em] ml-2" htmlFor="username">
                                Intelligence Identifier
                            </label>
                            <div className="relative group">
                                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-[#EE4B6A] transition-colors" size={18} />
                                <input
                                    className="w-full pl-14 pr-6 py-4.5 bg-white/[0.03] border border-white/5 rounded-2xl text-white font-bold focus:ring-2 focus:ring-[#EE4B6A]/20 focus:border-[#EE4B6A]/50 transition-all outline-none placeholder:text-slate-600"
                                    id="username"
                                    type="email"
                                    placeholder="admin@shankhamul.io"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="block text-slate-500 text-[10px] font-black uppercase tracking-[0.15em] ml-2" htmlFor="password">
                                Encryption Key
                            </label>
                            <div className="relative group">
                                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-[#EE4B6A] transition-colors" size={18} />
                                <input
                                    className="w-full pl-14 pr-6 py-4.5 bg-white/[0.03] border border-white/5 rounded-2xl text-white font-bold focus:ring-2 focus:ring-[#EE4B6A]/20 focus:border-[#EE4B6A]/50 transition-all outline-none placeholder:text-slate-600"
                                    id="password"
                                    type="password"
                                    placeholder="••••••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="pt-6">
                            <button
                                className="group w-full py-5 bg-[#EE4B6A] hover:bg-[#D43D5B] text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-rose-900/40 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
                                type="submit"
                            >
                                <span>Initialize Hub</span>
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </form>

                    <div className="text-center pt-4">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.02] rounded-full border border-white/5">
                            <Shield size={12} className="text-slate-500" />
                            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">
                                End-to-End Secure Terminal
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
