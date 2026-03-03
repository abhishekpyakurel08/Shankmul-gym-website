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
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    Legend
} from 'recharts';
import {
    DollarSign,
    Activity,
    Users,
    ArrowUpRight,
    TrendingUp,
    Clock,
    XCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/useAuthStore';
import { useQueryClient } from '@tanstack/react-query';
import {
    useDashboardSummary,
    useAbsentMembers,
    useWeeklyStats,
    useSendCustomNotification
} from '../../hooks/useDashboardQueries';

const AdminOverview: React.FC = () => {
    const { user } = useAuthStore();
    const queryClient = useQueryClient();
    const notifyMutation = useSendCustomNotification();

    const [timeRange, setTimeRange] = useState<string>('7d');
    const [lastUpdated, setLastUpdated] = useState<string>('');

    // Queries
    const { data: summary, isLoading: isSummaryLoading, isRefetching: isSummaryRefetching } = useDashboardSummary();
    const { data: absentData } = useAbsentMembers();
    const { data: weeklyData } = useWeeklyStats(timeRange);

    const absentCount = absentData?.length || 0;

    const isRefreshing = isSummaryLoading || isSummaryRefetching;


    const Skeleton = ({ className }: { className: string }) => (
        <div className={`animate-pulse bg-slate-100 rounded-xl ${className}`} />
    );

    useEffect(() => {
        if (!isRefreshing) {
            setLastUpdated(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        }
    }, [isRefreshing]);

    // Persistent timeout ref for debouncing
    const invalidateTimeoutRef = React.useRef<any>(null);

    const debouncedInvalidate = React.useCallback(() => {
        if (invalidateTimeoutRef.current) {
            clearTimeout(invalidateTimeoutRef.current);
        }
        invalidateTimeoutRef.current = setTimeout(() => {
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
            queryClient.invalidateQueries({ queryKey: ['attendance'] });
            queryClient.invalidateQueries({ queryKey: ['finance'] });
            invalidateTimeoutRef.current = null;
        }, 5000); // 5 second buffer to prevent 429
    }, [queryClient]);

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        const BACKEND_SOCKET_URL = import.meta.env.VITE_BACKEND_URL;

        if (!BACKEND_SOCKET_URL) return;

        const newSocket = io(BACKEND_SOCKET_URL, {
            query: {
                role: user?.role || 'admin',
                token: token
            }
        });

        newSocket.on('user_clock_in', debouncedInvalidate);
        newSocket.on('user_clock_out', debouncedInvalidate);
        newSocket.on('new_member_registered', debouncedInvalidate);
        newSocket.on('membership_approved', debouncedInvalidate);
        newSocket.on('membership_request', debouncedInvalidate);
        newSocket.on('transaction_added', debouncedInvalidate);
        newSocket.on('attendance_deleted', debouncedInvalidate);
        newSocket.on('stats_updated', debouncedInvalidate);

        return () => {
            newSocket.disconnect();
        };
    }, [user?.role, debouncedInvalidate]);

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
            title: 'Monthly Net',
            value: `Rs. ${summary?.financials?.netMonth?.toLocaleString() || '0'}`,
            subtitle: 'Net Profit (Month)',
            icon: <TrendingUp size={18} />,
            color: (summary?.financials?.netMonth || 0) >= 0 ? 'text-emerald-600' : 'text-rose-600',
            bg: (summary?.financials?.netMonth || 0) >= 0 ? 'bg-emerald-50/50' : 'bg-rose-50/50',
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
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-600 rounded-lg text-white shadow-lg shadow-indigo-200">
                        <Activity size={20} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Shankhamul Dashboard</h1>
                        <div className="flex items-center gap-2 mt-1">
                            <div className={`w-2 h-2 rounded-full ${user?.role === 'admin' ? 'bg-emerald-500' : 'bg-indigo-500'} animate-pulse`}></div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                {user?.role === 'admin' ? 'Admin Strategic Mode' : 'Reception Operational Mode'} • System Active
                            </p>
                        </div>
                    </div>
                </div>

                {/* Range Selector */}
                <div className="flex items-center bg-white p-1 rounded-2xl border border-slate-100 shadow-sm overflow-x-auto no-scrollbar max-w-full">
                    <div className="flex items-center min-w-max">
                        {[
                            { label: '7D', value: '7d' },
                            { label: '1M', value: '1m' },
                            { label: '3M', value: '3m' },
                            { label: '6M', value: '6m' },
                            { label: '1Y', value: '1y' }
                        ].map((range) => (
                            <button
                                key={range.value}
                                onClick={() => setTimeRange(range.value)}
                                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${timeRange === range.value
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100'
                                    : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                                    }`}
                            >
                                {range.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                    <div className="flex items-center gap-3">
                        <div className="hidden sm:flex flex-col items-end mr-2 text-right">
                            <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Global Status: Online</p>
                            {lastUpdated && <p className="text-[8px] font-bold text-indigo-400 uppercase tracking-tighter">Last Sync: {lastUpdated}</p>}
                        </div>
                        <button
                            onClick={() => {
                                queryClient.refetchQueries({ queryKey: ['dashboard'] });
                                queryClient.refetchQueries({ queryKey: ['dashboard', 'stats', timeRange] });
                            }}
                            disabled={isRefreshing}
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all shadow-sm group"
                        >
                            <TrendingUp size={12} className={`${isRefreshing ? 'animate-bounce' : 'group-hover:translate-y-[-1px]'}`} />
                            <span className="hidden xs:inline">{isRefreshing ? 'Syncing...' : 'Refresh Node'}</span>
                        </button>
                    </div>
                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden flex-shrink-0">
                        <img src="https://ui-avatars.com/api/?name=Admin&background=4F46E5&color=fff&bold=true" alt="Admin" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {isSummaryLoading && !summary ? (
                    Array(5).fill(0).map((_: any, i: number) => (
                        <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm h-32">
                            <Skeleton className="w-1/2 h-4 mb-4" />
                            <Skeleton className="w-3/4 h-8 mb-2" />
                            <Skeleton className="w-1/2 h-3" />
                        </div>
                    ))
                ) : (
                    stats.map((stat: any, i: number) => (
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
                                <h3 className="text-lg font-bold text-slate-800 tracking-tight">Earnings vs. Spending</h3>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                                    {timeRange === '7d' ? 'Last week\'s' : timeRange === '1m' ? 'Monthly' : timeRange === '3m' ? 'Quarterly' : timeRange === '6m' ? 'Six month' : 'Annual'}
                                    view of money earned and operational expenses
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[9px] font-black uppercase tracking-widest border border-emerald-100">
                                    <TrendingUp size={12} />
                                    <span>Business is Healthy</span>
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
                                        content={({ active, payload, label }) => {
                                            if (active && payload && payload.length) {
                                                const income = payload.find(p => p.dataKey === 'income')?.value || 0;
                                                const expense = payload.find(p => p.dataKey === 'expense')?.value || 0;
                                                const profit = Number(income) - Number(expense);
                                                return (
                                                    <div className="bg-white p-4 rounded-2xl shadow-2xl border border-slate-100 min-w-[200px]">
                                                        <p className="text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest">{label}</p>
                                                        <div className="space-y-2">
                                                            <div className="flex justify-between items-center">
                                                                <span className="text-[11px] font-bold text-slate-500">Income</span>
                                                                <span className="text-xs font-black text-emerald-600">+Rs. {income.toLocaleString()}</span>
                                                            </div>
                                                            <div className="flex justify-between items-center">
                                                                <span className="text-[11px] font-bold text-slate-500">Expense</span>
                                                                <span className="text-xs font-black text-rose-600">-Rs. {expense.toLocaleString()}</span>
                                                            </div>
                                                            <div className="pt-2 border-t border-slate-50 flex justify-between items-center">
                                                                <span className="text-[11px] font-black text-slate-900 uppercase italic">Net Profit</span>
                                                                <span className={`text-xs font-black ${profit >= 0 ? 'text-indigo-600' : 'text-rose-600'}`}>
                                                                    {profit >= 0 ? '+' : ''}Rs. {profit.toLocaleString()}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                            return null;
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

                    {/* Financial Activity Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-6"
                    >
                        {/* Pie Chart - Income Breakdown */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-slate-800 tracking-tight">Where Money Comes From</h3>
                                <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[9px] font-black uppercase tracking-widest border border-emerald-100">
                                    Monthly
                                </div>
                            </div>

                            <div className="h-[280px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={summary?.financials?.incomeBreakdown?.map((item: any) => ({
                                                name: item._id.replace('_', ' '),
                                                value: item.total
                                            })) || []}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={90}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {summary?.financials?.incomeBreakdown?.map((_: any, index: number) => (
                                                <Cell key={`cell-${index}`} fill={['#10b981', '#6366f1', '#8b5cf6', '#ec4899'][index % 4]} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{
                                                borderRadius: '12px',
                                                border: '1px solid #f1f5f9',
                                                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                                                fontSize: '11px',
                                                fontWeight: '800'
                                            }}
                                            formatter={(value: any) => `Rs. ${value.toLocaleString()}`}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="mt-4 space-y-2">
                                {summary?.financials?.incomeBreakdown?.map((item: any, i: number) => {
                                    const colors = ['#10b981', '#6366f1', '#8b5cf6', '#ec4899'];
                                    const percentage = (item.total / summary.financials.revenueThisMonth) * 100 || 0;
                                    return (
                                        <div key={i} className="flex items-center justify-between text-xs">
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[i % 4] }}></div>
                                                <span className="font-bold text-slate-600 capitalize">{item._id.replace('_', ' ')}</span>
                                            </div>
                                            <span className="font-black text-slate-900">{Math.round(percentage)}%</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Bar Chart - Daily Activity */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-slate-800 tracking-tight">Money Activity History</h3>
                                <div className="flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[9px] font-black uppercase tracking-widest border border-indigo-100">
                                    {timeRange === '7d' ? 'Last 7 Days' : timeRange === '1m' ? 'Last 30 Days' : timeRange === '3m' ? 'Last 3 Months' : timeRange === '6m' ? 'Last 6 Months' : 'Last 1 Year'}
                                </div>
                            </div>

                            <div className="h-[280px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis
                                            dataKey="name"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                                            tickFormatter={(val) => `${val / 1000}k`}
                                        />
                                        <Tooltip
                                            content={({ active, payload, label }) => {
                                                if (active && payload && payload.length) {
                                                    const income = payload.find(p => p.dataKey === 'income')?.value || 0;
                                                    const expense = payload.find(p => p.dataKey === 'expense')?.value || 0;
                                                    return (
                                                        <div className="bg-white p-4 rounded-2xl shadow-2xl border border-slate-100 min-w-[180px]">
                                                            <p className="text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest">{label}</p>
                                                            <div className="space-y-1.5">
                                                                <div className="flex justify-between items-center gap-4">
                                                                    <span className="text-[11px] font-bold text-slate-500">Collected</span>
                                                                    <span className="text-xs font-black text-emerald-600">Rs. {income.toLocaleString()}</span>
                                                                </div>
                                                                <div className="flex justify-between items-center gap-4">
                                                                    <span className="text-[11px] font-bold text-slate-500">Spent</span>
                                                                    <span className="text-xs font-black text-rose-600">Rs. {expense.toLocaleString()}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            }}
                                        />
                                        <Legend
                                            wrapperStyle={{ fontSize: '10px', fontWeight: '800' }}
                                        />
                                        <Bar dataKey="income" fill="#10b981" radius={[8, 8, 0, 0]} />
                                        <Bar dataKey="expense" fill="#ef4444" radius={[8, 8, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Bottom Insight Rows */}
            {user?.role === 'admin' && summary && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    {/* Top Spenders Card */}
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                                    <TrendingUp size={20} className="text-indigo-600" />
                                    Top Contributors
                                </h3>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Highest lifetime value members</p>
                            </div>
                            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                                <Users size={20} />
                            </div>
                        </div>

                        <div className="space-y-4">
                            {summary?.financials?.topSpenders?.length > 0 ? (
                                summary.financials.topSpenders.map((member: any, idx: number) => (
                                    <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-indigo-200 transition-all group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-black text-indigo-600 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                                {idx + 1}
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-slate-900">{member.name}</p>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{member.plan || 'No Plan'}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-black text-emerald-600">Rs. {member.totalSpent?.toLocaleString()}</p>
                                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Total Investment</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center py-8 text-slate-400 italic text-sm">Gathering contributor data...</p>
                            )}
                        </div>
                    </div>

                    {/* Churn Risk / At Risk Card */}
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                                    <XCircle size={20} className="text-rose-600" />
                                    Retention Alert
                                </h3>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Inactive members (14+ Days)</p>
                            </div>
                            <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl">
                                <Clock size={20} />
                            </div>
                        </div>

                        <div className="space-y-4">
                            {summary?.members?.churnRisk?.length > 0 ? (
                                summary.members.churnRisk.map((member: any, idx: number) => (
                                    <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-rose-200 transition-all group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-rose-100 border border-rose-200 flex items-center justify-center font-black text-rose-600 shadow-sm">
                                                {member.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-slate-900">{member.name}</p>
                                                <p className="text-[10px] font-bold text-rose-400 uppercase tracking-widest">At Risk • {member.plan || 'No Plan'}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => {
                                                notifyMutation.mutate({
                                                    userIds: [member._id],
                                                    title: 'We miss you! 🏋️',
                                                    message: `Hi ${member.name.split(' ')[0]}, we haven't seen you in 14 days! Consistency is key to reaching your goals. See you tomorrow?`
                                                }, {
                                                    onSuccess: () => alert(`Re-engagement alert sent to ${member.name}!`)
                                                });
                                            }}
                                            disabled={notifyMutation.status === 'pending'}
                                            className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-600 uppercase tracking-widest hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all disabled:opacity-50"
                                        >
                                            {notifyMutation.status === 'pending' && notifyMutation.variables?.userIds[0] === member._id ? 'Sending...' : 'Re-engage'}
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center py-12">
                                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                                        <TrendingUp size={24} />
                                    </div>
                                    <p className="text-slate-900 font-black text-sm">Perfect Retention!</p>
                                    <p className="text-slate-400 font-bold text-xs mt-1">No active members at risk today.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
};

export default AdminOverview;
