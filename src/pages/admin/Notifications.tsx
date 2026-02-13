/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import {
    Target,
    Users,
    Megaphone,
    CheckCircle2,
    Search,
    Plus,
    X,
    MoreVertical,
    Zap,
    BellRing
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { io } from 'socket.io-client';
import { api } from '../../services/api';
import DataErrorState from '../../components/admin/DataErrorState';

interface NotificationLog {
    _id: string;
    id: string; // Display ID like #7456
    title: string;
    message: string;
    type: string;
    activeFrom: string;
    activeTo: string;
    status: 'active' | 'inactive' | 'expired';
}

const Notifications: React.FC = () => {
    // List/Table state
    const [history, setHistory] = useState<NotificationLog[]>([]);
    const [members, setMembers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [activeTab, setActiveTab] = useState<'campaigns' | 'autopilot'>('campaigns');

    // Form state (in modal)
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [mode, setMode] = useState<'broadcast' | 'selected'>('broadcast');
    const [userSearchTerm, setUserSearchTerm] = useState('');
    const [selectedUserIds, setSelectedUserIds] = useState<Set<string>>(new Set());

    const fetchHistory = async () => {
        setLoading(true);
        setError(false);
        try {
            const response = await api.get('/notifications?limit=50');
            if (response && response.success) {
                const formatted = (response.data || []).map((n: any) => ({
                    _id: n._id,
                    id: `#${n._id.substring(n._id.length - 4).toUpperCase()}`,
                    title: n.title,
                    message: n.message,
                    type: n.type || 'system',
                    activeFrom: new Date(n.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }),
                    activeTo: '-', // One-time notifications don't have an end date usually
                    status: 'active'
                }));
                setHistory(formatted);
            }
        } catch (err) {
            console.error('Failed to fetch notification logs:', err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const fetchMembers = async () => {
        try {
            const response = await api.get('/auth/users');
            if (response && response.success) {
                setMembers(response.data || []);
            }
        } catch (err) {
            console.error('Failed to fetch members:', err);
        }
    };

    useEffect(() => {
        fetchHistory();
        fetchMembers();

        const token = localStorage.getItem('adminToken');
        const BACKEND_URL = 'https://shankmul-gym-backend.tecobit.cloud';

        const socket = io(BACKEND_URL, {
            query: { role: 'admin', token }
        });

        socket.on('stats_updated', (data: any) => {
            if (data.type === 'notification' || data.type === 'membership') {
                fetchHistory();
                fetchMembers();
            }
        });

        socket.on('membership_approved', () => fetchMembers());
        socket.on('new_member_registered', () => fetchMembers());

        return () => {
            socket.disconnect();
        };
    }, []);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const endpoint = mode === 'broadcast' ? '/notifications/broadcast' : '/notifications/selected';
            const payload = mode === 'broadcast'
                ? { title, message }
                : {
                    title,
                    message,
                    userIds: Array.from(selectedUserIds)
                };

            const response = await api.post(endpoint, payload);
            if (response && response.success) {
                setSuccess(true);
                setTitle('');
                setMessage('');
                setSelectedUserIds(new Set());
                setTimeout(() => {
                    setSuccess(false);
                    setShowAddModal(false);
                    fetchHistory();
                }, 2000);
            }
        } catch (error: any) {
            alert(error.message || 'Failed to send notification');
        } finally {
            setSubmitting(false);
        }
    };

    const toggleUserSelection = (userId: string) => {
        const newSelection = new Set(selectedUserIds);
        if (newSelection.has(userId)) {
            newSelection.delete(userId);
        } else {
            newSelection.add(userId);
        }
        setSelectedUserIds(newSelection);
    };

    // Helper to get icon based on notification type
    const getNotificationTypeIcon = (type: string) => {
        switch (type) {
            case 'daily_greeting': return '☀️';
            case 'workout_reminder': return '💪';
            case 'login_alert': return '🔑';
            case 'expiry_warning': return '⚠️';
            case 'membership_expired': return '🚫';
            case 'inactivity_reminder': return '💤';
            case 'membership_approved': return '✅';
            default: return '📢';
        }
    };

    const getNotificationTypeColor = (type: string) => {
        switch (type) {
            case 'daily_greeting': return 'bg-yellow-50 text-yellow-600 border-yellow-100';
            case 'workout_reminder': return 'bg-indigo-50 text-indigo-600 border-indigo-100';
            case 'login_alert': return 'bg-blue-50 text-blue-600 border-blue-100';
            case 'expiry_warning': return 'bg-orange-50 text-orange-600 border-orange-100';
            case 'membership_expired': return 'bg-red-50 text-red-600 border-red-100';
            case 'membership_approved': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            default: return 'bg-slate-50 text-slate-600 border-slate-100';
        }
    };

    if (loading && history.length === 0) return (
        <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Accessing Communication Logs...</p>
        </div>
    );

    if (error) return <DataErrorState onRetry={fetchHistory} />;

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Push Notification</h1>
                    <div className="flex items-center gap-2 mt-1">
                        <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                        <p className="text-xs font-medium text-slate-400 tracking-wide uppercase">Campaign Management Overview</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-[#EE4B6A] text-white rounded-xl text-xs font-black shadow-lg shadow-rose-100 hover:bg-[#D43D5B] transition-all transform active:scale-95 uppercase tracking-widest"
                    >
                        <Plus size={16} />
                        <span>Add Push Notification</span>
                    </button>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-100">
                <button
                    onClick={() => setActiveTab('campaigns')}
                    className={`px-6 py-3 text-sm font-bold transition-all border-b-2 ${activeTab === 'campaigns' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                >
                    Campaign History
                </button>
                <button
                    onClick={() => setActiveTab('autopilot')}
                    className={`px-6 py-3 text-sm font-bold transition-all border-b-2 ${activeTab === 'autopilot' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                >
                    Auto-Pilot Systems
                </button>
            </div>

            {activeTab === 'autopilot' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Morning Greetings Card */}
                    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xl shadow-slate-200/50">
                        <div className="w-12 h-12 rounded-2xl bg-yellow-50 flex items-center justify-center text-2xl mb-4">☀️</div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">Morning Motivation</h3>
                        <p className="text-xs text-slate-500 mb-4 leading-relaxed">Sends daily motivational greetings to all active members to start their day right.</p>
                        <div className="flex items-center justify-between bg-slate-50 px-4 py-3 rounded-xl border border-slate-100">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Schedule</span>
                            <span className="text-xs font-bold text-slate-700">Daily @ 6:00 AM</span>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                            <span className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                <span className="text-xs font-bold text-emerald-600">Active</span>
                            </span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Automated</span>
                        </div>
                    </div>

                    {/* Workout Reminders Card */}
                    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xl shadow-slate-200/50">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-2xl mb-4">💪</div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">Smart Workout Reminders</h3>
                        <p className="text-xs text-slate-500 mb-4 leading-relaxed">Notifies members 1 hour before their preferred workout time slot.</p>
                        <div className="flex items-center justify-between bg-slate-50 px-4 py-3 rounded-xl border border-slate-100">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Schedule</span>
                            <span className="text-xs font-bold text-slate-700">Hourly (5AM - 8PM)</span>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                            <span className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                <span className="text-xs font-bold text-emerald-600">Active</span>
                            </span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Automated</span>
                        </div>
                    </div>

                    {/* Expiry Warning Card */}
                    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xl shadow-slate-200/50">
                        <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-2xl mb-4">⚠️</div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">Expiry Watchdog</h3>
                        <p className="text-xs text-slate-500 mb-4 leading-relaxed">Alerts members when their membership is about to expire (3 days waring).</p>
                        <div className="flex items-center justify-between bg-slate-50 px-4 py-3 rounded-xl border border-slate-100">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Schedule</span>
                            <span className="text-xs font-bold text-slate-700">Daily @ 9:00 AM</span>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                            <span className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                <span className="text-xs font-bold text-emerald-600">Active</span>
                            </span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Automated</span>
                        </div>
                    </div>

                    {/* Inactivity Reminder Card */}
                    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xl shadow-slate-200/50">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-2xl mb-4">💤</div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">Inactivity Re-engagement</h3>
                        <p className="text-xs text-slate-500 mb-4 leading-relaxed">Nudges members who haven't visited for more than 3 days to come back.</p>
                        <div className="flex items-center justify-between bg-slate-50 px-4 py-3 rounded-xl border border-slate-100">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Schedule</span>
                            <span className="text-xs font-bold text-slate-700">Daily @ 6:00 PM</span>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                            <span className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                <span className="text-xs font-bold text-emerald-600">Active</span>
                            </span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Automated</span>
                        </div>
                    </div>

                    {/* Weekly Progress Card */}
                    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xl shadow-slate-200/50">
                        <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-2xl mb-4">📊</div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">Weekly Progress Report</h3>
                        <p className="text-xs text-slate-500 mb-4 leading-relaxed">Sends a weekly summary of attendance and consistency to every member.</p>
                        <div className="flex items-center justify-between bg-slate-50 px-4 py-3 rounded-xl border border-slate-100">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Schedule</span>
                            <span className="text-xs font-bold text-slate-700">Sundays @ 10:00 AM</span>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                            <span className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                <span className="text-xs font-bold text-emerald-600">Active</span>
                            </span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Automated</span>
                        </div>
                    </div>
                </div>
            ) : (
                /* Content Card - Campaign History */
                <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden min-h-[600px]">
                    {/* Search / Filter Section */}
                    <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between">
                        <div className="relative w-full max-w-sm group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={16} />
                            <input
                                type="text"
                                placeholder="Search Notification..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-6 py-3 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-indigo-100 transition-all placeholder:text-slate-300"
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                                Global History
                            </span>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50/30">
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">ID</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Type</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Title & Message</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Sent At</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50/50">
                                {history.filter(h => h.title.toLowerCase().includes(searchTerm.toLowerCase())).map((item) => (
                                    <tr key={item._id} className="group hover:bg-slate-50/50 transition-colors">
                                        <td className="px-8 py-5">
                                            <span className="text-indigo-500 text-xs font-black tracking-tight">{item.id}</span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${getNotificationTypeColor(item.type)}`}>
                                                <span className="mr-1.5">{getNotificationTypeIcon(item.type)}</span>
                                                {item.type.replace(/_/g, ' ')}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 max-w-md">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-slate-900 leading-tight">{item.title}</span>
                                                <span className="text-[11px] text-slate-400 mt-1 line-clamp-1">{item.message}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 font-bold text-xs text-slate-600">
                                            {item.activeFrom}
                                        </td>
                                        <td className="px-8 py-5 text-center">
                                            <button className="p-2 text-slate-300 hover:text-indigo-600 transition-colors">
                                                <MoreVertical size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Empty State */}
                    {history.length === 0 && !loading && (
                        <div className="flex flex-col items-center justify-center py-32 text-center">
                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                                <BellRing size={32} className="text-slate-200" />
                            </div>
                            <h3 className="text-xl font-black text-slate-900 tracking-tight">Zero Notification History</h3>
                            <p className="text-sm text-slate-400 max-w-xs mx-auto mt-2">Deploy your first push notification campaign to start building your logs.</p>
                        </div>
                    )}
                </div>
            )}

            {/* --- ADD NOTIFICATION MODAL --- */}
            <AnimatePresence>
                {showAddModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0f172a]/60 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 10 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 10 }}
                            className="bg-white w-full max-w-[1000px] rounded-3xl shadow-2xl flex flex-col md:grid md:grid-cols-[1fr_340px] overflow-hidden border border-slate-100"
                        >
                            {/* Main Form Content */}
                            <div className="p-8 md:p-10 flex flex-col h-[85vh] md:h-auto overflow-y-auto">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Deploy Push Notification</h3>
                                    <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400">
                                        <X size={24} />
                                    </button>
                                </div>
                                <p className="text-[13px] font-medium text-slate-500 uppercase tracking-widest mb-8">Configure Your Alert Deployment</p>

                                {/* Minimal Tabs */}
                                <div className="flex gap-1 bg-slate-50 p-1 rounded-xl w-fit mb-8">
                                    <button
                                        onClick={() => setMode('broadcast')}
                                        className={`flex items-center gap-2 px-6 py-2 rounded-lg text-[13px] font-semibold transition-all ${mode === 'broadcast' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                    >
                                        <Megaphone size={14} />
                                        📢 Broadcast
                                    </button>
                                    <button
                                        onClick={() => setMode('selected')}
                                        className={`flex items-center gap-2 px-6 py-2 rounded-lg text-[13px] font-semibold transition-all ${mode === 'selected' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                    >
                                        <Target size={14} />
                                        🎯 Targeted
                                    </button>
                                </div>

                                <form onSubmit={handleSend} className="space-y-6">
                                    {/* Audience Selection Section */}
                                    <div className="space-y-3">
                                        <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Audience</label>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div
                                                onClick={() => setMode('broadcast')}
                                                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all relative group ${mode === 'broadcast' ? 'border-indigo-600 bg-indigo-50/30' : 'border-slate-100 bg-slate-50/50 hover:border-slate-200'}`}
                                            >
                                                <div className={`absolute top-3 right-3 w-4 h-4 rounded-full border-2 transition-all ${mode === 'broadcast' ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'} flex items-center justify-center`}>
                                                    {mode === 'broadcast' && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                                                </div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-lg">👥</span>
                                                    <span className="font-bold text-slate-900 text-sm">All Users</span>
                                                </div>
                                                <p className="text-xs text-slate-500">Broadcast to everyone</p>
                                            </div>

                                            <div
                                                onClick={() => setMode('selected')}
                                                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all relative group ${mode === 'selected' ? 'border-indigo-600 bg-indigo-50/30' : 'border-slate-100 bg-slate-50/50 hover:border-slate-200'}`}
                                            >
                                                <div className={`absolute top-3 right-3 w-4 h-4 rounded-full border-2 transition-all ${mode === 'selected' ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'} flex items-center justify-center`}>
                                                    {mode === 'selected' && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                                                </div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-lg">✨</span>
                                                    <span className="font-bold text-slate-900 text-sm">Selected</span>
                                                </div>
                                                <p className="text-xs text-slate-500">Choose specific users</p>
                                            </div>
                                        </div>

                                        {/* User Picker */}
                                        <AnimatePresence>
                                            {mode === 'selected' && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden bg-slate-50 rounded-2xl p-4 border border-slate-100 mt-3"
                                                >
                                                    <div className="relative mb-3">
                                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                                                        <input
                                                            type="text"
                                                            placeholder="Search users..."
                                                            value={userSearchTerm}
                                                            onChange={(e) => setUserSearchTerm(e.target.value)}
                                                            className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 outline-none transition-all placeholder:text-slate-400"
                                                        />
                                                    </div>
                                                    <div className="max-h-40 overflow-y-auto space-y-1 px-1 custom-scrollbar">
                                                        {members
                                                            .filter(m => `${m.firstName} ${m.lastName}`.toLowerCase().includes(userSearchTerm.toLowerCase()))
                                                            .map(user => (
                                                                <div
                                                                    key={user._id}
                                                                    onClick={() => toggleUserSelection(user._id)}
                                                                    className={`flex items-center gap-3 p-2 rounded-xl cursor-pointer transition-all hover:bg-slate-100 ${selectedUserIds.has(user._id) ? 'bg-indigo-50/50' : ''}`}
                                                                >
                                                                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${selectedUserIds.has(user._id) ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300 bg-white'}`}>
                                                                        {selectedUserIds.has(user._id) && <span className="text-white text-[10px]">✓</span>}
                                                                    </div>
                                                                    <div className="w-7 h-7 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                                                                        {user.firstName[0]}{user.lastName[0]}
                                                                    </div>
                                                                    <span className="text-sm font-medium text-slate-700">{user.firstName} {user.lastName}</span>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                    {selectedUserIds.size > 0 && (
                                                        <div className="mt-3 text-center">
                                                            <span className="px-3 py-1 bg-indigo-600 text-white rounded-full text-[11px] font-bold">
                                                                {selectedUserIds.size} selected
                                                            </span>
                                                        </div>
                                                    )}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Alert Headline</label>
                                        <div className="relative group">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">🎉</span>
                                            <input
                                                type="text"
                                                placeholder="New Equipment Arrived!"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                required
                                                className="w-full pl-12 pr-6 py-4 bg-white border-2 border-slate-100 rounded-2xl font-bold text-slate-900 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all placeholder:text-slate-300"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Message Detail</label>
                                        <textarea
                                            placeholder="Enter high-engagement content for your members..."
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            required
                                            rows={4}
                                            className="w-full px-6 py-4 bg-white border-2 border-slate-100 rounded-2xl font-medium text-slate-700 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all resize-none placeholder:text-slate-300 leading-relaxed"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={submitting || (mode === 'selected' && selectedUserIds.size === 0)}
                                        className={`w-full py-4 rounded-2xl font-bold uppercase tracking-widest text-sm transition-all shadow-xl flex items-center justify-center gap-3
                                            ${success ? 'bg-emerald-500 text-white shadow-emerald-200' : 'bg-indigo-600 text-white shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-0.5 active:translate-y-0'}
                                            ${submitting ? 'opacity-50 cursor-not-allowed' : ''}
                                        `}
                                    >
                                        {submitting ? (
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        ) : success ? (
                                            <>
                                                <CheckCircle2 size={18} />
                                                <span>Deploy Successful</span>
                                            </>
                                        ) : (
                                            <>
                                                <Zap size={18} />
                                                <span>Authorize & Deploy Alert</span>
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>

                            {/* Preview Panel Section */}
                            <div className="bg-slate-50 p-8 md:p-10 flex flex-col items-center border-l border-slate-100">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Device Preview</h3>

                                <div className="w-full max-w-[280px] aspect-[9/18.5] bg-white rounded-[3rem] border-[10px] border-slate-900 p-3 pt-8 relative shadow-2xl overflow-hidden mb-8">
                                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-5 bg-slate-900 rounded-b-2xl z-10"></div>

                                    <motion.div
                                        initial={{ y: -20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        key={title + message}
                                        className="p-4 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200 shadow-xl"
                                    >
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center text-lg shadow-lg">
                                                🏋️
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Shankhamul GYM</span>
                                                <span className="text-[8px] text-slate-400">Now</span>
                                            </div>
                                        </div>
                                        <p className="text-xs font-bold text-slate-900 mb-1 truncate">{title || 'Your Headline'}</p>
                                        <p className="text-[10px] text-slate-500 leading-snug line-clamp-3">{message || 'Your content will appear here...'}</p>
                                    </motion.div>

                                    {/* Mock Lockscreen content */}
                                    <div className="mt-40 flex flex-col items-center text-slate-300">
                                        <span className="text-4xl font-light mb-2">12:45</span>
                                        <span className="text-xs font-medium uppercase tracking-[0.3em]">Thursday, Feb 12</span>
                                    </div>
                                </div>

                                <div className="space-y-3 w-full">
                                    <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-slate-100 shadow-sm">
                                        <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                                            <Users size={16} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase">Reach</span>
                                            <span className="text-sm font-bold text-slate-900">{mode === 'broadcast' ? members.length : selectedUserIds.size} Devices</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-slate-100 shadow-sm">
                                        <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-500">
                                            <Zap size={16} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase">Delivery</span>
                                            <span className="text-sm font-bold text-slate-900">Instant Blast</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Notifications;
