/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import {
    DollarSign,
    Activity,
    Zap,
    Users,
    ArrowUpRight,
    PlusCircle,
    TrendingUp,
    Crown,
    UserMinus,
    Send,
    MessageSquare
} from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const AdminOverview: React.FC = () => {
    const { user } = useAuth();
    const [summary, setSummary] = useState<any>(null);
    const [absentCount, setAbsentCount] = useState(0);
    const [recentAttendance, setRecentAttendance] = useState<any[]>([]);
    const [pendingMembers, setPendingMembers] = useState<any[]>([]);
    const [weeklyData, setWeeklyData] = useState<any[]>([]);
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [lastUpdated, setLastUpdated] = useState<string>('');
    const [note, setNote] = useState('');
    const [staffNotes, setStaffNotes] = useState<any[]>([]);

    const fetchNotes = async () => {
        try {
            const res = await api.get('/staff-notes');
            if (res.success) setStaffNotes(res.data);
        } catch (err) {
            console.error("Failed to fetch notes:", err);
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

    const Skeleton = ({ className }: { className: string }) => (
        <div className={`animate-pulse bg-slate-100 rounded-xl ${className}`} />
    );

    const fetchData = async (silent = false) => {
        if (!silent) setIsRefreshing(true);
        try {
            const [summaryRes, attRes, absentRes, usersRes, weeklyRes] = await Promise.all([
                api.get('/dashboard/summary'),
                api.get('/attendance/admin/today'),
                api.get('/attendance/admin/absent'),
                api.get('/auth/users'),
                api.get('/finance/stats/weekly')
            ]);

            if (summaryRes && summaryRes.success) setSummary(summaryRes.data);
            if (weeklyRes && weeklyRes.success) setWeeklyData(weeklyRes.data);

            if (attRes && attRes.success) setRecentAttendance(attRes.data.slice(0, 5));
            if (absentRes && absentRes.success) setAbsentCount(absentRes.data?.length || 0);
            if (usersRes && usersRes.success) {
                setPendingMembers(usersRes.data.filter((u: any) => u.membership?.status === 'pending'));
            }
            setLastUpdated(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        } catch (err) {
            console.error("Dashboard Fetch Error:", err);
        } finally {
            setIsRefreshing(false);
        }
    };

    const handleApprove = async (userId: string) => {
        setActionLoading(userId);
        try {
            const res = await api.put(`/auth/membership/approve/${userId}`, {});
            if (res.success) {
                fetchData(true);
            }
        } catch (err: any) {
            alert(err.message || 'Approval failed');
        } finally {
            setActionLoading(null);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(() => fetchData(true), 300000);

        // Real-time synchronization
        const token = localStorage.getItem('adminToken');
        const BACKEND_SOCKET_URL = 'https://shankmul-gym-backend.tecobit.cloud';

        const socket = io(BACKEND_SOCKET_URL, {
            query: {
                role: user?.role || 'admin',
                token: token
            }
        });

        socket.on('connect', () => {
            console.log('✅ Dashboard connected to real-time engine');
        });

        const handleRealTimeUpdate = () => {
            console.log('🔄 Real-time update received, refreshing dashboard...');
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
            setStaffNotes(prev => [newNote, ...prev].slice(0, 50));
        });

        fetchNotes();

        return () => {
            clearInterval(interval);
            socket.disconnect();
        };
    }, [user?.role]);

    const allStats = [
        {
            title: 'Revenue Flow',
            value: `Rs. ${summary?.financials?.revenueToday?.toLocaleString() || '0'}`,
            subtitle: 'Real-time Income Today',
            icon: <DollarSign size={18} />,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50/50',
            access: ['admin', 'reception']
        },
        {
            title: 'Projected (30d)',
            value: `Rs. ${summary?.financials?.projectedRevenue30d?.toLocaleString() || '0'}`,
            subtitle: `${summary?.members?.upcomingRenewals30d || 0} Expiring Plans`,
            icon: <TrendingUp size={18} />,
            color: 'text-indigo-600',
            bg: 'bg-indigo-50/50',
            access: ['admin']
        },
        {
            title: 'Daily Expenses',
            value: `Rs. ${summary?.financials?.expenseToday?.toLocaleString() || '0'}`,
            subtitle: 'Total Outflow Today',
            icon: <ArrowUpRight size={18} className="rotate-90" />,
            color: 'text-rose-600',
            bg: 'bg-rose-50/50',
            access: ['admin']
        },
        {
            title: 'Live Presence',
            value: summary?.attendance?.presentToday || '0',
            subtitle: 'Users in Facility Now',
            icon: <Users size={18} />,
            color: 'text-indigo-600',
            bg: 'bg-indigo-50/50',
            access: ['admin', 'reception']
        },
        {
            title: 'Pending Review',
            value: summary?.members?.pendingApprovals || '0',
            subtitle: 'Queue Awaiting Admin',
            icon: <Zap size={18} />,
            color: 'text-amber-500',
            bg: 'bg-amber-50/50',
            access: ['admin', 'reception']
        },
        {
            title: 'New Onboarding',
            value: summary?.members?.newToday || '0',
            subtitle: 'Total New Registrations',
            icon: <PlusCircle size={18} />,
            color: 'text-indigo-600',
            bg: 'bg-indigo-50/50',
            access: ['admin', 'reception']
        },
        {
            title: 'Monthly Net',
            value: `Rs. ${summary?.financials?.netMonth?.toLocaleString() || '0'}`,
            subtitle: 'Net Profit (Month)',
            icon: <TrendingUp size={18} />,
            color: summary?.financials?.netMonth >= 0 ? 'text-emerald-600' : 'text-rose-600',
            bg: summary?.financials?.netMonth >= 0 ? 'bg-emerald-50/50' : 'bg-rose-50/50',
            access: ['admin']
        },
        {
            title: 'Absent Today',
            value: absentCount || '0',
            subtitle: 'Missing in Action',
            icon: <Activity size={18} />,
            color: 'text-slate-400',
            bg: 'bg-slate-50/50',
            access: ['admin', 'reception']
        },
    ];

    const stats = allStats.filter(s => s.access.includes(user?.role || ''));

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-600 rounded-lg text-white shadow-lg shadow-indigo-200">
                        <Activity size={20} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Gym Dashboard</h1>
                        <div className="flex items-center gap-2 mt-1">
                            <div className={`w-2 h-2 rounded-full ${user?.role === 'admin' ? 'bg-emerald-500' : 'bg-indigo-500'} animate-pulse`}></div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                {user?.role === 'admin' ? 'Admin Strategic Mode' : 'Reception Operational Mode'} • System Active
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="hidden lg:flex flex-col items-end mr-2">
                        <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Global Status: Online</p>
                        {lastUpdated && <p className="text-[8px] font-bold text-indigo-400 uppercase tracking-tighter">Last Sync: {lastUpdated}</p>}
                    </div>
                    <button
                        onClick={() => fetchData()}
                        disabled={isRefreshing}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all shadow-sm group"
                    >
                        <TrendingUp size={12} className={`${isRefreshing ? 'animate-bounce' : 'group-hover:translate-y-[-1px]'}`} />
                        <span>{isRefreshing ? 'Syncing...' : 'Refresh Node'}</span>
                    </button>
                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
                        <img src="https://ui-avatars.com/api/?name=Admin&background=4F46E5&color=fff&bold=true" alt="Admin" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4">
                {isRefreshing && !summary ? (
                    Array(8).fill(0).map((_, i) => (
                        <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm h-32">
                            <Skeleton className="w-1/2 h-4 mb-4" />
                            <Skeleton className="w-3/4 h-8 mb-2" />
                            <Skeleton className="w-1/2 h-3" />
                        </div>
                    ))
                ) : (
                    stats.map((stat, i) => (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            key={i}
                            className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:border-indigo-100 transition-colors relative overflow-hidden group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none">{stat.title}</h3>
                                <div className={`p-2.5 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform shadow-sm`}>
                                    {stat.icon}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{stat.subtitle}</p>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>

            {/* Charts Grid - Hidden for Receptionist */}
            {user?.role === 'admin' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Financial Flow Section (Span 2) */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"
                    >
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h3 className="text-lg font-bold text-slate-800 tracking-tight">Financial Performance Flow</h3>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Weekly Income vs Operational Expense Index</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[9px] font-black uppercase tracking-widest border border-emerald-100">
                                    <TrendingUp size={12} />
                                    <span>Profitability High</span>
                                </div>
                            </div>
                        </div>

                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={weeklyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                                        dy={10}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                                        tickFormatter={(val) => `Rs.${val}`}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            borderRadius: '16px',
                                            border: '1px solid #f1f5f9',
                                            boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                                            fontSize: '11px',
                                            fontWeight: '800'
                                        }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="income"
                                        stroke="#10b981"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorIncome)"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="expense"
                                        stroke="#ef4444"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorExpense)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="mt-6 flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-emerald-500 rounded-lg shadow-sm"></div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Income</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-rose-500 rounded-lg shadow-sm"></div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Operating Expenses</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Financial Breakdowns */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-slate-800 tracking-tight">Source vs Allocation</h3>
                            <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 text-slate-500 rounded-lg text-[9px] font-black uppercase tracking-widest border border-slate-100">
                                Monthly Breakdown
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 flex justify-between">
                                    <span>Source of Income</span>
                                    <span className="text-emerald-500">Total: Rs. {summary?.financials?.revenueThisMonth?.toLocaleString()}</span>
                                </p>
                                <div className="space-y-4">
                                    {summary?.financials?.incomeBreakdown?.map((item: any, i: number) => {
                                        const percentage = (item.total / summary.financials.revenueThisMonth) * 100;
                                        return (
                                            <div key={i} className="space-y-1">
                                                <div className="flex justify-between text-[11px] font-bold">
                                                    <span className="text-slate-600 capitalize">{item._id.replace('_', ' ')}</span>
                                                    <span className="text-slate-400">{Math.round(percentage)}%</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${percentage}%` }}
                                                        className="h-full bg-emerald-500 rounded-full"
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 flex justify-between">
                                    <span>Expense Allocation</span>
                                    <span className="text-rose-500">Total: Rs. {summary?.financials?.expenseThisMonth?.toLocaleString()}</span>
                                </p>
                                <div className="space-y-4">
                                    {summary?.financials?.expenseBreakdown?.map((item: any, i: number) => {
                                        const percentage = (item.total / summary.financials.expenseThisMonth) * 100;
                                        return (
                                            <div key={i} className="space-y-1">
                                                <div className="flex justify-between text-[11px] font-bold">
                                                    <span className="text-slate-600 capitalize">{item._id.replace('_', ' ')}</span>
                                                    <span className="text-slate-400">{Math.round(percentage)}%</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${percentage}%` }}
                                                        className="h-full bg-rose-500 rounded-full"
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Advanced Insights Row - Admin Only */}
            {user?.role === 'admin' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Top Spenders */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden"
                    >
                        <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-indigo-50/30">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-200">
                                    <Crown size={18} />
                                </div>
                                <h3 className="text-lg font-black text-slate-800 tracking-tight">Top Financial Contributors</h3>
                            </div>
                            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest bg-white px-3 py-1 rounded-lg border border-indigo-100">All-time Index</span>
                        </div>
                        <div className="p-2">
                            {summary?.financials?.topSpenders?.length > 0 ? summary.financials.topSpenders.map((sp: any, i: number) => (
                                <div key={i} className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-all group">
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 font-black">
                                                {sp.name.charAt(0)}
                                            </div>
                                            {i === 0 && <div className="absolute -top-2 -right-2 bg-amber-400 text-white p-1 rounded-lg shadow-lg"><Crown size={10} /></div>}
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-slate-900 leading-none mb-1">{sp.name}</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{sp.plan} Member</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-black text-emerald-600 tracking-tight">Rs. {sp.totalSpent?.toLocaleString()}</p>
                                        <p className="text-[9px] font-black text-slate-300 uppercase tracking-tighter">Gross Contribution</p>
                                    </div>
                                </div>
                            )) : (
                                <div className="py-12 text-center text-slate-300 uppercase font-black text-[10px] tracking-widest">No spending data feed</div>
                            )}
                        </div>
                    </motion.div>

                    {/* Churn Risk */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden"
                    >
                        <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-rose-50/30">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-rose-500 rounded-xl text-white shadow-lg shadow-rose-200">
                                    <UserMinus size={18} />
                                </div>
                                <h3 className="text-lg font-black text-slate-800 tracking-tight">Retention Risk Alerts</h3>
                            </div>
                            <span className="text-[10px] font-black text-rose-600 uppercase tracking-widest bg-white px-3 py-1 rounded-lg border border-rose-100">14+ Days Inactive</span>
                        </div>
                        <div className="p-2">
                            {summary?.members?.churnRisk?.length > 0 ? summary.members.churnRisk.map((cr: any, i: number) => (
                                <div key={i} className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-all group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-300 font-black">
                                            {cr.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-slate-900 leading-none mb-1">{cr.name}</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{cr.plan} • At Risk</p>
                                        </div>
                                    </div>
                                    <button className="flex items-center gap-1.5 px-4 py-2 bg-rose-50 text-rose-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-100 transition-all">
                                        <Activity size={12} />
                                        <span>Nudge</span>
                                    </button>
                                </div>
                            )) : (
                                <div className="py-12 text-center text-slate-300 uppercase font-black text-[10px] tracking-widest">Perfect retention detected</div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Activities & Approvals Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Recent Activity Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="xl:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
                >
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                        <h3 className="text-lg font-bold text-slate-800 tracking-tight">Live Member Check-ins</h3>
                        <button className="text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-700">View History</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Member</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Time</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {recentAttendance.length > 0 ? recentAttendance.map((att, i) => (
                                    <tr key={i} className="hover:bg-slate-50/30 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 font-black text-[10px]">
                                                    {att.userId?.firstName?.charAt(0) || 'U'}{att.userId?.lastName?.charAt(0) || 'N'}
                                                </div>
                                                <div>
                                                    <p className="text-xs font-black text-slate-900 leading-none mb-0.5">{att.userId?.firstName || 'Unknown'} {att.userId?.lastName || 'User'}</p>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{att.userId?.membership?.plan || 'Regular'} Member</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <p className="text-xs font-bold text-slate-600 tracking-tight">
                                                    {att.clockIn ? new Date(att.clockIn).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) : '--:--'}
                                                </p>
                                                <p className="text-[9px] font-bold text-slate-300 uppercase tracking-tighter">
                                                    {att.clockOut ? 'Clocked Out' : 'Currently In'}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-300 group-hover:text-indigo-600 transition-colors">
                                                <ArrowUpRight size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={3} className="px-6 py-12 text-center">
                                            <p className="text-xs font-bold text-slate-400 uppercase italic">No active sessions detected</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* Team Communications Section */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 }}
                    className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col min-h-[500px]"
                >
                    <div className="p-6 border-b border-slate-100 bg-indigo-50/30 flex items-center gap-3">
                        <div className="p-2 bg-indigo-600 rounded-lg text-white">
                            <MessageSquare size={18} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-800 tracking-tight">Staff Quick Notes</h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Internal Team Coordination</p>
                        </div>
                    </div>

                    <div className="flex-1 p-6 space-y-4 overflow-y-auto max-h-[400px]">
                        {staffNotes.map((n) => (
                            <div key={n.id} className={`p-4 rounded-2xl ${n.user === 'Admin' ? 'bg-indigo-50/50 border border-indigo-100 ml-4' : 'bg-slate-50 border border-slate-100 mr-4'}`}>
                                <div className="flex justify-between items-center mb-2">
                                    <span className={`text-[10px] font-black uppercase tracking-widest ${n.user === 'Admin' ? 'text-indigo-600' : 'text-slate-500'}`}>{n.user}</span>
                                    <span className="text-[9px] font-bold text-slate-300 uppercase">{n.time || new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </div>
                                <p className="text-sm text-slate-800 font-medium leading-relaxed">{n.text}</p>
                            </div>
                        ))}
                    </div>

                    <div className="p-6 border-t border-slate-100">
                        <div className="flex gap-2 p-2 bg-slate-50 rounded-2xl border border-slate-100 focus-within:border-indigo-300 transition-all">
                            <input
                                type="text"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendNote()}
                                placeholder="Type a note for the team..."
                                className="flex-1 bg-transparent border-none outline-none text-sm px-3 font-medium text-slate-700 placeholder:text-slate-400"
                            />
                            <button
                                onClick={handleSendNote}
                                className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Membership Approvals Section (Admin Only) */}
            {user?.role === 'admin' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                    className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
                >
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-amber-50/30">
                        <div className="flex items-center gap-2">
                            <Zap size={18} className="text-amber-500" />
                            <h3 className="text-lg font-bold text-slate-800 tracking-tight">Pending Approvals</h3>
                        </div>
                        <span className="px-2 py-1 bg-amber-100 text-amber-600 rounded-lg text-[10px] font-black uppercase tracking-widest">
                            {pendingMembers.length} Requests
                        </span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Member</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {pendingMembers.length > 0 ? pendingMembers.map((member, i) => (
                                    <tr key={i} className="hover:bg-slate-50/30 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 font-black text-[10px]">
                                                    {member.firstName.charAt(0)}{member.lastName?.charAt(0) || ''}
                                                </div>
                                                <div>
                                                    <p className="text-xs font-black text-slate-900 leading-none mb-0.5">{member.firstName} {member.lastName}</p>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{member.employeeId}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleApprove(member._id)}
                                                disabled={actionLoading === member._id}
                                                className={`px-4 py-2 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all ${actionLoading === member._id ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            >
                                                {actionLoading === member._id ? (
                                                    <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                ) : 'Approve'}
                                            </button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={2} className="px-6 py-8 text-center">
                                            <p className="text-xs font-bold text-slate-400 uppercase italic">No pending requests found</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default AdminOverview;
