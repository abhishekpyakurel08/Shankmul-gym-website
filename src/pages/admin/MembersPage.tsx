/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Search,
    Mail,
    CreditCard,
    XCircle,
    Clock,
    Plus,
    ChevronRight,
    ArrowUpRight,
    Activity,
    Users,
    CheckCircle2,
    Calendar,
    Trash2,
    Settings,
    ShieldAlert,
    LogIn,
    LogOut
} from 'lucide-react';
import { motion } from 'framer-motion';
import { io } from 'socket.io-client';
import { useQueryClient } from '@tanstack/react-query';
import {
    useUsers,
    useTodayAttendance,
    useClockIn,
    useClockOut,
    useApproveMembership,
    useSendCustomNotification,
    useToggleUserStatus,
    useDeleteUser,
    useMemberAttendanceHistory,
    useDeleteAttendance
} from '../../hooks/useDashboardQueries';
import DataErrorState from '../../components/admin/DataErrorState';

interface Member {
    _id: string;
    employeeId: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    role: string;
    isActive: boolean;
    gender?: string;
    age?: number;
    department: string;
    shift: string;
    membership?: {
        plan: string;
        startDate: string;
        expiryDate: string;
        status: 'active' | 'expired' | 'pending';
        monthlyDayCount: number;
    };
    lastActivity?: string;
    createdAt: string;
}

