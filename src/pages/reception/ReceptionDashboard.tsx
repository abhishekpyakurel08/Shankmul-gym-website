/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import {
    Activity,
    Users,
    UserPlus,
    Zap,
    Search,
    Clock,
    UserCheck,
    AlertCircle,
    TrendingUp,
    CheckCircle2,
    XCircle,
    Calendar,
    MessageSquare,
    Send,
    DollarSign,
    Plus,
    X,
    CreditCard,
    Receipt,
    Wallet
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const ReceptionDashboard: React.FC = () => {
    const { user } = useAuth();
    const [summary, setSummary] = useState<any>(null);
    const [attendance, setAttendance] = useState<any[]>([]);
    const [pendingApprovals, setPendingApprovals] = useState<any[]>([]);
    const [absentCount, setAbsentCount] = useState(0);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [, setLastUpdated] = useState('');

    const [searchQuery, setSearchQuery] = useState('');
    const [note, setNote] = useState('');
    const [teamNotes, setTeamNotes] = useState<any[]>([]);

    const fetchNotes = async () => {
        try {
            const res = await api.get('/staff-notes');
            if (res.success) setTeamNotes(res.data);
        } catch (err) {
            console.error("Failed to fetch notes:", err);
        }
    };

    // Income Recording State
    const [showIncomeModal, setShowIncomeModal] = useState(false);
    const [isSavingIncome, setIsSavingIncome] = useState(false);
    const [newIncome, setNewIncome] = useState({
        category: 'income',
        type: 'subscription',
        amount: '',
        method: 'Cash',
        description: '',
        userName: ''
    });

    const fetchData = async (silent = false) => {
        if (!silent) setIsRefreshing(true);
        try {
            const [summaryRes, attRes, absentRes, usersRes] = await Promise.all([
                api.get('/dashboard/summary'),
                api.get('/attendance/admin/today'),
                api.get('/attendance/admin/absent'),
                api.get('/auth/users')
            ]);

            if (summaryRes?.success) setSummary(summaryRes.data);
            if (attRes?.success) setAttendance(attRes.data.slice(0, 10));
            if (absentRes?.success) setAbsentCount(absentRes.data?.length || 0);
            if (usersRes?.success) {
                setPendingApprovals(usersRes.data.filter((u: any) => u.membership?.status === 'pending'));
            }
            setLastUpdated(new Date().toLocaleTimeString());
        } catch (err) {
            console.error("Reception Fetch Error:", err);
        } finally {
            setIsRefreshing(false);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(() => fetchData(true), 60000);

        // Real-time synchronization
        const token = localStorage.getItem('adminToken');
        const BACKEND_SOCKET_URL = 'https://shankmul-gym-backend.tecobit.cloud';

        const socket = io(BACKEND_SOCKET_URL, {
            query: {
                role: user?.role || 'reception',
                token: token
            }
        });

        socket.on('connect', () => {
            console.log('✅ Reception connected to real-time engine');
        });

        const handleRealTimeUpdate = () => {
            console.log('🔄 Reception real-time update, refreshing...');
            fetchData(true);
        };

        socket.on('user_clock_in', handleRealTimeUpdate);
        socket.on('user_clock_out', handleRealTimeUpdate);
        socket.on('new_member_registered', handleRealTimeUpdate);
        socket.on('membership_approved', handleRealTimeUpdate);
        socket.on('membership_request', handleRealTimeUpdate);
        socket.on('transaction_added', handleRealTimeUpdate);
        socket.on('attendance_deleted', handleRealTimeUpdate);
        socket.on('stats_updated', handleRealTimeUpdate);
        socket.on('staff_note_added', (newNote: any) => {
            setTeamNotes(prev => [newNote, ...prev].slice(0, 50));
        });

        fetchNotes();

        return () => {
            clearInterval(interval);
            socket.disconnect();
        };
    }, []);

    const handleApprove = async (id: string) => {
        try {
            const res = await api.put(`/auth/membership/approve/${id}`, {});
            if (res.success) fetchData(true);
        } catch (err) {
            alert('Approval failed');
        }
    };

    const handleSendNote = async () => {
        if (!note.trim()) return;
        try {
            const res = await api.post('/staff-notes', { text: note });
            if (res.success) {
                setNote('');
            }
        } catch (err) {
            console.error("Failed to send note:", err);
        }
    };

    const handleSaveIncome = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newIncome.amount || Number(newIncome.amount) <= 0) {
            alert('Please enter a valid amount');
            return;
        }

        setIsSavingIncome(true);
        try {
            const payload = {
                ...newIncome,
                amount: Number(newIncome.amount),
                description: newIncome.description || `Reception Entry: ${newIncome.userName || 'General'}`
            };
            const res = await api.post('/finance/transactions/add', payload);
            if (res && res.success) {
                setShowIncomeModal(false);
                setNewIncome({
                    category: 'income',
                    type: 'subscription',
                    amount: '',
                    method: 'Cash',
                    description: '',
                    userName: ''
                });
                fetchData(true);
            }
        } catch (err: any) {
            alert(err.message || 'Income record failed');
        } finally {
            setIsSavingIncome(false);
        }
    };

    const stats = [
        { label: 'Inside Gym', value: summary?.attendance?.presentToday || 0, icon: <Users size={18} />, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { label: 'Cash Today', value: `Rs. ${summary?.financials?.cashToday?.toLocaleString() || 0}`, icon: <DollarSign size={18} />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Online Today', value: `Rs. ${summary?.financials?.onlineToday?.toLocaleString() || 0}`, icon: <Wallet size={18} />, color: 'text-sky-600', bg: 'bg-sky-50' },
        { label: 'Absent Today', value: absentCount, icon: <Activity size={18} />, color: 'text-rose-500', bg: 'bg-rose-50' },
        { label: 'Members', value: summary?.members?.total || 0, icon: <UserPlus size={18} />, color: 'text-slate-600', bg: 'bg-slate-50' }
    ];

    return (
        <div className="space-y-6 pb-20">
            {/* Top Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Reception Dashboard</h1>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Operational Command • Front Desk</p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowIncomeModal(true)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.1em] shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all transform active:scale-95"
                    >
                        <Plus size={14} />
                        <span>Add Payment</span>
                    </button>
                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Find Member..."
                            className="pl-10 pr-4 py-2 bg-white border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 outline-none w-64 transition-all shadow-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={() => fetchData()}
                        className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-indigo-600 transition-colors shadow-sm"
                    >
                        <Activity size={18} className={isRefreshing ? 'animate-pulse' : ''} />
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 group hover:border-indigo-100 transition-all cursor-default"
                    >
                        <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                            <p className="text-xl font-black text-slate-900">{stat.value}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Real-time Attendance Feed */}
                <div className="xl:col-span-2 space-y-6">
                    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-indigo-600 rounded-lg text-white shadow-sm">
                                    <Clock size={16} />
                                </div>
                                <h3 className="font-bold text-slate-800">Live Activity Feed</h3>
                            </div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Auto-syncing active</span>
                        </div>

                        <div className="divide-y divide-slate-50">
                            {attendance.length > 0 ? attendance.map((att) => (
                                <motion.div
                                    key={att._id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 font-bold overflow-hidden border border-slate-50">
                                            {att.userId?.profileImage ? (
                                                <img src={att.userId.profileImage} className="w-full h-full object-cover" />
                                            ) : (
                                                att.userId?.firstName?.[0] || '?'
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{att.userId?.firstName} {att.userId?.lastName}</p>
                                            <div className="flex items-center gap-2">
                                                <span className={`text-[10px] font-bold uppercase ${att.clockOut ? 'text-slate-400' : 'text-indigo-600'}`}>
                                                    {att.clockOut ? 'Checked Out' : 'Active In Gym'}
                                                </span>
                                                <span className="text-slate-200">•</span>
                                                <span className="text-[10px] text-slate-400 font-medium">
                                                    {new Date(att.clockIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        {att.status === 'late' && (
                                            <span className="flex items-center gap-1 text-[9px] font-black text-rose-500 uppercase bg-rose-50 px-2 py-1 rounded-lg border border-rose-100">
                                                <AlertCircle size={10} /> Late
                                            </span>
                                        )}
                                        <button className="p-2 hover:bg-white hover:shadow-sm rounded-lg text-slate-300 hover:text-indigo-600 transition-all border border-transparent hover:border-slate-100">
                                            <TrendingUp size={16} />
                                        </button>
                                    </div>
                                </motion.div>
                            )) : (
                                <div className="p-12 text-center text-slate-400 text-sm font-medium italic bg-slate-50/20">No check-ins recorded today</div>
                            )}
                        </div>
                    </div>

                    {/* Pending Approvals Section */}
                    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-amber-50/20">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-amber-500 rounded-lg text-white shadow-sm">
                                    <Zap size={16} />
                                </div>
                                <h3 className="font-bold text-slate-800">Registration Queue</h3>
                            </div>
                            <span className="px-3 py-1 bg-white border border-amber-100 text-amber-600 rounded-full text-[10px] font-black uppercase tracking-tighter">
                                {pendingApprovals.length} Requests
                            </span>
                        </div>

                        <div className="divide-y divide-slate-50">
                            {pendingApprovals.length > 0 ? pendingApprovals.slice(0, 5).map((member) => (
                                <div key={member._id} className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 font-bold border border-amber-100">
                                            {member.firstName[0]}
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-slate-900">{member.firstName} {member.lastName}</p>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{member.employeeId || member.phone}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleApprove(member._id)}
                                            className="p-2 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all border border-emerald-100 shadow-sm"
                                        >
                                            <CheckCircle2 size={18} />
                                        </button>
                                        <button className="p-2 bg-rose-50 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all border border-rose-100 shadow-sm">
                                            <XCircle size={18} />
                                        </button>
                                    </div>
                                </div>
                            )) : (
                                <div className="p-12 text-center text-slate-300 uppercase font-black text-[10px] tracking-widest bg-slate-50/20">All Clear</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Team Comms */}
                    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col h-[450px]">
                        <div className="p-6 border-b border-slate-100 bg-slate-900 text-white rounded-t-3xl">
                            <div className="flex items-center gap-3 mb-1">
                                <MessageSquare size={18} />
                                <h3 className="font-bold">Team Radio</h3>
                            </div>
                            <p className="text-[10px] opacity-60 font-medium uppercase tracking-widest">Coordination Hub</p>
                        </div>

                        <div className="flex-1 p-4 space-y-4 overflow-y-auto custom-scrollbar bg-slate-50/30">
                            {teamNotes.map((n) => (
                                <div key={n.id} className={`p-3 rounded-2xl text-xs ${n.user === 'Admin' ? 'bg-indigo-50 border border-indigo-100 text-indigo-900' : 'bg-white border border-slate-100 text-slate-700'} shadow-sm`}>
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-black uppercase tracking-tighter opacity-50">{n.user}</span>
                                        <span className="text-[9px] opacity-40 font-bold">{n.time || new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    </div>
                                    <p className="font-medium leading-relaxed">{n.text}</p>
                                </div>
                            ))}
                        </div>

                        <div className="p-4 border-t border-slate-100">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Report to staff..."
                                    className="w-full pl-4 pr-12 py-3 bg-white border border-slate-100 rounded-2xl text-xs font-medium focus:ring-2 focus:ring-indigo-100 outline-none shadow-sm"
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendNote()}
                                />
                                <button
                                    onClick={handleSendNote}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all"
                                >
                                    <Send size={14} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Quick Records / Status */}
                    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <TrendingUp size={12} className="text-emerald-500" /> Nepal Market Signals
                        </h4>

                        <div className="space-y-3">
                            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-2xl border border-slate-100/50">
                                <div className="flex items-center gap-3">
                                    <Calendar size={16} className="text-slate-400" />
                                    <span className="text-xs font-bold text-slate-600">Peak Hour (NP)</span>
                                </div>
                                <span className="text-xs font-black text-indigo-600">5:30 PM</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-2xl border border-slate-100/50">
                                <div className="flex items-center gap-3">
                                    <UserCheck size={16} className="text-slate-400" />
                                    <span className="text-xs font-bold text-slate-600">Member Status</span>
                                </div>
                                <span className="text-xs font-black text-emerald-500">92% OK</span>
                            </div>
                        </div>

                        <button className="w-full py-4 bg-slate-100 text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all shadow-sm border border-slate-200">
                            Download Daily Ledger
                        </button>
                    </div>
                </div>
            </div>

            {/* Income Record Modal */}
            <AnimatePresence>
                {showIncomeModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl p-8 border border-slate-100"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl shadow-sm">
                                        <DollarSign size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-slate-900 tracking-tight">Record Payment</h3>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">NP Currency Terminal</p>
                                    </div>
                                </div>
                                <button onClick={() => setShowIncomeModal(false)} className="p-2.5 hover:bg-slate-50 rounded-2xl text-slate-400 transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSaveIncome} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Member Reference</label>
                                    <div className="relative">
                                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                        <input
                                            type="text"
                                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border-transparent rounded-2xl text-sm font-bold placeholder:text-slate-300 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                                            placeholder="Member Name or ID"
                                            value={newIncome.userName}
                                            onChange={(e) => setNewIncome({ ...newIncome, userName: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Fee Category</label>
                                        <div className="relative">
                                            <Zap className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                            <select
                                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-transparent rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-200 outline-none appearance-none transition-all"
                                                value={newIncome.type}
                                                onChange={(e) => setNewIncome({ ...newIncome, type: e.target.value })}
                                            >
                                                <option value="subscription">Monthly Fee</option>
                                                <option value="registration">Admission Fee</option>
                                                <option value="other">Other Income</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Payment Method</label>
                                        <div className="relative">
                                            <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                            <select
                                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-transparent rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-200 outline-none appearance-none transition-all"
                                                value={newIncome.method}
                                                onChange={(e) => setNewIncome({ ...newIncome, method: e.target.value })}
                                            >
                                                <option value="Cash">Cash (Physical)</option>
                                                <option value="eSewa">eSewa (Online)</option>
                                                <option value="Khalti">Khalti (Online)</option>
                                                <option value="Bank">Bank (Online)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Amount (Rs.)</label>
                                    <div className="relative">
                                        <Receipt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                        <input
                                            type="number"
                                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border-transparent rounded-2xl text-sm font-bold placeholder:text-slate-300 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                                            placeholder="0"
                                            required
                                            value={newIncome.amount}
                                            onChange={(e) => setNewIncome({ ...newIncome, amount: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Transaction Details</label>
                                    <textarea
                                        rows={2}
                                        className="w-full p-4 bg-slate-50 border-transparent rounded-2xl text-sm font-bold placeholder:text-slate-300 focus:ring-2 focus:ring-emerald-200 outline-none transition-all resize-none"
                                        placeholder="Note (e.g. 3 Months Membership)"
                                        value={newIncome.description}
                                        onChange={(e) => setNewIncome({ ...newIncome, description: e.target.value })}
                                    />
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowIncomeModal(false)}
                                        className="flex-1 py-4.5 bg-slate-50 text-slate-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all border border-slate-100"
                                    >
                                        Dismiss
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSavingIncome}
                                        className="flex-1 py-4.5 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-emerald-200 hover:bg-emerald-700 transition-all active:scale-[0.98] flex items-center justify-center gap-2 group"
                                    >
                                        {isSavingIncome ? (
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <CheckCircle2 size={16} className="group-hover:scale-110 transition-transform" />
                                                Confirm Record
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ReceptionDashboard;
