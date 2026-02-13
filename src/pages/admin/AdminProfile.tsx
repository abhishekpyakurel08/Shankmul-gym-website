import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import {
    User,
    Mail,
    Shield,
    Camera,
    Save,
    Lock,
    Key,
    IdCard,
    Building,
    CheckCircle2,
    Activity
} from 'lucide-react';
import { motion } from 'framer-motion';

const AdminProfile: React.FC = () => {
    const { user, login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [profileData, setProfileData] = useState<any>(null);
    const [updateStatus, setUpdateStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await api.get('/auth/me');
            if (res.success) {
                setProfileData(res.data);
                setFormData(prev => ({
                    ...prev,
                    firstName: res.data.firstName || '',
                    lastName: res.data.lastName || '',
                    email: res.data.email || '',
                    phoneNumber: res.data.phoneNumber || '',
                }));
            }
        } catch (err) {
            console.error('Failed to fetch profile:', err);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setUpdateStatus('idle');

        try {
            const res = await api.put('/auth/me', {
                firstName: formData.firstName,
                lastName: formData.lastName,
                phoneNumber: formData.phoneNumber
            });

            if (res.success) {
                setUpdateStatus('success');
                // Update local storage/context if needed
                if (user) {
                    login(localStorage.getItem('adminToken') || '', {
                        ...user,
                        firstName: formData.firstName,
                        lastName: formData.lastName
                    });
                }
                setTimeout(() => setUpdateStatus('idle'), 3000);
            }
        } catch (err: any) {
            alert(err.message || 'Update failed');
            setUpdateStatus('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <div className="flex items-center gap-6">
                    <div className="relative group">
                        <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-indigo-100 overflow-hidden">
                            {user?.firstName?.[0]}{user?.lastName?.[0]}
                        </div>
                        <button className="absolute -bottom-2 -right-2 p-2 bg-white rounded-xl shadow-lg border border-slate-50 text-slate-400 hover:text-indigo-600 transition-colors">
                            <Camera size={18} />
                        </button>
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Account Settings</h1>
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-1 flex items-center gap-2">
                            <Shield size={12} className="text-indigo-500" />
                            System {user?.role} Node
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Information */}
                <div className="lg:col-span-2 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden"
                    >
                        <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                                    <User size={20} />
                                </div>
                                <h3 className="text-lg font-bold text-slate-800 tracking-tight">Personnel Intelligence</h3>
                            </div>
                        </div>

                        <form onSubmit={handleUpdateProfile} className="p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-bold focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-bold focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all outline-none"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mobile Contact</label>
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-bold focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all outline-none"
                                />
                            </div>

                            <div className="pt-4 flex items-center gap-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-8 py-4 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-[0.98] flex items-center gap-3"
                                >
                                    {loading ? (
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <Save size={16} />
                                            Synchronize Profile
                                        </>
                                    )}
                                </button>
                                {updateStatus === 'success' && (
                                    <motion.span
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="text-emerald-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-2"
                                    >
                                        <CheckCircle2 size={14} />
                                        Data Updated
                                    </motion.span>
                                )}
                            </div>
                        </form>
                    </motion.div>

                    {/* Authentication Security */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden"
                    >
                        <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-rose-50 text-rose-600 rounded-xl">
                                    <Lock size={20} />
                                </div>
                                <h3 className="text-lg font-bold text-slate-800 tracking-tight">Security Credentials</h3>
                            </div>
                        </div>

                        <div className="p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Account Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input
                                            type="email"
                                            disabled
                                            value={formData.email}
                                            className="w-full pl-14 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-400 font-bold outline-none cursor-not-allowed"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">New Password</label>
                                    <div className="relative">
                                        <Key className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input
                                            type="password"
                                            name="newPassword"
                                            value={formData.newPassword}
                                            onChange={handleInputChange}
                                            placeholder="Leave blank to keep current"
                                            className="w-full pl-14 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-bold focus:ring-4 focus:ring-rose-500/5 focus:border-rose-500 transition-all outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="pt-4">
                                <button
                                    onClick={async () => {
                                        if (!formData.newPassword) return alert('Enter a new password first');
                                        setLoading(true);
                                        try {
                                            const res = await api.put('/auth/me', { password: formData.newPassword });
                                            if (res.success) {
                                                alert('Password updated successfully! 🔐');
                                                setFormData(prev => ({ ...prev, newPassword: '' }));
                                            }
                                        } catch (err: any) {
                                            alert(err.message || 'Password update failed');
                                        } finally {
                                            setLoading(false);
                                        }
                                    }}
                                    disabled={loading}
                                    className="px-6 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center gap-2"
                                >
                                    {loading ? 'Processing...' : 'Update Security Key'}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-indigo-600 rounded-3xl p-8 text-white shadow-2xl shadow-indigo-200 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Shield size={120} />
                        </div>
                        <div className="relative z-10 space-y-6">
                            <h4 className="text-xl font-black tracking-tight leading-tight">Administrative Privileges</h4>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                                        <IdCard size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black uppercase tracking-widest text-indigo-200">System ID</p>
                                        <p className="text-xs font-bold">{profileData?.employeeId || 'NODE-ADMIN-01'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                                        <Building size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black uppercase tracking-widest text-indigo-200">Department</p>
                                        <p className="text-xs font-bold">{profileData?.department || 'Executive Operations'}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-6 border-t border-white/10">
                                <p className="text-[10px] font-black uppercase tracking-widest text-indigo-200 mb-2">Access Level</p>
                                <div className="flex gap-2 flex-wrap">
                                    {user?.role === 'admin' ? (
                                        ['Full Root', 'Finance', 'Personnel', 'Systems'].map(tag => (
                                            <span key={tag} className="px-3 py-1 bg-white/10 rounded-full text-[9px] font-bold uppercase tracking-widest border border-white/5">{tag}</span>
                                        ))
                                    ) : (
                                        ['Standard Personnel', 'Attendance', 'Reporting'].map(tag => (
                                            <span key={tag} className="px-3 py-1 bg-white/10 rounded-full text-[9px] font-bold uppercase tracking-widest border border-white/5">{tag}</span>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm"
                    >
                        <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6">Security History</h4>
                        <div className="space-y-6">
                            {[
                                { event: 'Profile Synced', time: 'Just now', icon: CheckCircle2, color: 'text-emerald-500' },
                                { event: 'Terminal Access', time: '12 mins ago', icon: Activity, color: 'text-indigo-500' },
                                { event: 'Session Refresh', time: '4 hours ago', icon: RefreshCw, color: 'text-amber-500' }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className={`p-2 bg-slate-50 ${item.color} rounded-xl`}>
                                        <item.icon size={16} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-slate-800">{item.event}</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{item.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

// Internal icon for list
const RefreshCw: React.FC<any> = ({ size, className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 2v6h-6" /><path d="M3 12a9 9 0 0 1 15-6.7L21 8" /><path d="M3 22v-6h6" /><path d="M21 12a9 9 0 0 1-15 6.7L3 16" /></svg>
);

export default AdminProfile;