const MembersPage: React.FC = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // Queries
    const { data: members = [], isLoading: isUsersLoading, isError: isUsersError, refetch: refetchUsers } = useUsers();
    const { data: attendanceData = [] } = useTodayAttendance();

    // Mutations
    const clockInMutation = useClockIn();
    const clockOutMutation = useClockOut();
    const approveMutation = useApproveMembership();
    const notifyMutation = useSendCustomNotification();
    const toggleStatusMutation = useToggleUserStatus();
    const deleteUserMutation = useDeleteUser();

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedMember, setSelectedMember] = useState<Member | null>(null);

    // Map today's attendance for quick lookup
    const attendanceMap = React.useMemo(() => {
        const map: Record<string, any> = {};
        attendanceData.forEach((att: any) => {
            if (att.userId && att.userId._id) {
                map[att.userId._id] = att;
            } else if (typeof att.userId === 'string') {
                map[att.userId] = att;
            }
        });
        return map;
    }, [attendanceData]);

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

        const socket = io(BACKEND_URL, {
            query: { role: 'admin', token }
        });

        const invalidateData = () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            queryClient.invalidateQueries({ queryKey: ['attendance'] });
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
        };

        socket.on('new_member_registered', invalidateData);
        socket.on('membership_approved', invalidateData);
        socket.on('membership_request', invalidateData);
        socket.on('user_clock_in', invalidateData);
        socket.on('user_clock_out', invalidateData);
        socket.on('attendance_deleted', invalidateData);
        socket.on('stats_updated', invalidateData);

        return () => {
            socket.disconnect();
        };
    }, [queryClient]);

    const filteredMembers = React.useMemo(() => {
        let results = members as Member[];

        if (searchTerm) {
            results = results.filter(m =>
                `${m.firstName} ${m.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                m.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                m.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (statusFilter !== 'all') {
            if (statusFilter === 'expiring-soon') {
                results = results.filter(m => {
                    if (!m.membership?.expiryDate || m.membership.status !== 'active') return false;
                    const expiryDate = new Date(m.membership.expiryDate);
                    const now = new Date();
                    const daysUntilExpiry = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
                    return daysUntilExpiry > 0 && daysUntilExpiry <= 3;
                });
            } else {
                results = results.filter(m => m.membership?.status === statusFilter);
            }
        }

        return results;
    }, [searchTerm, statusFilter, members]);

    const handleQuickAttendance = async (e: React.MouseEvent, userId: string) => {
        e.stopPropagation();

        const currentRecord = attendanceMap[userId];
        const isClockedIn = !!currentRecord && !currentRecord.clockOut;

        if (currentRecord && currentRecord.clockOut) {
            alert("User has already completed attendance for today.");
            return;
        }

        if (isClockedIn) {
            clockOutMutation.mutate(userId);
        } else {
            clockInMutation.mutate(userId);
        }
    };

    const getStatusStyles = (status?: string) => {
        switch (status) {
            case 'active': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'expired': return 'bg-rose-50 text-rose-600 border-rose-100';
            case 'pending': return 'bg-amber-50 text-amber-600 border-amber-100';
            default: return 'bg-slate-50 text-slate-600 border-slate-100';
        }
    };

    const formatDate = (dateStr?: string) => {
        if (!dateStr) return 'N/A';
        return new Date(dateStr).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const formatRelativeTime = (dateStr?: string) => {
        if (!dateStr) return 'Never';
        const date = new Date(dateStr);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / (60 * 1000));

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;

        const diffHours = Math.floor(diffMins / 60);
        if (diffHours < 24) return `${diffHours}h ago`;

        const diffDays = Math.floor(diffHours / 24);
        if (diffDays < 7) return `${diffDays}d ago`;

        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const handleAction = async (userId: string, action: 'approve' | 'renew' | 'remind' | 'toggle-status' | 'delete-user') => {
        try {
            if (action === 'remind') {
                notifyMutation.mutate({
                    userIds: [userId],
                    title: '⏰ Time to Renew!',
                    message: 'Your membership is expiring soon. Visit the counter today to renew!'
                }, {
                    onSuccess: () => alert('Reminder sent!')
                });
            } else if (action === 'approve') {
                approveMutation.mutate(userId, {
                    onSuccess: () => alert('Membership approved!')
                });
            } else if (action === 'toggle-status') {
                toggleStatusMutation.mutate(userId, {
                    onSuccess: () => alert('User status updated')
                });
            } else if (action === 'delete-user') {
                if (window.confirm('Are you sure you want to PERMANENTLY delete this user? This cannot be undone.')) {
                    deleteUserMutation.mutate(userId, {
                        onSuccess: () => {
                            alert('User deleted permanently');
                            setSelectedMember(null);
                        }
                    });
                }
            }
        } catch (err) {
            console.error(err);
            alert('Action failed');
        }
    };

    const handleExportMembers = () => {
        const token = localStorage.getItem('adminToken');
        const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
        window.open(`${BACKEND_URL}/api/admin/export-members?token=${token}`, '_blank');
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Context Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-600 rounded-lg text-white shadow-lg shadow-indigo-200">
                        <Users size={20} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Members Directory</h1>
                        <div className="flex items-center gap-2 mt-1">
                            <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Database Infrastructure • {members.length} Members</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={handleExportMembers}
                        className="flex items-center gap-2 px-6 py-3 border border-slate-200 rounded-xl text-xs font-black text-slate-600 hover:bg-slate-50 transition-all uppercase tracking-widest"
                    >
                        <ArrowUpRight size={16} className="text-indigo-500" />
                        <span>Export</span>
                    </button>
                    <button
                        onClick={() => navigate('/admin/members/add')}
                        className="flex items-center gap-2 px-6 py-3 bg-[#EE4B6A] text-white rounded-xl text-xs font-black shadow-lg shadow-rose-100 hover:bg-[#D43D5B] transition-all transform active:scale-95 uppercase tracking-widest"
                    >
                        <Plus size={16} />
                        <span>Add Member</span>
                    </button>
                </div>
            </div>

            {/* Premium Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
                {[
                    { label: 'Total Registrations', value: members.length, icon: <Users size={16} />, color: 'text-indigo-600', bg: 'bg-indigo-50/50' },
                    { label: 'Active Sessions', value: members.filter((m: Member) => m.membership?.status === 'active').length, icon: <CheckCircle2 size={16} />, color: 'text-emerald-600', bg: 'bg-emerald-50/50' },
                    {
                        label: 'Expiring Soon',
                        value: members.filter((m: Member) => {
                            if (!m.membership?.expiryDate || m.membership.status !== 'active') return false;
                            const expiryDate = new Date(m.membership.expiryDate);
                            const now = new Date();
                            const daysUntilExpiry = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
                            return daysUntilExpiry > 0 && daysUntilExpiry <= 3;
                        }).length,
                        icon: <ShieldAlert size={16} />,
                        color: 'text-amber-600',
                        bg: 'bg-amber-50/50'
                    },
                    { label: 'Expired Records', value: members.filter((m: Member) => m.membership?.status === 'expired').length, icon: <XCircle size={16} />, color: 'text-rose-600', bg: 'bg-rose-50/50' },
                    { label: 'Pending Approval', value: members.filter((m: Member) => m.membership?.status === 'pending').length, icon: <Clock size={16} />, color: 'text-slate-600', bg: 'bg-slate-50/50', className: 'col-span-2 md:col-span-1' },
                ].map((stat, i) => (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        key={i}
                        className={`bg-white p-4 md:p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-indigo-100 transition-colors ${stat.className || ''}`}
                    >
                        <div>
                            <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{stat.label}</p>
                            <p className="text-xl md:text-2xl font-black text-slate-900 mt-2">{stat.value}</p>
                        </div>
                        <div className={`p-2.5 md:p-3 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                            {stat.icon}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Main Content Card */}
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden min-h-[600px]">
                {/* Search / Filter Section */}
                <div className="px-8 py-6 border-b border-slate-50 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1 w-full max-w-2xl">
                        <div className="relative flex-1 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={16} />
                            <input
                                type="text"
                                placeholder="Search Member ID, Name, or Email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-6 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-indigo-100 transition-all placeholder:text-slate-300"
                            />
                        </div>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-6 py-3.5 bg-slate-50 border-none rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 focus:ring-2 focus:ring-indigo-100 transition-all cursor-pointer"
                        >
                            <option value="all">Every Status</option>
                            <option value="active">Active Members</option>
                            <option value="expiring-soon">⚠️ Expiring Soon (≤3 Days)</option>
                            <option value="expired">Expired Plans</option>
                            <option value="pending">Pending Review</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-2 rounded-xl border border-slate-100">
                            Central Records • NP
                        </span>
                        <div className="w-10 h-10 rounded-2xl bg-slate-100 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
                            <img src="https://ui-avatars.com/api/?name=Admin&background=4F46E5&color=fff&bold=true" alt="Admin" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>

                {isUsersLoading ? (
                    <div className="flex flex-col items-center justify-center py-32 space-y-4">
                        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Synchronizing Directory...</p>
                    </div>
                ) : isUsersError ? (
                    <div className="py-20">
                        <DataErrorState
                            onRetry={refetchUsers}
                            title="Directory Unreachable"
                            message="We are unable to synchronize the member directory with the authentication servers."
                        />
                    </div>
                ) : filteredMembers.length === 0 ? (
                    <div className="text-center py-32 bg-slate-50/30">
                        <div className="mx-auto w-20 h-20 bg-white shadow-inner flex items-center justify-center rounded-3xl mb-6 border border-slate-100">
                            <Search size={32} className="text-slate-200" />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 tracking-tight">Zero Matches Found</h3>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-2">Adjust your filters to locate relevant records</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        {/* Desktop View Table */}
                        <table className="w-full text-left hidden md:table">
                            <thead>
                                <tr className="bg-slate-50/30">
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">ID</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Member Info</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Plan & Shift</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Expiration</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Activity</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Status</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Quick Actions</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Details</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {filteredMembers.map((member) => (
                                    <tr
                                        key={member._id}
                                        className="hover:bg-slate-50/50 transition-all cursor-pointer group"
                                        onClick={() => setSelectedMember(member)}
                                    >
                                        <td className="px-8 py-6">
                                            <span className="text-emerald-500 text-xs font-black tracking-tighter">{member.employeeId || '#UNSET'}</span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-2xl bg-[#F8FAFC] border border-slate-100 flex items-center justify-center text-indigo-600 font-bold text-sm shadow-sm group-hover:scale-110 transition-transform">
                                                    {member.firstName.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black text-slate-900 leading-none group-hover:text-indigo-600 transition-colors">
                                                        {member.firstName} {member.lastName}
                                                    </p>
                                                    <p className="text-[10px] font-bold text-slate-400 mt-1.5 truncate max-w-[180px]">{member.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col">
                                                <span className="text-[11px] font-black text-slate-700 uppercase tracking-tight">{member.membership?.plan || 'Direct Entry'}</span>
                                                <span className="text-[9px] font-bold text-slate-400 uppercase mt-1 italic">{member.shift} Shift</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            {(() => {
                                                if (!member.membership?.expiryDate) return <span className="text-xs text-slate-400">N/A</span>;
                                                const expiryDate = new Date(member.membership.expiryDate);
                                                const now = new Date();
                                                const daysUntilExpiry = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
                                                const isExpired = member.membership.status === 'expired' || daysUntilExpiry < 0;
                                                const isExpiringSoon = daysUntilExpiry > 0 && daysUntilExpiry <= 3;

                                                return (
                                                    <div className="flex flex-col gap-1">
                                                        <span className={`text-xs font-bold tracking-tight ${isExpired ? 'text-rose-600' : isExpiringSoon ? 'text-amber-600' : 'text-slate-600'
                                                            }`}>
                                                            {formatDate(member.membership?.expiryDate)}
                                                        </span>
                                                        {isExpiringSoon && !isExpired && (
                                                            <span className="text-[9px] font-black text-amber-600 uppercase tracking-wider flex items-center gap-1">
                                                                ⚠️ {daysUntilExpiry}d left
                                                            </span>
                                                        )}
                                                        {isExpired && (
                                                            <span className="text-[9px] font-black text-rose-600 uppercase tracking-wider">
                                                                🚫 expired
                                                            </span>
                                                        )}
                                                    </div>
                                                );
                                            })()}
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-slate-700">
                                                    {formatRelativeTime(member.lastActivity)}
                                                </span>
                                                {member.lastActivity && (
                                                    <span className="text-[9px] font-bold text-slate-400 uppercase mt-0.5 whitespace-nowrap">
                                                        {new Date(member.lastActivity).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex justify-center">
                                                {(() => {
                                                    const expiryDate = member.membership?.expiryDate ? new Date(member.membership.expiryDate) : null;
                                                    const daysUntilExpiry = expiryDate ? Math.ceil((expiryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : null;
                                                    const isExpiringSoon = daysUntilExpiry !== null && daysUntilExpiry > 0 && daysUntilExpiry <= 3;
                                                    const status = member.membership?.status || 'active';

                                                    return (
                                                        <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${isExpiringSoon && status === 'active'
                                                            ? 'bg-amber-50 text-amber-600 border-amber-100 animate-pulse'
                                                            : getStatusStyles(status)
                                                            }`}>
                                                            {status}
                                                        </span>
                                                    );
                                                })()}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-center">
                                            {(() => {
                                                const att = attendanceMap[member._id];
                                                const isClockedIn = att && !att.clockOut;
                                                const isDone = att && att.clockOut;
                                                const isActionLoading = (clockInMutation.status === 'pending' || clockOutMutation.status === 'pending') && (clockInMutation.variables === member._id || clockOutMutation.variables === member._id);

                                                if (isDone) {
                                                    return (
                                                        <span className="px-3 py-1 bg-slate-100 text-slate-400 rounded-lg text-[10px] font-black uppercase tracking-widest border border-slate-200 cursor-not-allowed">
                                                            Completed
                                                        </span>
                                                    );
                                                }

                                                return (
                                                    <button
                                                        onClick={(e) => handleQuickAttendance(e, member._id)}
                                                        disabled={isActionLoading}
                                                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all flex items-center gap-2 mx-auto shadow-sm ${isClockedIn
                                                            ? 'bg-amber-50 text-amber-600 border-amber-100 hover:bg-amber-100'
                                                            : 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100'
                                                            } ${isActionLoading ? 'opacity-70 cursor-wait' : ''}`}
                                                    >
                                                        {isActionLoading ? (
                                                            <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                                        ) : isClockedIn ? (
                                                            <><LogOut size={12} /> Check Out</>
                                                        ) : (
                                                            <><LogIn size={12} /> Check In</>
                                                        )}
                                                    </button>
                                                );
                                            })()}
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <button className="p-2 text-slate-300 group-hover:text-indigo-600 transition-colors">
                                                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Mobile View Card List */}
                        <div className="md:hidden divide-y divide-slate-100">
                            {filteredMembers.map((member) => (
                                <div
                                    key={member._id}
                                    className="p-6 space-y-4 active:bg-slate-50 transition-colors"
                                    onClick={() => setSelectedMember(member)}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                                                {member.firstName.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-slate-900 leading-none">{member.firstName} {member.lastName}</p>
                                                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">{member.employeeId || '#UNSET'}</p>
                                            </div>
                                        </div>
                                        {(() => {
                                            const status = member.membership?.status || 'active';
                                            return (
                                                <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${getStatusStyles(status)}`}>
                                                    {status}
                                                </span>
                                            );
                                        })()}
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Plan & Shift</p>
                                            <p className="text-xs font-bold text-slate-700">{member.membership?.plan || 'Direct Entry'} • {member.shift}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">Expiration</p>
                                            <p className="text-xs font-bold text-slate-700 text-right">{formatDate(member.membership?.expiryDate)}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        {(() => {
                                            const att = attendanceMap[member._id];
                                            const isClockedIn = att && !att.clockOut;
                                            const isDone = att && att.clockOut;
                                            const isActionLoading = (clockInMutation.status === 'pending' || clockOutMutation.status === 'pending') && (clockInMutation.variables === member._id || clockOutMutation.variables === member._id);

                                            if (isDone) {
                                                return (
                                                    <div className="flex-1 py-2.5 bg-slate-50 text-slate-400 rounded-xl text-[10px] font-black uppercase text-center border border-slate-100">
                                                        Today's Attendance Done
                                                    </div>
                                                );
                                            }

                                            return (
                                                <button
                                                    onClick={(e) => handleQuickAttendance(e, member._id)}
                                                    className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all shadow-sm flex items-center justify-center gap-2 ${isClockedIn ? 'bg-amber-500 text-white' : 'bg-emerald-500 text-white'}`}
                                                >
                                                    {isActionLoading ? (
                                                        <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                    ) : isClockedIn ? (
                                                        <><LogOut size={12} /> Check Out</>
                                                    ) : (
                                                        <><LogIn size={12} /> Check In</>
                                                    )}
                                                </button>
                                            );
                                        })()}
                                        <button className="px-4 py-2.5 bg-slate-50 text-slate-400 rounded-xl border border-slate-100">
                                            <ChevronRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            {/* Detailed View Modal */}
            {selectedMember && (
                <MemberDetailModal
                    member={selectedMember}
                    onClose={() => setSelectedMember(null)}
                    onAction={handleAction}
                    formatDate={formatDate}
                />
            )}
        </div>
    );
};

// --- SUB-COMPONENT: MEMBER DETAIL MODAL ---
const MemberDetailModal: React.FC<{
    member: Member;
    onClose: () => void;
    onAction: (id: string, action: any) => void;
    formatDate: (d?: string) => string;
}> = ({ member, onClose, onAction, formatDate }) => {
    const queryClient = useQueryClient();
    const [activeTab, setActiveTab] = useState<'profile' | 'attendance'>('profile');

    // Dynamic Queries for History
    const { data: rawHistory = [], isLoading: loadingData } = useMemberAttendanceHistory(member._id);
    const deleteAttendanceMutation = useDeleteAttendance();

    const attendance = React.useMemo(() => {
        const completeLogs: any[] = [];
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Get member's account creation date
        const memberCreatedDate = new Date(member.createdAt);
        memberCreatedDate.setHours(0, 0, 0, 0);

        const logs = rawHistory as any[];

        for (let i = 0; i < 7; i++) {
            const d = new Date(today);
            d.setDate(d.getDate() - i);

            // Only process dates on or after the member's creation date
            if (d >= memberCreatedDate) {
                const existing = logs.find(l => new Date(l.date).toDateString() === d.toDateString());
                if (existing) {
                    completeLogs.push(existing);
                } else {
                    if (d.getDay() !== 6) { // Skip Saturday
                        completeLogs.push({
                            date: d.toISOString(),
                            status: 'absent',
                            isManual: false
                        });
                    }
                }
            }
        }
        return completeLogs;
    }, [rawHistory, member.createdAt]);

    const formatTime = (dateStr?: string) => {
        if (!dateStr) return '--:--';
        return new Date(dateStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    };

    const handleDeleteAttendance = async (id: string) => {
        if (window.confirm('Delete this attendance record?')) {
            deleteAttendanceMutation.mutate(id, {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ['attendance', 'history', member._id] });
                }
            });
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                className="bg-white w-full max-w-[850px] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-slate-100"
            >
                {/* Header */}
                <div className="relative p-10 bg-gradient-to-br from-[#7C3AED] via-[#8B5CF6] to-[#6366F1] text-white">
                    <button onClick={onClose} className="absolute top-8 right-8 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-all z-20">
                        <XCircle size={24} />
                    </button>
                    <div className="flex items-center gap-8">
                        <div className="w-28 h-28 rounded-[2rem] bg-white/20 backdrop-blur-md p-1 border border-white/30">
                            <div className="w-full h-full rounded-[1.8rem] bg-white flex items-center justify-center text-[#6366F1] text-5xl font-black">{member.firstName.charAt(0)}</div>
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-4xl font-black tracking-tight flex items-center gap-3">
                                {member.firstName} {member.lastName}
                                <span className={`w-2.5 h-2.5 rounded-full ${member.membership?.status === 'active' ? 'bg-emerald-400' : 'bg-rose-400'} animate-pulse`}></span>
                            </h2>
                            <div className="flex items-center gap-4">
                                <span className="px-3 py-1 bg-white/20 text-[10px] font-black rounded-lg uppercase tracking-widest border border-white/20">{member.employeeId || 'USR-N/A'}</span>
                                <span className="text-white/80 font-bold text-[11px] flex items-center gap-2 uppercase tracking-tight">
                                    <Clock size={16} className="text-white/60" /> {member.shift ? `${member.shift.toUpperCase()} SHIFT` : 'REGULAR'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="px-10 py-5 border-b border-slate-100 flex gap-8">
                    {['profile', 'attendance'].map(tab => (
                        <button key={tab} onClick={() => setActiveTab(tab as any)} className={`pb-2 text-[11px] font-black uppercase tracking-widest transition-all relative ${activeTab === tab ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}>
                            {tab === 'profile' ? 'IDENTITY & ACCESS' : 'ACTIVITY LOGS'}
                            {activeTab === tab && <motion.div layoutId="activeTabUnderline" className="absolute -bottom-[21px] left-0 right-0 h-[3px] bg-indigo-600 rounded-full" />}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-10 bg-slate-50/20 custom-scrollbar">
                    {loadingData ? (
                        <div className="flex flex-col items-center justify-center py-20 space-y-4">
                            <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Accessing Intelligence...</p>
                        </div>
                    ) : (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                            {activeTab === 'profile' && (
                                <div className="space-y-8">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="bg-white p-7 rounded-[1.8rem] border border-slate-100 shadow-sm space-y-5">
                                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Mail size={14} className="text-indigo-500" /> Contact Info</h4>
                                            <div className="space-y-4 font-bold text-slate-700 text-sm">
                                                <div className="flex justify-between items-center"><span className="text-slate-400 text-[11px] uppercase">Email</span><span>{member.email}</span></div>
                                                <div className="flex justify-between items-center"><span className="text-slate-400 text-[11px] uppercase">Phone</span><span>{member.phoneNumber || 'N/A'}</span></div>
                                                <div className="flex justify-between items-center"><span className="text-slate-400 text-[11px] uppercase">Department</span><span>{member.department}</span></div>
                                            </div>
                                        </div>
                                        <div className="bg-white p-7 rounded-[1.8rem] border border-slate-100 shadow-sm space-y-5">
                                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><CreditCard size={14} className="text-indigo-500" /> Membership</h4>
                                            <div className="space-y-4 font-bold text-slate-700 text-sm">
                                                <div className="flex justify-between items-center"><span className="text-slate-400 text-[11px] uppercase">Plan</span><span className="text-indigo-600">{member.membership?.plan || 'N/A'}</span></div>
                                                <div className="flex justify-between items-center"><span className="text-slate-400 text-[11px] uppercase">Start</span><span>{formatDate(member.membership?.startDate)}</span></div>
                                                <div className="flex justify-between items-center"><span className="text-slate-400 text-[11px] uppercase">Expiry</span><span className="text-rose-500">{formatDate(member.membership?.expiryDate)}</span></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-[#545BE5] p-8 rounded-[2rem] text-white shadow-xl relative overflow-hidden group">
                                        <div className="relative z-10">
                                            <p className="text-[10px] font-black text-white/60 uppercase tracking-widest">Monthly Commitment</p>
                                            <div className="flex items-baseline gap-2 mt-2"><span className="text-5xl font-black">{member.membership?.monthlyDayCount || 0}</span><span className="text-white/60 text-sm font-bold">/ 26 DAYS</span></div>
                                        </div>
                                        <div className="relative z-10 flex flex-wrap gap-3 mt-4">
                                            {member.membership?.status === 'pending' && (
                                                <button
                                                    onClick={() => onAction(member._id, 'approve')}
                                                    className="px-6 py-3 bg-emerald-500 text-white rounded-2xl font-black text-[10px] uppercase hover:bg-emerald-600 transition-all shadow-lg flex items-center gap-2"
                                                >
                                                    <CheckCircle2 size={14} />
                                                    Approve Membership
                                                </button>
                                            )}
                                            <button
                                                onClick={() => onAction(member._id, 'remind')}
                                                className="px-6 py-3 bg-white text-[#545BE5] rounded-2xl font-black text-[10px] uppercase hover:bg-slate-50 transition-all shadow-lg"
                                            >
                                                Renew Reminder
                                            </button>
                                        </div>
                                        <Activity size={160} className="absolute -right-8 -bottom-10 text-white/5 -rotate-12 translate-y-4" />
                                    </div>

                                    {/* Account Management Zone */}
                                    <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-4">
                                            <Settings size={14} className="text-slate-500" /> Account Controls
                                        </h4>
                                        <div className="flex gap-4">
                                            <button
                                                onClick={() => onAction(member._id, 'toggle-status')}
                                                className={`flex-1 py-3 rounded-xl font-bold text-xs transition-all border flex items-center justify-center gap-2 ${member.isActive ? 'border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100' : 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'}`}
                                            >
                                                {member.isActive ? <ShieldAlert size={14} /> : <CheckCircle2 size={14} />}
                                                {member.isActive ? 'Deactivate Access' : 'Activate Access'}
                                            </button>
                                            <button
                                                onClick={() => onAction(member._id, 'delete-user')}
                                                className="flex-1 py-3 rounded-xl font-bold text-xs transition-all border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 flex items-center justify-center gap-2"
                                            >
                                                <Trash2 size={14} />
                                                Delete Identity
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'attendance' && (
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Calendar size={14} className="text-indigo-500" /> Recent Activity (7 Days)</h4>
                                    </div>
                                    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                                        <table className="w-full text-left">
                                            <thead className="bg-slate-50 border-b border-slate-100">
                                                <tr>
                                                    <th className="px-8 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Service Date</th>
                                                    <th className="px-8 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Entry / Exit</th>
                                                    <th className="px-8 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Total Duration</th>
                                                    <th className="px-8 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">Activity Status</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-50">
                                                {attendance.length === 0 ? <tr><td colSpan={4} className="px-8 py-12 text-center text-slate-400 italic">No logs found.</td></tr> :
                                                    attendance.map((att, idx) => (
                                                        <tr key={idx} className={`hover:bg-slate-50/50 transition-colors ${att.status === 'absent' ? 'opacity-60 bg-slate-50/10' : ''}`}>
                                                            <td className="px-8 py-4">
                                                                <div className="flex flex-col">
                                                                    <span className="text-xs font-bold text-slate-700">{formatDate(att.date)}</span>
                                                                </div>
                                                            </td>
                                                            <td className="px-8 py-4">
                                                                {att.status === 'absent' ? (
                                                                    <span className="text-xs font-bold text-slate-300">-- : --</span>
                                                                ) : (
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="text-xs font-black text-slate-900">{formatTime(att.clockIn)}</span>
                                                                        <span className="text-slate-300">→</span>
                                                                        <span className="text-xs font-black text-slate-900">{formatTime(att.clockOut)}</span>
                                                                    </div>
                                                                )}
                                                            </td>
                                                            <td className="px-8 py-4">
                                                                <span className="text-xs font-black text-slate-500">{att.totalHours ? `${att.totalHours.toFixed(1)} hrs` : (att.status === 'absent' ? '--' : 'Live')}</span>
                                                            </td>
                                                            <td className="px-8 py-4 text-right">
                                                                <div className="flex items-center justify-end gap-2">
                                                                    <span className={`px-2 py-1 rounded text-[9px] font-black uppercase ${att.status === 'on-time' ? 'bg-emerald-50 text-emerald-600' :
                                                                        att.status === 'late' ? 'bg-amber-50 text-amber-600' :
                                                                            att.status === 'absent' ? 'bg-rose-50 text-rose-600' :
                                                                                'bg-slate-50 text-slate-600'
                                                                        }`}>
                                                                        {att.status}
                                                                    </span>
                                                                    {att.status !== 'absent' && (
                                                                        <button
                                                                            onClick={() => handleDeleteAttendance(att._id)}
                                                                            className="p-1.5 hover:bg-rose-50 text-slate-300 hover:text-rose-500 rounded-lg transition-colors"
                                                                            title="Delete Record"
                                                                        >
                                                                            <Trash2 size={12} />
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default MembersPage;
