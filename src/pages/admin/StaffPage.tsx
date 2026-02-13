/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import {
    Search,
    Plus,
    DollarSign,
    ShieldCheck,
    CreditCard,
    CheckCircle2,
    Zap,
    Briefcase,
    X,
    ChevronRight,
    ArrowUpRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { io } from 'socket.io-client';
import DataErrorState from '../../components/admin/DataErrorState';

interface Staff {
    _id: string;
    employeeId: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    role: string;
    department: string;
    shift: string;
    salary: number;
    paymentFrequency: string;
    profileImage?: string;
    isActive: boolean;
}

const StaffPage: React.FC = () => {
    const [staff, setStaff] = useState<Staff[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [deptFilter, setDeptFilter] = useState('all');
    const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
    const [paymentModal, setPaymentModal] = useState(false);
    const [payAmount, setPayAmount] = useState('');
    const [paySuccess, setPaySuccess] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetchStaff();

        const token = localStorage.getItem('adminToken');
        const BACKEND_URL = 'https://shankmul-gym-backend.tecobit.cloud';

        const socket = io(BACKEND_URL, {
            query: { role: 'admin', token }
        });

        socket.on('stats_updated', (data: any) => {
            if (data.type === 'staff' || data.type === 'finance') fetchStaff();
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const fetchStaff = async () => {
        setLoading(true);
        setError(false);
        try {
            const response = await api.get('/staff');
            if (response && response.success) {
                setStaff(response.data);
            }
        } catch (error) {
            console.error('Failed to fetch staff:', error);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const handlePaySalary = async () => {
        if (!selectedStaff) return;
        try {
            const response = await api.post(`/staff/${selectedStaff._id}/pay`, {
                amount: Number(payAmount) || selectedStaff.salary,
                method: 'cash',
                description: `Salary payment for ${selectedStaff.firstName} ${selectedStaff.lastName}`
            });

            if (response && response.success) {
                setPaySuccess(true);
                setTimeout(() => {
                    setPaySuccess(false);
                    setPaymentModal(false);
                    setPayAmount('');
                }, 2000);
            }
        } catch (error: any) {
            alert(error.message || 'Payment failed');
        }
    };
    const handleExportStaff = () => {
        const token = localStorage.getItem('adminToken');
        const BACKEND_URL = 'https://shankmul-gym-backend.tecobit.cloud';
        window.open(`${BACKEND_URL}/api/staff/export?token=${token}`, '_blank');
    };

    const filteredStaff = staff.filter(s => {
        const matchesSearch = `${s.firstName} ${s.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDept = deptFilter === 'all' || s.department === deptFilter;
        return matchesSearch && matchesDept;
    });

    const departments = Array.from(new Set(staff.map(s => s.department)));

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-600 rounded-lg text-white shadow-lg shadow-indigo-200">
                        <Briefcase size={20} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Staff Management</h1>
                        <div className="flex items-center gap-2 mt-1">
                            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Personnel Records • {staff.length} Active Employees</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={handleExportStaff}
                        className="flex items-center gap-2 px-6 py-3 border border-slate-200 rounded-xl text-xs font-black text-slate-600 hover:bg-slate-50 transition-all uppercase tracking-widest"
                    >
                        <ArrowUpRight size={16} className="text-indigo-500" />
                        <span>Export</span>
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 bg-[#EE4B6A] text-white rounded-xl text-xs font-black shadow-lg shadow-rose-100 hover:bg-[#D43D5B] transition-all transform active:scale-95 uppercase tracking-widest">
                        <Plus size={16} />
                        <span>Add Personnel</span>
                    </button>
                </div>
            </div>

            {/* Premium Stats Mini */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    { label: 'Active Personnel', value: staff.filter(s => s.isActive).length, icon: <ShieldCheck size={18} />, color: 'text-emerald-500', bg: 'bg-emerald-50/50' },
                    { label: 'Monthly Payroll', value: `Rs. ${staff.reduce((acc, curr) => acc + (curr.salary || 0), 0).toLocaleString()}`, icon: <DollarSign size={18} />, color: 'text-indigo-500', bg: 'bg-indigo-50/50' },
                    { label: 'Payout Efficiency', value: '100%', icon: <Zap size={18} />, color: 'text-rose-500', bg: 'bg-rose-50/50' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-indigo-100 transition-colors">
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{stat.label}</p>
                            <p className="text-2xl font-black text-slate-900 mt-2">{stat.value}</p>
                        </div>
                        <div className={`p-3 rounded-xl ${stat.color} ${stat.bg} group-hover:scale-110 transition-transform`}>
                            {stat.icon}
                        </div>
                    </div>
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
                                placeholder="Search Name, Role, or ID..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-6 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-indigo-100 transition-all placeholder:text-slate-300"
                            />
                        </div>
                        <select
                            value={deptFilter}
                            onChange={(e) => setDeptFilter(e.target.value)}
                            className="px-6 py-3.5 bg-slate-50 border-none rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 focus:ring-2 focus:ring-indigo-100 transition-all cursor-pointer"
                        >
                            <option value="all">Every Department</option>
                            {departments.map(d => (
                                <option key={d} value={d}>{d}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-2 rounded-xl border border-slate-100">
                            Central Payroll • EN
                        </span>
                        <div className="w-10 h-10 rounded-2xl bg-slate-100 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
                            <img src="https://ui-avatars.com/api/?name=Admin&background=4F46E5&color=fff&bold=true" alt="Admin" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 space-y-4">
                        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Loading Personnel Metadata...</p>
                    </div>
                ) : error ? (
                    <div className="py-20">
                        <DataErrorState
                            onRetry={fetchStaff}
                            message="The personnel database is currently unreachable. Financial records and profiles are protected but inaccessible."
                        />
                    </div>
                ) : filteredStaff.length === 0 ? (
                    <div className="text-center py-32 bg-slate-50/30">
                        <div className="mx-auto w-20 h-20 bg-white shadow-inner flex items-center justify-center rounded-3xl mb-6 border border-slate-100">
                            <Search size={32} className="text-slate-200" />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 tracking-tight">No Personnel Found</h3>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-2">Adjust search parameters to find staff records</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50/30">
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">ID</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Personnel</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Role & Dept</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Base Salary</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Status</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {filteredStaff.map((member) => (
                                    <tr
                                        key={member._id}
                                        className="hover:bg-slate-50/50 transition-all cursor-pointer group"
                                        onClick={() => setSelectedStaff(member)}
                                    >
                                        <td className="px-8 py-6">
                                            <span className="text-emerald-500 text-xs font-black tracking-tighter">{member.employeeId || '#UNSET'}</span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform overflow-hidden">
                                                    <img
                                                        src={member.profileImage || `https://ui-avatars.com/api/?name=${member.firstName}+${member.lastName}&background=random&bold=true`}
                                                        alt={member.firstName}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black text-slate-900 leading-none group-hover:text-indigo-600 transition-colors">
                                                        {member.firstName} {member.lastName}
                                                    </p>
                                                    <p className="text-[10px] font-bold text-slate-400 mt-1.5">{member.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col">
                                                <span className="text-[11px] font-black text-indigo-600 uppercase tracking-tight">{member.role}</span>
                                                <span className="text-[9px] font-bold text-slate-400 uppercase mt-1 italic">{member.department}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="text-xs font-black text-slate-700 tracking-tight">
                                                Rs. {member.salary?.toLocaleString()}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex justify-center">
                                                <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${member.isActive ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                                                    {member.isActive ? 'Active' : 'Inactive'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); setSelectedStaff(member); setPaymentModal(true); setPayAmount(member.salary.toString()); }}
                                                    className="p-2.5 text-emerald-500 hover:bg-emerald-50 rounded-xl transition-all"
                                                    title="Disburse Salary"
                                                >
                                                    <DollarSign size={18} />
                                                </button>
                                                <button className="p-2.5 text-slate-300 group-hover:text-indigo-600 transition-colors">
                                                    <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Payment Modal */}
            <AnimatePresence>
                {paymentModal && selectedStaff && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
                        >
                            <div className="p-8 bg-indigo-600 text-white relative">
                                <button onClick={() => setPaymentModal(false)} className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-lg transition-colors">
                                    <X size={20} />
                                </button>
                                <h3 className="text-2xl font-black tracking-tight">Record Payout</h3>
                                <p className="text-indigo-100 text-sm font-medium mt-1">Disburse salary to {selectedStaff.firstName}.</p>
                                <CreditCard size={80} className="absolute -right-4 -bottom-4 text-white/5 rotate-12" />
                            </div>
                            <div className="p-8 space-y-6">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Payout Amount (Rs.)</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                        <input
                                            type="number"
                                            value={payAmount}
                                            onChange={(e) => setPayAmount(e.target.value)}
                                            className="w-full pl-12 pr-6 py-3.5 bg-slate-50 border-none rounded-xl font-black text-slate-900 focus:ring-2 focus:ring-indigo-100 transition-all placeholder:text-slate-300"
                                            placeholder={selectedStaff.salary.toString()}
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        onClick={() => setPaymentModal(false)}
                                        className="flex-1 py-3.5 bg-slate-50 text-slate-600 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-slate-100 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handlePaySalary}
                                        disabled={paySuccess}
                                        className={`flex-1 py-3.5 ${paySuccess ? 'bg-emerald-500' : 'bg-[#EE4B6A] hover:bg-[#D43D5B]'} text-white rounded-xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-rose-100 transition-all flex items-center justify-center gap-2`}
                                    >
                                        {paySuccess ? <CheckCircle2 size={16} /> : <Zap size={16} />}
                                        {paySuccess ? 'Success!' : 'Confirm Pay'}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default StaffPage;
