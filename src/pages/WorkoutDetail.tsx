import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Activity, CheckCircle, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { workoutsData } from '@/data/workoutsData';

const WorkoutDetail = () => {
    const { id } = useParams();
    const workout = workoutsData.find(w => w.id === id);

    if (!workout) {
        return (
            <div className="pt-32 pb-20 text-center bg-slate-50 min-h-screen">
                <h1 className="text-3xl font-bold mb-4 text-slate-900">Workout Not Found</h1>
                <Link to="/#workouts">
                    <Button className="bg-brand-orange text-white rounded-full px-8">Back to Workouts Guide</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
            {/* Immersive Hero Section */}
            <div className="relative h-[450px] w-full overflow-hidden">
                <img
                    src={workout.image}
                    alt={workout.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 backdrop-blur-[1px]" />
                <div className="absolute inset-0 flex items-center justify-center pt-12">
                    <div className="container mx-auto px-6 text-center">
                        <Link to="/#workouts" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors font-medium group">
                            <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                            Back to Workouts Guide
                        </Link>
                        <div className="flex justify-center mb-6">
                            <span className="bg-brand-orange px-6 py-2 rounded-full text-xs font-bold text-white uppercase tracking-widest shadow-xl shadow-brand-orange/20">
                                {workout.level} Foundation
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-7xl font-bold font-display text-white mb-6 uppercase tracking-tight">{workout.title}</h1>
                        <div className="flex items-center justify-center gap-8 text-white/90 text-lg">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                    <Clock size={20} className="text-brand-orange" />
                                </div>
                                <span className="font-bold">{workout.duration}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                    <Activity size={20} className="text-brand-blue" />
                                </div>
                                <span className="font-bold">{workout.exercisesCount} Exercises</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 -mt-16 relative z-10">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Primary Focus: Steps */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Overview Card */}
                        <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-1.5 h-8 bg-brand-orange rounded-full" />
                                <h2 className="text-3xl font-bold font-display text-slate-900">Workout Overview</h2>
                            </div>
                            <p className="text-slate-600 text-lg leading-relaxed mb-10">
                                {workout.description}
                            </p>

                            <div className="p-8 rounded-[32px] bg-slate-900 text-white relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-brand-orange/30 transition-colors" />
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                                    <PlayCircle className="text-brand-orange" size={24} />
                                    Starting Phase: Warm-up
                                </h3>
                                <p className="text-slate-300 text-lg leading-relaxed">{workout.details?.warmup}</p>
                            </div>
                        </div>

                        {/* Exercises List */}
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold font-display text-slate-900 px-4">The Exercises</h2>
                            {workout.details?.steps.map((step, index) => (
                                <div key={index} className="bg-white rounded-[40px] p-6 md:p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col md:flex-row items-center gap-8 hover:border-brand-orange/30 transition-all duration-300 group">
                                    {/* Exercise Visual */}
                                    <div className="w-full md:w-48 aspect-video md:aspect-square rounded-3xl overflow-hidden shrink-0 border border-slate-50 relative">
                                        <img
                                            src={step.imageUrl || "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&auto=format&fit=crop"}
                                            alt={step.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                                        <div className="absolute bottom-3 left-3 w-10 h-10 rounded-2xl bg-white/90 backdrop-blur-md shadow-lg flex items-center justify-center font-bold text-slate-900 border border-white">
                                            {index + 1}
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-brand-orange transition-colors">{step.name}</h3>
                                        <p className="text-slate-500 text-lg leading-relaxed mb-6 line-clamp-2 md:line-clamp-none">{step.notes}</p>

                                        <div className="flex gap-4">
                                            <div className="bg-slate-50 border border-slate-100 rounded-2xl px-6 py-3 flex-1 md:flex-none">
                                                <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Sets</span>
                                                <span className="text-2xl font-bold text-slate-900">{step.sets}</span>
                                            </div>
                                            <div className="bg-slate-50 border border-slate-100 rounded-2xl px-6 py-3 flex-1 md:flex-none">
                                                <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Reps</span>
                                                <span className="text-2xl font-bold text-slate-900">{step.reps.split(' ')[0]}</span>
                                                <span className="text-sm font-medium text-slate-500 ml-1">{step.reps.split(' ')[1] || 'reps'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar / Secondary Info */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Cooldown Sidebar */}
                        <div className="bg-white rounded-[40px] p-8 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100 border-t-8 border-t-green-500 sticky top-24">
                            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-6">
                                <CheckCircle className="text-green-500" size={32} />
                            </div>
                            <h2 className="text-2xl font-bold font-display text-slate-900 mb-4">Post-Workout</h2>
                            <h3 className="text-lg font-bold text-slate-700 mb-3">The Cooldown Phase</h3>
                            <p className="text-slate-500 text-lg leading-relaxed mb-10">
                                {workout.details?.cooldown}
                            </p>
                            <Button className="w-full bg-slate-900 text-white rounded-full h-16 font-bold text-lg hover:bg-brand-orange transition-all hover:scale-[1.02] shadow-xl shadow-slate-900/10">
                                Log This Workout
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="mt-20 text-center pb-20">
                    <p className="text-slate-500 font-medium mb-6 italic">Ready for more?</p>
                    <Link to="/#workouts">
                        <Button className="bg-white text-slate-900 border-2 border-slate-200 hover:border-brand-orange hover:text-brand-orange px-10 h-16 rounded-full text-lg font-bold transition-all">
                            Browse Other Workout Guides
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default WorkoutDetail;
