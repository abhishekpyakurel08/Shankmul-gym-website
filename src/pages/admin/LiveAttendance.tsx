/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import {
    Activity,
    UserCheck,
    UserMinus,
    Clock,
    Zap,
    ChevronRight,
    Circle,
    Info,
    Search,
    UserX
} from 'lucide-react';
import { api } from '../../services/api';
import { motion, AnimatePresence } from 'framer-motion';

interface LiveEvent {
    id: string;
    userId: string;
    userName: string;
    profileImage?: string;
    time: string;
    type: 'clock-in' | 'clock-out';
    status?: string;
    department?: string;
}

const LiveAttendance: React.FC = () => {
    const [events, setEvents] = useState<LiveEvent[]>([]);
    const [absentMembers, setAbsentMembers] = useState<any[]>([]);
    const [activeView, setActiveView] = useState<'live' | 'absent'>('live');
    const [isConnected, setIsConnected] = useState(false);
    const [stats, setStats] = useState({
        totalToday: 0,
        activeNow: 0,
        lateArrivals: 0
    });
    const fetchInitialData = async () => {
        try {
            const [attRes, absentRes] = await Promise.all([
                api.get('/attendance/admin/today'),
                api.get('/attendance/admin/absent')
            ]);

            if (attRes && attRes.success) {
                const formattedEvents = attRes.data.map((att: any) => ({
                    id: att._id,
                    userId: att.userId?._id,
                    userName: `${att.userId?.firstName} ${att.userId?.lastName}`,
                    profileImage: att.userId?.profileImage,
                    department: att.userId?.department,
                    time: att.clockIn ? att.clockIn.split('T')[1].split('.')[0] : 'N/A',
                    type: att.clockOut ? 'clock-out' : 'clock-in',
                    status: att.status
                })).reverse();

                setEvents(formattedEvents);

                const active = attRes.data.filter((a: any) => !a.clockOut).length;
                const late = attRes.data.filter((a: any) => a.status === 'late').length;

                setStats({
                    totalToday: attRes.data.length,
                    activeNow: active,
                    lateArrivals: late
                });
            }

            if (absentRes && absentRes.success) {
                setAbsentMembers(absentRes.data || []);
            }
        } catch (err) {
            console.error("Failed to fetch dashboard data:", err);
        }
    };

    useEffect(() => {
        fetchInitialData();

        const token = localStorage.getItem('adminToken');
        const BACKEND_URL = 'https://shankmul-gym-backend.tecobit.cloud';

        const socket = io(BACKEND_URL, {
            query: {
                role: 'admin',
                token: token
            }
        });

        socket.on('connect', () => setIsConnected(true));
        socket.on('disconnect', () => setIsConnected(false));

        socket.on('user_clock_in', (data: any) => {
            const newEvent: LiveEvent = {
                id: data.attendanceId,
                userId: data.userId,
                userName: data.userName,
                profileImage: data.profileImage,
                time: data.time,
                type: 'clock-in',
                status: data.status
            };
            setEvents(prev => [newEvent, ...prev].slice(0, 50));
            setStats(s => ({
                ...s,
                totalToday: s.totalToday + 1,
                activeNow: s.activeNow + 1,
                lateArrivals: data.status === 'late' ? s.lateArrivals + 1 : s.lateArrivals
            }));
        });

        socket.on('user_clock_out', (data: any) => {
            setStats(s => ({ ...s, activeNow: Math.max(0, s.activeNow - 1) }));
            const logoutEvent: LiveEvent = {
                id: data.attendanceId + '_out',
                userId: data.userId,
                userName: 'Member Clocked Out',
                time: data.time,
                type: 'clock-out'
            };
            setEvents(prev => [logoutEvent, ...prev].slice(0, 50));
        });

        socket.on('attendance_deleted', (data: any) => {
            setEvents(prev => prev.filter(e => e.id !== data.attendanceId));
            fetchInitialData();
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Context Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-600 rounded-lg text-white shadow-lg shadow-indigo-200">
                        <Activity size={20} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Live Attendance Monitor</h1>
                        <div className="flex items-center gap-2 mt-1">
                            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Real-Time Data Ingestion • Stream 01</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className={`flex items-center gap-2 px-6 py-2 rounded-xl border bg-white shadow-sm transition-all ${isConnected ? 'text-emerald-600 border-emerald-100' : 'text-rose-600 border-rose-100'}`}>
                        <span className={`w-2.5 h-2.5 rounded-full ${isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></span>
                        <span className="text-[10px] font-black uppercase tracking-widest">{isConnected ? 'System Live' : 'Link Interrupted'}</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest bg-white px-4 py-2 rounded-xl border border-slate-100 shadow-sm">
                            Global Sync • NP
                        </span>
                        <div className="w-10 h-10 rounded-2xl bg-indigo-50 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
                            <img src="https://ui-avatars.com/api/?name=Admin&background=4F46E5&color=fff&bold=true" alt="Admin" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    { label: 'Active Personnel On-Site', value: stats.activeNow, icon: <UserCheck size={20} />, color: 'text-indigo-600', bg: 'bg-indigo-50/50' },
                    { label: 'Session Volume Today', value: stats.totalToday, icon: <Zap size={20} />, color: 'text-amber-500', bg: 'bg-amber-50/50' },
                    { label: 'Threshold Alerts (Late)', value: stats.lateArrivals, icon: <Clock size={20} />, color: 'text-rose-500', bg: 'bg-rose-50/50' },
                ].map((stat, i) => (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        key={i}
                        className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-indigo-100 transition-colors"
                    >
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">{stat.label}</p>
                            <p className="text-3xl font-black text-slate-900 leading-none">{stat.value}</p>
                        </div>
                        <div className={`p-4 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform shadow-sm`}>
                            {stat.icon}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Live Activity Feed */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col h-[700px]">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setActiveView('live')}
                                    className={`text-sm font-black uppercase tracking-widest pb-1 transition-all relative ${activeView === 'live' ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
                                >
                                    Live Stream
                                    {activeView === 'live' && <motion.div layoutId="activeViewLine" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />}
                                </button>
                                <button
                                    onClick={() => setActiveView('absent')}
                                    className={`text-sm font-black uppercase tracking-widest pb-1 transition-all relative ${activeView === 'absent' ? 'text-rose-500' : 'text-slate-400 hover:text-slate-600'}`}
                                >
                                    Absent Today
                                    {activeView === 'absent' && <motion.div layoutId="activeViewLine" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-rose-500 rounded-full" />}
                                </button>
                            </div>
                            <div className="relative w-48">
                                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder={activeView === 'live' ? "Filter feed..." : "Search absent..."}
                                    className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border-none rounded-lg text-xs font-medium focus:ring-2 focus:ring-indigo-100"
                                />
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                            <AnimatePresence initial={false}>
                                {activeView === 'live' ? (
                                    events.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center h-full text-center space-y-3">
                                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
                                                <Activity size={32} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-800">No Activity Yet</p>
                                                <p className="text-sm text-slate-400">Waiting for members to clock in...</p>
                                            </div>
                                        </div>
                                    ) : (
                                        events.map((event) => (
                                            <motion.div
                                                key={event.id}
                                                initial={{ opacity: 0, x: -20, height: 0 }}
                                                animate={{ opacity: 1, x: 0, height: 'auto' }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                className="group relative"
                                            >
                                                {/* Existing event card logic */}
                                                <div className={`p-4 rounded-xl border transition-all duration-300 ${event.type === 'clock-in'
                                                    ? 'bg-white border-slate-100 hover:border-indigo-200 hover:shadow-md'
                                                    : 'bg-slate-50/50 border-transparent opacity-75'
                                                    }`}>
                                                    <div className="flex items-center gap-4">
                                                        <div className="relative shrink-0">
                                                            <img
                                                                src={event.profileImage || `https://ui-avatars.com/api/?name=${event.userName}&background=random&bold=true`}
                                                                alt={event.userName}
                                                                className="w-12 h-12 rounded-xl object-cover shadow-sm"
                                                            />
                                                            <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-lg flex items-center justify-center border-2 border-white shadow-sm ${event.type === 'clock-in' ? 'bg-indigo-600 text-white' : 'bg-slate-400 text-white'
                                                                }`}>
                                                                {event.type === 'clock-in' ? <UserCheck size={10} /> : <UserMinus size={10} />}
                                                            </div>
                                                        </div>

                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center justify-between mb-0.5">
                                                                <h4 className="font-bold text-slate-900 truncate pr-2 tracking-tight">
                                                                    {event.userName}
                                                                </h4>
                                                                <div className="flex items-center gap-2">
                                                                    {event.type === 'clock-out' && (
                                                                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                                                                            Finished
                                                                        </span>
                                                                    )}
                                                                    <span className="text-[10px] font-bold text-slate-400 whitespace-nowrap bg-slate-100 px-2 py-0.5 rounded">
                                                                        {event.time}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <span className={`text-[10px] font-black uppercase tracking-widest ${event.type === 'clock-in' ? 'text-indigo-600' : 'text-slate-500'
                                                                    }`}>
                                                                    {event.type === 'clock-in' ? 'Check In' : 'Check Out'}
                                                                </span>
                                                                {event.status === 'late' && (
                                                                    <>
                                                                        <span className="text-slate-200 text-xs text-bold">|</span>
                                                                        <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest flex items-center gap-1">
                                                                            <Zap size={10} /> Late
                                                                        </span>
                                                                    </>
                                                                )}
                                                                <span className="text-slate-200 text-xs text-bold">|</span>
                                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                                    {event.department || 'Regular'}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <button className="p-2 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all shrink-0">
                                                            <ChevronRight size={18} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))
                                    )
                                ) : (
                                    absentMembers.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center h-full text-center space-y-3">
                                            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500">
                                                <UserCheck size={32} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-800">100% Attendance</p>
                                                <p className="text-sm text-slate-400">Everyone has clocked in today!</p>
                                            </div>
                                        </div>
                                    ) : (
                                        absentMembers.map((member) => (
                                            <motion.div
                                                key={member.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="p-4 rounded-xl border border-slate-100 bg-white hover:border-rose-100 transition-all flex items-center gap-4"
                                            >
                                                <div className="relative shrink-0">
                                                    <img
                                                        src={member.profileImage || `https://ui-avatars.com/api/?name=${member.firstName}+${member.lastName}&background=rose&color=fff&bold=true`}
                                                        alt={member.firstName}
                                                        className="w-12 h-12 rounded-xl object-cover grayscale opacity-60"
                                                    />
                                                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-lg bg-rose-500 text-white flex items-center justify-center border-2 border-white shadow-sm">
                                                        <UserX size={10} />
                                                    </div>
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-slate-900 tracking-tight">{member.firstName} {member.lastName}</h4>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Absent Today</span>
                                                        <span className="text-slate-200 text-xs">|</span>
                                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{member.membership?.plan || 'Member'}</span>
                                                    </div>
                                                </div>
                                                <button className="px-4 py-2 bg-slate-50 text-slate-400 rounded-lg text-[10px] font-black uppercase hover:bg-indigo-50 hover:text-indigo-600 transition-all">Remind</button>
                                            </motion.div>
                                        ))
                                    )
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Sidebar Alerts and Stats */}
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm relative overflow-hidden">
                        <div className="relative z-10 space-y-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Gym Capacity</p>
                                    <h4 className="text-3xl font-black text-slate-900">24%</h4>
                                </div>
                                <div className="p-2 bg-indigo-50 rounded-lg">
                                    <Activity size={20} className="text-indigo-600" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: '24%' }}
                                        transition={{ duration: 1.5 }}
                                        className="h-full bg-indigo-600 rounded-full"
                                    ></motion.div>
                                </div>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Approx. 42 memberships active right now</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
                                <div>
                                    <p className="text-xl font-bold text-slate-900">42</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Avg Mins</p>
                                </div>
                                <div>
                                    <p className="text-xl font-bold text-indigo-600">+12%</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Growth</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                                <Info size={16} />
                            </div>
                            <h3 className="font-bold text-slate-800 text-sm">System Alerts</h3>
                        </div>

                        <div className="space-y-3">
                            {[
                                { msg: "Scanner #4 is slow to respond.", type: 'warning' },
                                { msg: "3 Memberships expiring today.", type: 'info' },
                                { msg: "Backup completed successfully.", type: 'success' }
                            ].map((alert, i) => (
                                <div key={i} className={`p-3 rounded-xl border text-xs font-semibold flex items-start gap-3 ${alert.type === 'warning' ? 'bg-amber-50/50 border-amber-100 text-amber-700' :
                                    alert.type === 'success' ? 'bg-emerald-50/50 border-emerald-100 text-emerald-700' :
                                        'bg-indigo-50/50 border-indigo-100 text-indigo-700'
                                    }`}>
                                    <Circle size={6} className="mt-1.5 shrink-0" fill="currentColor" />
                                    <span>{alert.msg}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LiveAttendance;
