import { useNavigate } from 'react-router-dom';
import { Play, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { workoutsData } from '@/data/workoutsData';

const BeginnerWorkouts = () => {
    const navigate = useNavigate();

    return (
        <div className="pt-24 pb-20 container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
                <span className="text-brand-orange font-bold tracking-wider uppercase text-sm">Start Your Journey</span>
                <h1 className="font-display text-4xl md:text-6xl font-bold mt-4 mb-6 dark:text-white">
                    Beginner Friendly <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-blue">
                        Workouts
                    </span>
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-lg">
                    Don't be intimidated. Everyone starts somewhere. These curated sessions are designed to build confidence, proper form, and a habit of consistency.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {workoutsData.map((workout, index) => (
                    <div key={index} className="group glass-adaptive rounded-3xl overflow-hidden hover:scale-[1.02] transition-transform duration-300">
                        <div className="relative h-64 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                            <img
                                src={workout.image}
                                alt={workout.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute bottom-6 left-6 z-20">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="px-3 py-1 bg-brand-orange text-white text-xs font-bold rounded-full">
                                        {workout.level}
                                    </span>
                                    <span className="text-slate-300 text-xs flex items-center gap-1">
                                        <Clock size={12} className="inline" /> {workout.duration}
                                    </span>
                                </div>
                                <h3 className="text-white text-2xl font-bold font-display">{workout.title}</h3>
                            </div>
                            <button
                                onClick={() => navigate(`/beginner-workouts/${workout.id}`)}
                                className="absolute inset-0 z-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-sm"
                            >
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center pl-1 shadow-2xl scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
                                    <Play size={24} className="text-brand-orange" fill="currentColor" />
                                </div>
                            </button>
                        </div>
                        <div className="p-8">
                            <p className="text-slate-600 dark:text-slate-400 mb-6 line-clamp-2">
                                {workout.description}
                            </p>

                            <div className="space-y-3 mb-8">
                                <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                                    <CheckCircle size={16} className="text-green-500" />
                                    <span>No equipment needed</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                                    <CheckCircle size={16} className="text-green-500" />
                                    <span>Detailed Instructions</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                                    <CheckCircle size={16} className="text-green-500" />
                                    <span>{workout.exercisesCount} Exercises in Plan</span>
                                </div>
                            </div>

                            <Button
                                onClick={() => navigate(`/beginner-workouts/${workout.id}`)}
                                className="w-full bg-slate-900 text-white dark:bg-white dark:text-black hover:bg-brand-orange dark:hover:bg-brand-orange hover:text-white dark:hover:text-white transition-colors"
                            >
                                Start Workout
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-20 glass-adaptive rounded-3xl p-12 text-center relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-3xl font-bold font-display mb-4 dark:text-white">Not sure where to begin?</h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto mb-8">
                        Our trainers can create a personalized 4-week roadmap just for you. Completely free for new members.
                    </p>
                    <Button className="bg-brand-orange text-white hover:bg-orange-600 px-8 h-12 rounded-full text-lg">
                        Get My Free Plan
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default BeginnerWorkouts;
