import { useState } from 'react';
import { Clock, User, Flame, Dumbbell, Activity, Zap, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ClassSession {
    id: string;
    time: string;
    title: string;
    trainer: string;
    type: 'Strength' | 'Cardio' | 'Yoga' | 'HIIT';
    intensity: 'Low' | 'Medium' | 'High';
    spotsLeft: number;
}

const Schedule = () => {
    const [activeDay, setActiveDay] = useState('Monday');
    const [selectedClass, setSelectedClass] = useState<ClassSession | null>(null);

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const scheduleData: Record<string, ClassSession[]> = {
        'Monday': [
            { id: 'm1', time: '06:00 AM', title: 'Power Lifting', trainer: 'Alex Roy', type: 'Strength', intensity: 'High', spotsLeft: 4 },
            { id: 'm2', time: '08:00 AM', title: 'Morning Flow', trainer: 'Sarah Lee', type: 'Yoga', intensity: 'Low', spotsLeft: 8 },
            { id: 'm3', time: '05:30 PM', title: 'HIIT Blast', trainer: 'Mike Chen', type: 'HIIT', intensity: 'High', spotsLeft: 2 },
        ],
        'Tuesday': [
            { id: 't1', time: '07:00 AM', title: 'Cardio Kick', trainer: 'Jenny Wi', type: 'Cardio', intensity: 'Medium', spotsLeft: 5 },
            { id: 't2', time: '06:00 PM', title: 'Core Strength', trainer: 'Alex Roy', type: 'Strength', intensity: 'Medium', spotsLeft: 6 },
        ],
        'Wednesday': [
            { id: 'w1', time: '06:00 AM', title: 'CrossFit', trainer: 'Mike Chen', type: 'HIIT', intensity: 'High', spotsLeft: 3 },
            { id: 'w2', time: '07:30 PM', title: 'Zumba Dance', trainer: 'Lisa Ray', type: 'Cardio', intensity: 'Medium', spotsLeft: 10 },
        ],
        'Thursday': [
            { id: 'th1', time: '06:00 AM', title: 'Power Yoga', trainer: 'Sarah Lee', type: 'Yoga', intensity: 'Medium', spotsLeft: 5 },
            { id: 'th2', time: '05:00 PM', title: 'Muscle Building', trainer: 'Alex Roy', type: 'Strength', intensity: 'High', spotsLeft: 4 },
        ],
        'Friday': [
            { id: 'f1', time: '07:00 AM', title: 'Endurance Run', trainer: 'Mike Chen', type: 'Cardio', intensity: 'High', spotsLeft: 6 },
            { id: 'f2', time: '06:00 PM', title: 'Full Body HIIT', trainer: 'Jenny Wi', type: 'HIIT', intensity: 'High', spotsLeft: 2 },
        ],
        'Saturday': [
            { id: 's1', time: '08:00 AM', title: 'Weekend War', trainer: 'All Trainers', type: 'Strength', intensity: 'High', spotsLeft: 0 },
            { id: 's2', time: '10:00 AM', title: 'Recovery Stretch', trainer: 'Sarah Lee', type: 'Yoga', intensity: 'Low', spotsLeft: 12 },
        ],
        'Sunday': [
            { id: 'su1', time: '09:00 AM', title: 'Open Gym', trainer: 'Staff', type: 'Strength', intensity: 'Low', spotsLeft: 20 },
        ]
    };

    const getIntensityColor = (level: string) => {
        switch (level) {
            case 'High': return 'text-red-500 bg-red-500/10';
            case 'Medium': return 'text-yellow-500 bg-yellow-500/10';
            case 'Low': return 'text-green-500 bg-green-500/10';
            default: return 'text-slate-500 bg-slate-500/10';
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
        <div className="pt-24 pb-20">
            <section className="container mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-in-up">
                    <span className="text-brand-orange font-bold tracking-wider uppercase text-sm mb-2 block">Class Timetable</span>
                    <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 dark:text-white">
                        Weekly Schedule
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">
                        Find your perfect class. From high-intensity interval training to restorative yoga sequences.
                    </p>
                </div>

                {/* Day Selector */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {days.map((day) => (
                        <button
                            key={day}
                            onClick={() => setActiveDay(day)}
                            className={cn(
                                "px-6 py-3 rounded-full text-sm font-medium transition-all duration-300",
                                activeDay === day
                                    ? "bg-brand-orange text-white shadow-lg shadow-orange-900/20 scale-105"
                                    : "glass-adaptive hover:bg-slate-200 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400"
                            )}
                        >
                            {day}
                        </button>
                    ))}
                </div>

                {/* Schedule Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {scheduleData[activeDay]?.map((session) => (
                        <div
                            key={session.id}
                            className="group relative glass-adaptive rounded-3xl p-6 hover:bg-slate-200 dark:hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-brand-blue/30"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className={cn("px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1", getIntensityColor(session.intensity))}>
                                    <Zap size={12} fill="currentColor" />
                                    {session.intensity}
                                </div>
                                <div className="text-slate-500 dark:text-slate-400 text-sm font-display flex items-center gap-1">
                                    <Clock size={14} />
                                    {session.time}
                                </div>
                            </div>

                            <h3 className="text-xl font-bold font-display mb-2 dark:text-white">{session.title}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 flex items-center gap-2">
                                <User size={14} />
                                {session.trainer}
                            </p>

                            <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-white/10">
                                <div className="flex items-center gap-2 text-sm">
                                    <div className="p-2 rounded-full bg-slate-800 text-white">
                                        {getTypeIcon(session.type)}
                                    </div>
                                    <span className="text-slate-600 dark:text-slate-300">{session.type}</span>
                                </div>

                                <Button
                                    onClick={() => setSelectedClass(session)}
                                    disabled={session.spotsLeft === 0}
                                    className={cn(
                                        "rounded-full px-6",
                                        session.spotsLeft === 0 ? "bg-slate-200 dark:bg-slate-800 text-slate-500" : "bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-brand-blue dark:hover:bg-brand-blue hover:text-white dark:hover:text-white"
                                    )}
                                >
                                    {session.spotsLeft === 0 ? 'Full' : 'Book'}
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Booking Modal */}
            {selectedClass && (
                <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 max-w-md w-full relative animate-in zoom-in-50 duration-300">
                        <button
                            onClick={() => setSelectedClass(null)}
                            className="absolute top-6 right-6 text-slate-500 hover:text-white"
                        >
                            <X size={24} />
                        </button>

                        <h3 className="font-display text-2xl font-bold mb-1 text-white">Confirm Booking</h3>
                        <p className="text-slate-400 text-sm mb-6">You are about to book a spot.</p>

                        <div className="bg-slate-800/50 rounded-2xl p-4 mb-6 space-y-3">
                            <div className="flex justify-between items-center text-slate-200">
                                <span className="text-slate-400 text-sm">Class</span>
                                <span className="font-bold">{selectedClass.title}</span>
                            </div>
                            <div className="flex justify-between items-center text-slate-200">
                                <span className="text-slate-400 text-sm">Time</span>
                                <span className="font-bold">{selectedClass.time}</span>
                            </div>
                            <div className="flex justify-between items-center text-slate-200">
                                <span className="text-slate-400 text-sm">Trainer</span>
                                <span className="font-bold">{selectedClass.trainer}</span>
                            </div>
                        </div>

                        <Button className="w-full h-12 bg-brand-orange hover:bg-orange-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-orange-900/20">
                            Confirm & Pay
                        </Button>
                        <p className="text-center text-xs text-slate-500 mt-4">
                            {selectedClass.spotsLeft} spots remaining for this session
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Schedule;
