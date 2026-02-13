/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import {
    UserPlus,
    ArrowLeft,
    ShieldCheck,
    CreditCard,
    User,
    Mail,
    Phone
} from 'lucide-react';
import { motion } from 'framer-motion';

const AddMember: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        employeeId: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: 'gym' + Math.floor(1000 + Math.random() * 9000),
        department: 'Operations',
        requestedPlan: '1-month',
        admissionFee: 0,
        monthlyFee: 0,
        paymentMethod: 'Cash',
        shift: 'both',

        gender: 'male',
        age: 20
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: ['age', 'admissionFee', 'monthlyFee'].includes(name) ? Number(value) : value
        }));
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await api.post('/auth/register', formData);
            if (response && response.success) {
                setSuccess(true);
                setTimeout(() => navigate('/admin/members'), 1500);
            } else {
                throw new Error(response.message || 'Registration failed');
            }
        } catch (error: any) {
            console.error('Registration Error:', error);
            alert(error.message || 'Error creating member. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/admin/members')}
                        className="p-3 bg-white hover:bg-slate-50 rounded-2xl border border-slate-100 shadow-sm transition-all text-slate-400 hover:text-indigo-600 group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Onboard New Member</h1>
                        <div className="flex items-center gap-2 mt-1">
                            <div className="w-2 h-2 rounded-full bg-[#EE4B6A]"></div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Growth Infrastructure • Registration Terminal</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest bg-white px-4 py-2 rounded-xl border border-slate-100 shadow-sm">
                        Global Index • EN
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-slate-100 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
                        <img src="https://ui-avatars.com/api/?name=Admin&background=4F46E5&color=fff&bold=true" alt="Admin" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>

            {success ? (
                <div className="bg-white rounded-[2rem] p-16 border border-slate-100 shadow-xl flex flex-col items-center text-center space-y-6">
                    <div className="w-24 h-24 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center animate-bounce shadow-lg shadow-emerald-100/50">
                        <ShieldCheck size={48} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Registration Synchronized!</h2>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-2 px-6">New member profile has been forged in the central database.</p>
                    </div>
                    <div className="w-12 h-1 bg-emerald-500/20 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: '100%' }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-full h-full bg-emerald-500 rounded-full"
                        />
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-[2rem] border border-slate-100 shadow-2xl shadow-slate-200/40 overflow-hidden divide-y divide-slate-50">

                    {/* section: Personal Info */}
                    <div className="p-8 md:p-12 space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                                <User size={20} />
                            </div>
                            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Personal Identity Data</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Member Reference ID</label>
                                <input
                                    type="text"
                                    name="employeeId"
                                    placeholder="e.g. GYM-102"
                                    value={formData.employeeId}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-100 transition-all font-bold text-slate-900 placeholder:text-slate-300"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Given Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="John"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-100 transition-all font-bold text-slate-900 placeholder:text-slate-300"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Surname</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="Doe"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-100 transition-all font-bold text-slate-900 placeholder:text-slate-300"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Communication Email</label>
                                <div className="relative group">
                                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={18} />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="john@protocol.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-14 pr-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-100 transition-all font-bold text-slate-900 placeholder:text-slate-300"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Direct Reach (Mobile)</label>
                                <div className="relative group">
                                    <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={18} />
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        placeholder="+977-98XXXXXXXX"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-14 pr-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-100 transition-all font-bold text-slate-900 placeholder:text-slate-300"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Age Index</label>
                                <input
                                    type="number"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    min="10"
                                    className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-100 transition-all font-bold text-slate-900"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Gender Identification</label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-100 transition-all font-bold text-slate-900 appearance-none cursor-pointer"
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Training Window (Shift)</label>
                                <select
                                    name="shift"
                                    value={formData.shift}
                                    onChange={handleChange}
                                    className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-100 transition-all font-bold text-slate-900 appearance-none cursor-pointer"
                                >
                                    <option value="morning">Morning Stream</option>
                                    <option value="evening">Evening Stream</option>
                                    <option value="both">All-Day Access</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* section: Membership Info */}
                    <div className="p-8 md:p-12 space-y-8 bg-slate-50/30">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                                <CreditCard size={20} />
                            </div>
                            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Financial & Tier Configuration</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Participation Plan</label>
                                <select
                                    name="requestedPlan"
                                    value={formData.requestedPlan}
                                    onChange={handleChange}
                                    className="w-full px-6 py-4 bg-white border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-100 transition-all font-bold text-slate-900 appearance-none cursor-pointer"
                                >
                                    <option value="admission">Admission Only</option>
                                    <option value="1-month">1-Month Membership</option>
                                    <option value="3-month">3-Month Membership</option>
                                    <option value="6-month">6-Month Membership</option>
                                    <option value="1-year">1-Year Membership</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Admission Fee (Rs.)</label>
                                <input
                                    type="number"
                                    name="admissionFee"
                                    value={formData.admissionFee}
                                    onChange={handleChange}
                                    className="w-full px-6 py-4 bg-white border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-100 transition-all font-bold text-rose-500"
                                    placeholder="e.g. 1000"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Package Fee (Rs.)</label>
                                <input
                                    type="number"
                                    name="monthlyFee"
                                    value={formData.monthlyFee}
                                    onChange={handleChange}
                                    className="w-full px-6 py-4 bg-white border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-100 transition-all font-bold text-emerald-600"
                                    placeholder="e.g. 2500"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Payment Method</label>
                                <select
                                    name="paymentMethod"
                                    value={formData.paymentMethod}
                                    onChange={handleChange}
                                    className="w-full px-6 py-4 bg-white border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-100 transition-all font-bold text-slate-900 appearance-none cursor-pointer"
                                >
                                    <option value="Cash">Cash</option>
                                    <option value="eSewa">eSewa</option>
                                    <option value="Khalti">Khalti</option>
                                    <option value="Bank">Bank Transfer</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Access Department</label>
                                <select
                                    name="department"
                                    value={formData.department}
                                    onChange={handleChange}
                                    className="w-full px-6 py-4 bg-white border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-100 transition-all font-bold text-slate-900 appearance-none cursor-pointer"
                                >
                                    <option value="Operations">Operations (General Public)</option>
                                    <option value="Management">Management</option>
                                    <option value="Engineering">Engineering</option>
                                    <option value="Sales">Sales</option>
                                    <option value="HR">HR</option>
                                    <option value="Marketing">Marketing</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">System Generated Credentials</label>
                                <input
                                    type="text"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-6 py-4 bg-slate-100 border-none rounded-2xl font-mono text-slate-400 text-sm"
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Area */}
                    <div className="p-8 md:p-12 flex flex-col md:flex-row gap-4 bg-white">
                        <button
                            type="button"
                            onClick={() => navigate('/admin/members')}
                            className="flex-1 px-8 py-4 bg-slate-50 text-slate-400 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-100 transition-all border border-slate-100"
                        >
                            Abort Process
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`flex-[2] flex items-center justify-center gap-3 px-12 py-4 bg-[#EE4B6A] text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-rose-100 hover:bg-[#D43D5B] transition-all transform active:scale-95 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <UserPlus size={20} />
                                    <span>Forge New Member Access</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default AddMember;

