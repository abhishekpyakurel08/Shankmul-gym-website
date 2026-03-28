import { useState } from 'react';
import { Clock, User, Flame, Dumbbell, Activity, Zap, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import scheduleDataRaw from '@/data/scheduleData.json';

interface ClassSession {
    id: string;
    time: string;
    title: string;
    trainer: string;
    type: 'Strength' | 'Cardio' | 'Yoga' | 'HIIT';
    intensity: 'Low' | 'Medium' | 'High';
    spotsLeft: number;
}

const ScheduleSection = () => {
    const scheduleData = scheduleDataRaw as Record<string, ClassSession[]>;
    const [activeDay, setActiveDay] = useState('Monday');
    const [selectedClass, setSelectedClass] = useState<ClassSession | null>(null);

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const getIntensityColor = (level: string) => {
        switch (level) {
            case 'High': return 'text-red-600 bg-red-50';
            case 'Medium': return 'text-orange-600 bg-orange-50';
            case 'Low': return 'text-green-600 bg-green-50';
            default: return 'text-slate-500 bg-slate-50';
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'Strength': return <Dumbbell className="w-4 h-4" />;
            case 'Cardio': return <Activity className="w-4 h-4" />;
            case 'Yoga': return <User className="w-4 h-4" />;
            case 'HIIT': return <Flame className="w-4 h-4" />;
            default: return <Activity className="w-4 h-4" />;
        }
    };

    return (
        <section id="schedule" className="py-16 md:py-32 px-4 sm:px-6 bg-slate-100 overflow-hidden">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    <span className="text-brand-orange font-bold tracking-wider uppercase text-sm mb-2 block">Class Timetable</span>
                    <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 text-slate-900">
                        Weekly Schedule
                    </h2>
                    <p className="text-slate-600 text-base sm:text-lg">
                        Find your perfect class. From high-intensity interval training to restorative yoga sequences.
                    </p>
                </motion.div>

                {/* Day Selector */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex overflow-x-auto gap-2 mb-10 pb-3 hide-scrollbar -mx-4 sm:mx-0 px-4 sm:px-0 sm:flex-wrap sm:justify-center"
                >
                    {days.map((day) => (
                        <button
                            key={day}
                            onClick={() => setActiveDay(day)}
                            className={cn(
                                "px-6 py-3 rounded-full text-sm font-medium transition-all duration-300",
                                activeDay === day
                                    ? "bg-brand-orange text-white shadow-lg shadow-orange-900/20 scale-105"
                                    : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
                            )}
                        >
                            {day}
                        </button>
                    ))}
                </motion.div>

                {/* Schedule Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {scheduleData[activeDay]?.map((session, index) => (
                        <motion.div
                            key={session.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative rounded-3xl p-6 transition-all duration-300 border border-slate-200 bg-white hover:border-brand-blue/30 shadow-lg shadow-slate-200/50"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className={cn("px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1", getIntensityColor(session.intensity))}>
                                    <Zap size={12} fill="currentColor" />
                                    {session.intensity} Intensity
                                </div>
                                <div className="text-slate-400 text-sm font-display flex items-center gap-1">
                                    <Clock size={14} />
                                    {session.time}
                                </div>
                            </div>

                            <h3 className="text-xl font-bold font-display mb-2 text-slate-900">{session.title}</h3>
                            <p className="text-slate-500 text-sm mb-6 flex items-center gap-2">
                                <User size={14} />
                                {session.trainer}
                            </p>

                            <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                                <div className="flex items-center gap-2 text-sm">
                                    <div className="p-2 rounded-full bg-slate-900 text-white">
                                        {getTypeIcon(session.type)}
                                    </div>
                                    <span className="text-slate-600 font-medium">{session.type}</span>
                                </div>

                                <Button
                                    onClick={() => setSelectedClass(session)}
                                    disabled={session.spotsLeft === 0}
                                    className={cn(
                                        "rounded-full px-6",
                                        session.spotsLeft === 0 ? "bg-slate-100 text-slate-400" : "bg-slate-900 text-white hover:bg-brand-blue transition-colors"
                                    )}
                                >
                                    {session.spotsLeft === 0 ? 'Full' : 'Book'}
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Booking Modal */}
            {selectedClass && (
                <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-md w-full relative animate-in zoom-in-50 duration-300 shadow-2xl">
                        <button
                            onClick={() => setSelectedClass(null)}
                            className="absolute top-6 right-6 text-slate-400 hover:text-slate-900"
                        >
                            <X size={24} />
                        </button>

                        <h3 className="font-display text-2xl font-bold mb-1 text-slate-900">Confirm Booking</h3>
                        <p className="text-slate-500 text-sm mb-6">You are about to book a spot in this class.</p>

                        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 mb-6 space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-slate-500 text-sm">Class</span>
                                <span className="font-bold text-slate-900">{selectedClass.title}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-500 text-sm">Time</span>
                                <span className="font-bold text-slate-900">{selectedClass.time}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-500 text-sm">Trainer</span>
                                <span className="font-bold text-slate-900">{selectedClass.trainer}</span>
                            </div>
                        </div>

                        <Button className="w-full h-12 bg-brand-orange hover:bg-orange-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-orange-200">
                            Confirm & Pay
                        </Button>
                        <p className="text-center text-xs text-slate-400 mt-4">
                            {selectedClass.spotsLeft} spots remaining for this session
                        </p>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ScheduleSection;
