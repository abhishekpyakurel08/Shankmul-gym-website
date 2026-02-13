import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Clock, Calendar, Settings, Save, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { io } from 'socket.io-client';

interface DayHours {
    isOpen: boolean;
    openTime: string;
    closeTime: string;
}

interface OperatingHours {
    monday: DayHours;
    tuesday: DayHours;
    wednesday: DayHours;
    thursday: DayHours;
    friday: DayHours;
    saturday: DayHours;
    sunday: DayHours;
}

interface GymSettings {
    _id?: string;
    operatingHours: OperatingHours;
    gymName: string;
    gymAddress?: string;
    gymPhone?: string;
    gymEmail?: string;
    timezone: string;
}

const GymHoursPage: React.FC = () => {
    const [settings, setSettings] = useState<GymSettings | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [currentStatus, setCurrentStatus] = useState<{ isOpen: boolean; message: string } | null>(null);

    const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const dayLabels: Record<string, string> = {
        monday: 'Monday',
        tuesday: 'Tuesday',
        wednesday: 'Wednesday',
        thursday: 'Thursday',
        friday: 'Friday',
        saturday: 'Saturday',
        sunday: 'Sunday'
    };

    useEffect(() => {
        fetchSettings();
        fetchStatus();

        const token = localStorage.getItem('adminToken');
        const BACKEND_URL = 'https://shankmul-gym-backend.tecobit.cloud';

        const socket = io(BACKEND_URL, {
            query: { role: 'admin', token }
        });

        socket.on('gym_settings_updated', () => {
            fetchSettings();
            fetchStatus();
        });

        // Refresh status every minute
        const interval = setInterval(fetchStatus, 60000);
        return () => {
            clearInterval(interval);
            socket.disconnect();
        };
    }, []);

    const fetchSettings = async () => {
        try {
            const response = await api.get('/gym-settings');
            if (response.success) {
                setSettings(response.data);
            }
        } catch (error) {
            console.error('Error fetching gym settings:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchStatus = async () => {
        try {
            const response = await api.get('/gym-settings/status');
            if (response.success) {
                setCurrentStatus(response.data);
            }
        } catch (error) {
            console.error('Error fetching gym status:', error);
        }
    };

    const handleDayToggle = (day: string) => {
        if (!settings) return;
        setSettings({
            ...settings,
            operatingHours: {
                ...settings.operatingHours,
                [day]: {
                    ...settings.operatingHours[day as keyof OperatingHours],
                    isOpen: !settings.operatingHours[day as keyof OperatingHours].isOpen
                }
            }
        });
    };

    const handleTimeChange = (day: string, field: 'openTime' | 'closeTime', value: string) => {
        if (!settings) return;
        setSettings({
            ...settings,
            operatingHours: {
                ...settings.operatingHours,
                [day]: {
                    ...settings.operatingHours[day as keyof OperatingHours],
                    [field]: value
                }
            }
        });
    };

    const handleSave = async () => {
        if (!settings) return;
        setSaving(true);
        setMessage(null);

        try {
            const response = await api.put('/gym-settings', settings);
            if (response.success) {
                setMessage({ type: 'success', text: 'Gym hours updated successfully!' });
                fetchStatus(); // Refresh current status
                setTimeout(() => setMessage(null), 3000);
            }
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message || 'Failed to update gym hours' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-32 space-y-4">
                <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Loading Settings...</p>
            </div>
        );
    }

    if (!settings) {
        return (
            <div className="flex flex-col items-center justify-center py-32">
                <AlertCircle size={48} className="text-rose-500 mb-4" />
                <p className="text-slate-600 font-bold">Failed to load gym settings</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-600 rounded-lg text-white shadow-lg shadow-indigo-200">
                        <Clock size={20} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Gym Operating Hours</h1>
                        <div className="flex items-center gap-2 mt-1">
                            <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                Schedule Management System
                            </p>
                        </div>
                    </div>
                </div>

                {/* Current Status Badge */}
                {currentStatus && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm ${currentStatus.isOpen
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                            : 'bg-rose-50 text-rose-600 border border-rose-200'
                            }`}
                    >
                        <div className={`w-2 h-2 rounded-full ${currentStatus.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></div>
                        <span className="uppercase tracking-widest text-[10px]">
                            {currentStatus.isOpen ? 'OPEN NOW' : 'CLOSED'}
                        </span>
                    </motion.div>
                )}
            </div>

            {/* Success/Error Message */}
            {message && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-center gap-3 p-4 rounded-2xl border ${message.type === 'success'
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                        : 'bg-rose-50 border-rose-200 text-rose-700'
                        }`}
                >
                    {message.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                    <p className="font-bold text-sm">{message.text}</p>
                </motion.div>
            )}

            {/* Main Card */}
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
                {/* Card Header */}
                <div className="px-8 py-6 border-b border-slate-50 bg-gradient-to-r from-slate-50 to-white">
                    <div className="flex items-center gap-3">
                        <Calendar size={20} className="text-indigo-600" />
                        <h2 className="text-lg font-black text-slate-900 tracking-tight">Weekly Schedule</h2>
                    </div>
                    <p className="text-xs text-slate-500 font-medium mt-1">Configure your gym's operating hours for each day of the week</p>
                </div>

                {/* Days Grid */}
                <div className="p-8 space-y-4">
                    {daysOfWeek.map((day, index) => {
                        const dayData = settings.operatingHours[day as keyof OperatingHours];
                        return (
                            <motion.div
                                key={day}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className={`flex flex-col md:flex-row md:items-center gap-4 p-6 rounded-2xl border transition-all ${dayData.isOpen
                                    ? 'bg-white border-slate-200 hover:border-indigo-200'
                                    : 'bg-slate-50 border-slate-200'
                                    }`}
                            >
                                {/* Day Name & Toggle */}
                                <div className="flex items-center gap-4 md:w-48">
                                    <button
                                        onClick={() => handleDayToggle(day)}
                                        className={`relative w-14 h-7 rounded-full transition-colors ${dayData.isOpen ? 'bg-emerald-500' : 'bg-slate-300'
                                            }`}
                                    >
                                        <div
                                            className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${dayData.isOpen ? 'translate-x-8' : 'translate-x-1'
                                                }`}
                                        ></div>
                                    </button>
                                    <div>
                                        <h3 className="text-sm font-black text-slate-900 tracking-tight">{dayLabels[day]}</h3>
                                        <p className={`text-[9px] font-bold uppercase tracking-widest ${dayData.isOpen ? 'text-emerald-600' : 'text-slate-400'
                                            }`}>
                                            {dayData.isOpen ? 'Operating' : 'Closed'}
                                        </p>
                                    </div>
                                </div>

                                {/* Time Inputs */}
                                {dayData.isOpen && (
                                    <div className="flex-1 flex items-center gap-4">
                                        <div className="flex-1">
                                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">
                                                Opening Time
                                            </label>
                                            <input
                                                type="time"
                                                value={dayData.openTime}
                                                onChange={(e) => handleTimeChange(day, 'openTime', e.target.value)}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 outline-none transition-all"
                                            />
                                        </div>
                                        <div className="text-slate-300 font-black text-2xl pt-6">→</div>
                                        <div className="flex-1">
                                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">
                                                Closing Time
                                            </label>
                                            <input
                                                type="time"
                                                value={dayData.closeTime}
                                                onChange={(e) => handleTimeChange(day, 'closeTime', e.target.value)}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 outline-none transition-all"
                                            />
                                        </div>
                                    </div>
                                )}

                                {!dayData.isOpen && (
                                    <div className="flex-1 flex items-center justify-center py-3">
                                        <span className="text-slate-400 font-bold text-sm italic">No operating hours</span>
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>

                {/* Card Footer */}
                <div className="px-8 py-6 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-400">
                        <Settings size={16} />
                        <span className="text-[10px] font-black uppercase tracking-widest">
                            Last updated: {settings._id ? 'Just now' : 'Never'}
                        </span>
                    </div>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 px-8 py-3.5 bg-indigo-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Save size={16} />
                        <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                    </button>
                </div>
            </div>

            {/* Info Card */}
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
                <div className="flex items-start gap-3">
                    <AlertCircle size={20} className="text-blue-600 mt-0.5" />
                    <div>
                        <h3 className="text-sm font-black text-blue-900 mb-1">Important Information</h3>
                        <p className="text-xs text-blue-700 leading-relaxed">
                            Changes to gym hours will affect member check-in availability. Members attempting to check in outside operating hours will receive a notification that the gym is closed.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GymHoursPage;
