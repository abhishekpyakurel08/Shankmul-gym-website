import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Activity, CheckCircle, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { workoutsData } from '@/data/workoutsData';

const WorkoutDetail = () => {
    const { id } = useParams();
    const workout = workoutsData.find(w => w.id === id);

    if (!workout) {
        return (
            <div className="pt-32 pb-20 text-center">
                <h1 className="text-2xl font-bold dark:text-white">Workout Not Found</h1>
                <Link to="/beginner-workouts" className="text-brand-orange hover:underline mt-4 block">Back to Workouts</Link>
            </div>
        );
    }

    return (
        <div className="pt-24 pb-20">
            {/* Header */}
            <div className="relative h-[300px] md:h-[400px] mb-12">
                <div className="absolute inset-0">
                    <img src={workout.image} alt={workout.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
                </div>
                <div className="container mx-auto px-6 h-full flex flex-col justify-center relative z-10">
                    <Link to="/beginner-workouts" className="inline-flex items-center text-slate-300 hover:text-white mb-6 transition-colors">
                        <ArrowLeft size={16} className="mr-2" /> Back to List
                    </Link>
                    <span className="text-brand-orange font-bold tracking-wider uppercase text-sm mb-2">{workout.level} Level</span>
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">{workout.title}</h1>
                    <div className="flex items-center gap-6 text-slate-300">
                        <span className="flex items-center gap-2"><Clock size={16} /> {workout.duration}</span>
                        <span className="flex items-center gap-2"><Activity size={16} /> {workout.exercisesCount} Exercises</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 max-w-4xl">
                {/* Intro */}
                <div className="glass-adaptive rounded-3xl p-8 mb-12">
                    <h2 className="text-2xl font-bold font-display mb-4 dark:text-white">Overview</h2>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                        {workout.description}
                    </p>
                    <div className="p-4 bg-brand-orange/10 border border-brand-orange/20 rounded-xl">
                        <h3 className="font-bold text-brand-orange mb-2 flex items-center gap-2"><PlayCircle size={18} /> Warm-up Required</h3>
                        <p className="text-sm text-slate-700 dark:text-slate-300">{workout.details?.warmup}</p>
                    </div>
                </div>

                {/* Exercises List */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold font-display mb-2 dark:text-white">The Workout</h2>
                    {workout.details?.steps.map((step, index) => (
                        <div key={index} className="glass-adaptive rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 hover:border-brand-orange/30 transition-colors group">
                            {/* Image Placeholder */}
                            <div className="w-full md:w-32 h-32 rounded-xl overflow-hidden shrink-0 border border-slate-200 dark:border-white/10">
                                <img
                                    src={step.imageUrl || "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&auto=format&fit=crop"}
                                    alt={step.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                    <div className="w-6 h-6 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-bold flex items-center justify-center">
                                        {index + 1}
                                    </div>
                                    <h3 className="text-xl font-bold dark:text-white group-hover:text-brand-orange transition-colors">{step.name}</h3>
                                </div>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">{step.notes}</p>
                            </div>

                            <div className="flex items-center gap-3 text-sm font-medium w-full md:w-auto justify-end">
                                <div className="px-4 py-2 bg-slate-100 dark:bg-slate-900 rounded-lg text-slate-700 dark:text-slate-300 text-center min-w-[70px]">
                                    <span className="block text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">Sets</span>
                                    {step.sets}
                                </div>
                                <div className="px-4 py-2 bg-slate-100 dark:bg-slate-900 rounded-lg text-slate-700 dark:text-slate-300 text-center min-w-[70px]">
                                    <span className="block text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">Reps</span>
                                    {step.reps}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Cooldown */}
                <div className="mt-12 glass-adaptive rounded-3xl p-8 border-l-4 border-green-500">
                    <h3 className="text-xl font-bold mb-2 dark:text-white flex items-center gap-2"><CheckCircle className="text-green-500" /> Cool Down</h3>
                    <p className="text-slate-600 dark:text-slate-300">{workout.details?.cooldown}</p>
                </div>

                <div className="mt-16 text-center">
                    <Button className="bg-brand-orange hover:bg-orange-600 text-white px-12 py-6 rounded-full text-xl font-bold shadow-xl shadow-brand-orange/20 hover:shadow-brand-orange/40 transition-all hover:-translate-y-1">
                        Complete Workout
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default WorkoutDetail;
