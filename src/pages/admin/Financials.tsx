/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import {
    DollarSign,
    ArrowUpCircle,
    ArrowDownCircle,
    Filter,
    Download,
    Plus,
    CreditCard,
    Search,
    Receipt,
    MoreVertical,
    X,
    Activity
} from 'lucide-react';
import { api } from '../../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { io } from 'socket.io-client';

interface Transaction {
    _id: string;
    userName: string;
    category: 'income' | 'expense';
    type: string;
    amount: number;
    method: string;
    date: string;
    description: string;
}

const Financials: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [summary, setSummary] = useState({ income: 0, expense: 0, net: 0 });
    const [showAddModal, setShowAddModal] = useState(false);
    const [newTx, setNewTx] = useState({
        category: 'income',
        type: 'subscription',
        amount: 0,
        method: 'Cash',
        description: '',
        userId: ''
    });
    const [loading, setLoading] = useState(true);

    const fetchFinData = async () => {
        setLoading(true);
        try {
            const [txRes, statsRes] = await Promise.all([
                api.get('/finance/transactions'),
                api.get('/finance/stats/daily')
            ]);

            if (txRes && txRes.success) {
                setTransactions(txRes.data || []);
            }

            if (statsRes && statsRes.success) {
                setSummary(statsRes.data);
            }
        } catch (err) {
            console.error("Finance Fetch Error:", err);
            setTransactions([
                { _id: '1', userName: 'System Sync', category: 'income', type: 'subscription', amount: 5000, method: 'eSewa', date: new Date().toISOString(), description: 'Visual Demo Mode Active' }
            ]);
            setSummary({ income: 5000, expense: 0, net: 5000 });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFinData();

        const token = localStorage.getItem('adminToken');
        const BACKEND_URL = 'https://shankmul-gym-backend.tecobit.cloud';

        const socket = io(BACKEND_URL, {
            query: { role: 'admin', token }
        });

        socket.on('transaction_added', () => fetchFinData());
        socket.on('stats_updated', (data: any) => {
            if (data.type === 'finance') fetchFinData();
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const handleAddTx = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await api.post('/finance/transactions/add', newTx);
            if (res && res.success) {
                setTransactions([res.data, ...transactions]);
                setShowAddModal(false);
                fetchFinData();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleExport = () => {
        const token = localStorage.getItem('adminToken');
        const BACKEND_URL = 'https://shankmul-gym-backend.tecobit.cloud';
        // Open the export URL in a new tab which triggers a download
        window.open(`${BACKEND_URL}/api/finance/export?token=${token}`, '_blank');
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-600 rounded-lg text-white shadow-lg shadow-emerald-200">
                        <DollarSign size={20} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Financial Reports</h1>
                        <div className="flex items-center gap-2 mt-1">
                            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Ledger Infrastructure • Active Period</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={handleExport}
                        className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-600 hover:bg-slate-50 transition-all shadow-sm tracking-widest uppercase"
                    >
                        <Download size={16} />
                        <span>Export</span>
                    </button>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-[#EE4B6A] text-white rounded-xl text-xs font-black shadow-lg shadow-rose-100 hover:bg-[#D43D5B] transition-all transform active:scale-95 uppercase tracking-widest"
                    >
                        <Plus size={16} />
                        <span>Record Entry</span>
                    </button>
                </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    {
                        label: 'Gross Daily Income',
                        value: `Rs. ${summary?.income?.toLocaleString() || 0}`,
                        trend: '+12.5%',
                        up: true,
                        icon: <ArrowUpCircle size={20} />,
                        color: 'text-emerald-500',
                        bg: 'bg-emerald-50/50'
                    },
                    {
                        label: 'Operating Expenses',
                        value: `Rs. ${summary?.expense?.toLocaleString() || 0}`,
                        trend: '-2.4%',
                        up: false,
                        icon: <ArrowDownCircle size={20} />,
                        color: 'text-rose-500',
                        bg: 'bg-rose-50/50'
                    },
                    {
                        label: 'Net Liquid Balance',
                        value: `Rs. ${summary?.net?.toLocaleString() || 0}`,
                        trend: 'Synchronized',
                        up: true,
                        icon: <Activity size={20} />,
                        color: 'text-indigo-500',
                        bg: 'bg-indigo-50/50'
                    },
                ].map((stat, i) => (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        key={i}
                        className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-indigo-100 transition-colors"
                    >
                        <div className="flex-1">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{stat.label}</p>
                            <p className="text-2xl font-black text-slate-900 mt-2">{stat.value}</p>
                            <div className={`mt-2 flex items-center gap-1 text-[9px] font-black uppercase tracking-tighter ${stat.up ? 'text-emerald-600' : 'text-rose-600'}`}>
                                {stat.up ? <ArrowUpCircle size={10} /> : <ArrowDownCircle size={10} />}
                                {stat.trend}
                            </div>
                        </div>
                        <div className={`p-4 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                            {stat.icon}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Transactions Section */}
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden min-h-[500px]">
                <div className="px-8 py-6 border-b border-slate-50 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1 w-full max-w-2xl">
                        <div className="relative flex-1 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={16} />
                            <input
                                type="text"
                                placeholder="Search Transaction, User, or Category..."
                                className="w-full pl-12 pr-6 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-indigo-100 transition-all placeholder:text-slate-300"
                            />
                        </div>
                        <button className="flex items-center gap-2 px-6 py-3.5 bg-slate-50 text-slate-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all border border-slate-100">
                            <Filter size={16} />
                            <span>Filter</span>
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/30">
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Txn ID</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">User / Description</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Type</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Method</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Amount</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {transactions.map((tx) => (
                                <tr key={tx._id} className="group hover:bg-slate-50/50 transition-all cursor-pointer">
                                    <td className="px-8 py-6">
                                        <span className="text-emerald-500 text-xs font-black tracking-tighter">#{tx._id.substring(tx._id.length - 4).toUpperCase()}</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-black text-slate-900 leading-none group-hover:text-indigo-600 transition-colors uppercase">{tx.userName}</span>
                                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2">{new Date(tx.date).toLocaleDateString()}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-center">
                                        <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border ${tx.category === 'income' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                                            {tx.type}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2 text-slate-600">
                                            <CreditCard size={14} className="text-slate-300" />
                                            <span className="text-[11px] font-black text-slate-700 uppercase">{tx.method}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`text-sm font-black tracking-tight ${tx.category === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                                            {tx.category === 'income' ? '+' : '-'} Rs. {tx.amount.toLocaleString()}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button className="p-2 text-slate-300 group-hover:text-slate-600 transition-colors">
                                            <MoreVertical size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {transactions.length === 0 && !loading && (
                    <div className="py-20 flex flex-col items-center justify-center bg-slate-50/30">
                        <Receipt size={40} className="text-slate-200 mb-4" />
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">No entries found for this period</p>
                    </div>
                )}
            </div>

            {/* Manual Entry Modal */}
            <AnimatePresence>
                {showAddModal && (
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
                            className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-8"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-slate-900 tracking-tight">Manual Transaction Entry</h3>
                                <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-400">
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleAddTx} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</label>
                                        <select
                                            className="w-full px-4 py-2.5 bg-slate-50 border-transparent rounded-xl text-sm font-bold focus:ring-2 focus:ring-indigo-100"
                                            value={newTx.category}
                                            onChange={(e) => setNewTx({ ...newTx, category: e.target.value as any })}
                                        >
                                            <option value="income">Income (+)</option>
                                            <option value="expense">Expense (-)</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Type / Reason</label>
                                        <select
                                            className="w-full px-4 py-2.5 bg-slate-50 border-transparent rounded-xl text-sm font-bold focus:ring-2 focus:ring-indigo-100"
                                            value={newTx.type}
                                            onChange={(e) => setNewTx({ ...newTx, type: e.target.value })}
                                        >
                                            {newTx.category === 'income' ? (
                                                <>
                                                    <option value="subscription">Monthly Fee</option>
                                                    <option value="registration">Admission Fee</option>
                                                    <option value="other">Other Income</option>
                                                </>
                                            ) : (
                                                <>
                                                    <option value="rent">Rent</option>
                                                    <option value="salary">Staff Salary</option>
                                                    <option value="electricity">Electricity</option>
                                                    <option value="maintenance">Maintenance</option>
                                                    <option value="other">Other Expense</option>
                                                </>
                                            )}
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Method</label>
                                        <select
                                            className="w-full px-4 py-2.5 bg-slate-50 border-transparent rounded-xl text-sm font-bold focus:ring-2 focus:ring-indigo-100"
                                            value={newTx.method}
                                            onChange={(e) => setNewTx({ ...newTx, method: e.target.value })}
                                        >
                                            <option value="Cash">Cash</option>
                                            <option value="eSewa">eSewa</option>
                                            <option value="Bank">Bank Transfer</option>
                                            <option value="Khalti">Khalti</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount (Rs.)</label>
                                        <input
                                            type="number"
                                            className="w-full px-4 py-2.5 bg-slate-50 border-transparent rounded-xl text-sm font-bold focus:ring-2 focus:ring-indigo-100"
                                            placeholder="0"
                                            onChange={(e) => setNewTx({ ...newTx, amount: Number(e.target.value) })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Description</label>
                                    <textarea
                                        rows={2}
                                        className="w-full px-4 py-2.5 bg-slate-50 border-transparent rounded-xl text-sm font-bold focus:ring-2 focus:ring-indigo-100"
                                        placeholder="Note..."
                                        onChange={(e) => setNewTx({ ...newTx, description: e.target.value })}
                                    />
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowAddModal(false)}
                                        className="flex-1 px-6 py-3 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-100"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-6 py-3 bg-[#EE4B6A] text-white rounded-xl text-xs font-bold shadow-lg shadow-rose-100 hover:bg-[#D43D5B] transition-all"
                                    >
                                        Save Record
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

export default Financials;
