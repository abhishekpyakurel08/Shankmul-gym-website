import { useState } from 'react';
import { Play, MapPin, Clock, X, User, Flame, Dumbbell, Activity, Zap } from 'lucide-react';
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

const ShankhamulLanding = () => {
    const [activeDay, setActiveDay] = useState('Monday');
    const [selectedClass, setSelectedClass] = useState<ClassSession | null>(null);
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

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
            case 'Yoga': return <User className="w-4 h-4" />; // Using user as proxy for yoga pose
            case 'HIIT': return <Flame className="w-4 h-4" />;
            default: return <Activity className="w-4 h-4" />;
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-brand-orange selection:text-white">
            {/* Navigation */}
            <nav className="fixed w-full z-50 top-0 left-0 px-6 py-4">
                <div className="max-w-7xl mx-auto glass-dark rounded-full px-6 py-3 flex justify-between items-center">
                    <div className="font-display font-bold text-2xl tracking-tighter">
                        SHANK<span className="text-brand-orange">MUL</span>
                    </div>
                    <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
                        <a href="#" className="hover:text-white transition-colors">Home</a>
                        <a href="#schedule" className="hover:text-white transition-colors">Schedule</a>
                        <a href="#trainers" className="hover:text-white transition-colors">Trainers</a>
                        <a href="#plans" className="hover:text-white transition-colors">Membership</a>
                    </div>
                    <Button className="bg-brand-orange hover:bg-orange-700 text-white rounded-full px-6">
                        Join Now
                    </Button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
                {/* Animated Background Orbs */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-20 left-1/4 w-96 h-96 bg-brand-blue/30 rounded-full blur-[128px] animate-pulse" />
                    <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-brand-orange/20 rounded-full blur-[128px] animate-float decoration-delay-1000" />
                </div>

                <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark text-brand-orange text-sm font-bold animate-fade-in-up">
                            <Zap size={16} fill="currentColor" />
                            <span>#1 Fitness Destination in Kathmandu</span>
                        </div>

                        <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight">
                            Forge Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-blue">
                                Ultimate Body
                            </span>
                        </h1>

                        <p className="text-slate-400 text-lg max-w-xl leading-relaxed">
                            Experience world-class equipment, expert trainers, and a community that pushes you further.
                            Join Shankhamul Health Club today.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Button className="h-14 px-8 text-lg bg-white text-black hover:bg-slate-200 rounded-full font-bold">
                                Start Free Trial
                            </Button>
                            <button
                                onClick={() => setIsVideoOpen(true)}
                                className="h-14 px-8 rounded-full glass-dark text-white hover:bg-white/10 flex items-center gap-3 transition-colors group"
                            >
                                <div className="w-8 h-8 rounded-full bg-brand-orange flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Play size={14} fill="white" className="ml-1" />
                                </div>
                                <span>Watch Video</span>
                            </button>
                        </div>

                        {/* Floating Info Cards */}
                        <div className="grid grid-cols-2 gap-4 mt-12">
                            <div className="glass-dark p-4 rounded-2xl flex items-start gap-3">
                                <MapPin className="text-brand-orange shrink-0" />
                                <div>
                                    <h3 className="font-bold font-display">Location</h3>
                                    <p className="text-xs text-slate-400 mt-1">Shankhamul, Kathmandu<br />Nepal</p>
                                </div>
                            </div>
                            <div className="glass-dark p-4 rounded-2xl flex items-start gap-3">
                                <Clock className="text-brand-blue shrink-0" />
                                <div>
                                    <h3 className="font-bold font-display">Opening Hours</h3>
                                    <p className="text-xs text-slate-400 mt-1">Sun - Fri: 5am - 9pm<br />Sat: 6am - 12pm</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative hidden lg:block h-[600px]">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950 z-20" />
                        <img
                            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop"
                            alt="Fitness Trainer"
                            className="w-full h-full object-cover rounded-3xl opacity-90 mask-image-linear-to-b"
                        />

                        {/* Floating Quick Stats */}
                        <div className="absolute top-20 -left-10 glass-dark p-4 rounded-2xl animate-float z-30 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                                <Activity size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-slate-400">Calories Burned</p>
                                <p className="font-bold font-display">500+ kcal/hr</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Class Schedule Section */}
            <section id="schedule" className="py-24 px-6 bg-slate-900/50">
                <div className="container mx-auto">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="font-display text-4xl font-bold mb-4">Weekly Schedule</h2>
                        <p className="text-slate-400">Find your perfect class. From high-intensity interval training to restorative yoga sequences.</p>
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
                                        : "glass-dark hover:bg-white/5 text-slate-400"
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
                                className="group relative glass-dark rounded-3xl p-6 hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-brand-blue/30"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className={cn("px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1", getIntensityColor(session.intensity))}>
                                        <Zap size={12} fill="currentColor" />
                                        {session.intensity}
                                    </div>
                                    <div className="text-slate-400 text-sm font-display flex items-center gap-1">
                                        <Clock size={14} />
                                        {session.time}
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold font-display mb-2">{session.title}</h3>
                                <p className="text-slate-400 text-sm mb-6 flex items-center gap-2">
                                    <User size={14} />
                                    {session.trainer}
                                </p>

                                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                                    <div className="flex items-center gap-2 text-sm">
                                        <div className="p-2 rounded-full bg-slate-800 text-white">
                                            {getTypeIcon(session.type)}
                                        </div>
                                        <span className="text-slate-300">{session.type}</span>
                                    </div>

                                    <Button
                                        onClick={() => setSelectedClass(session)}
                                        disabled={session.spotsLeft === 0}
                                        className={cn(
                                            "rounded-full px-6",
                                            session.spotsLeft === 0 ? "bg-slate-800 text-slate-500" : "bg-white text-black hover:bg-brand-blue hover:text-white"
                                        )}
                                    >
                                        {session.spotsLeft === 0 ? 'Full' : 'Book'}
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Motivation Section */}
            <section className="relative py-32 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-brand-orange/5 z-0" />
                <div className="container mx-auto relative z-10 text-center">
                    <h2 className="font-display text-5xl md:text-7xl font-bold mb-8 items-center justify-center flex flex-col gap-4">
                        <span className="text-slate-400 text-3xl md:text-4xl font-normal">Don't Wish For It</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                            WORK FOR IT
                        </span>
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-12">
                        The only bad workout is the one that didn't happen.
                        Join our community of doers, dreamers, and achievers.
                    </p>
                    <Button className="h-16 px-12 text-xl bg-white text-black hover:bg-brand-blue hover:text-white rounded-full font-bold shadow-2xl shadow-white/10 transition-all hover:scale-105">
                        Join The Club
                    </Button>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-black border-t border-white/10 pt-20 pb-10 px-6">
                <div className="container mx-auto">
                    <div className="grid md:grid-cols-4 gap-12 mb-16">
                        <div className="col-span-1 md:col-span-2">
                            <div className="font-display font-bold text-3xl tracking-tighter mb-6">
                                SHANK<span className="text-brand-orange">MUL</span>
                            </div>
                            <p className="text-slate-400 max-w-md mb-8">
                                Premium fitness destination in the heart of Kathmandu.
                                State-of-the-art equipment, expert trainers, and a supportive community to help you reach your goals.
                            </p>
                            <div className="flex gap-4">
                                {['Facebook', 'Instagram', 'Twitter'].map((social) => (
                                    <a key={social} href="#" className="w-10 h-10 rounded-full glass-dark flex items-center justify-center hover:bg-brand-orange hover:text-white transition-colors">
                                        <span className="sr-only">{social}</span>
                                        <Activity size={18} />
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold font-display text-lg mb-6">Quick Links</h4>
                            <ul className="space-y-4 text-slate-400">
                                <li><a href="#" className="hover:text-brand-orange transition-colors">About Us</a></li>
                                <li><a href="#schedule" className="hover:text-brand-orange transition-colors">Class Schedule</a></li>
                                <li><a href="#" className="hover:text-brand-orange transition-colors">Membership Plans</a></li>
                                <li><a href="#" className="hover:text-brand-orange transition-colors">Trainers</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold font-display text-lg mb-6">Contact Info</h4>
                            <ul className="space-y-4 text-slate-400">
                                <li className="flex items-start gap-3">
                                    <MapPin size={20} className="text-brand-orange shrink-0 mt-1" />
                                    <span>Shankhamul, Kathmandu<br />Nepal</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <User size={20} className="text-brand-orange shrink-0" />
                                    <span>+977 1234567890</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Clock size={20} className="text-brand-orange shrink-0" />
                                    <span>Sun - Fri: 5am - 9pm</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
                        <p>© 2024 Shankhamul Health Club. All rights reserved.</p>
                        <div className="flex gap-8">
                            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Video Modal */}
            {isVideoOpen && (
                <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
                    <button
                        onClick={() => setIsVideoOpen(false)}
                        className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
                    >
                        <X size={32} />
                    </button>
                    <div className="w-full max-w-5xl aspect-video rounded-3xl overflow-hidden shadow-2xl shadow-brand-orange/20 border border-white/10">
                        <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/XXYlFuWEuKI?autoplay=1"
                            title="Gym Video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </div>
            )}

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

                        <h3 className="font-display text-2xl font-bold mb-1">Confirm Booking</h3>
                        <p className="text-slate-400 text-sm mb-6">You are about to book a spot.</p>

                        <div className="bg-slate-800/50 rounded-2xl p-4 mb-6 space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400 text-sm">Class</span>
                                <span className="font-bold">{selectedClass.title}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400 text-sm">Time</span>
                                <span className="font-bold">{selectedClass.time}</span>
                            </div>
                            <div className="flex justify-between items-center">
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

export default ShankhamulLanding;
