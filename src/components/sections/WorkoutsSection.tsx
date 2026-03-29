import { useNavigate } from 'react-router-dom';
import { CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { workoutsData } from '@/data/workoutsData';
import { motion } from 'framer-motion';

const WorkoutsSection = () => {
    const navigate = useNavigate();

    return (
        <section id="workouts" className="py-16 md:py-24 px-4 sm:px-6 bg-white overflow-hidden">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <span className="text-brand-orange font-bold tracking-wider uppercase text-sm mb-2 block">Start Your Journey</span>
                    <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 text-slate-900">
                        Beginner Friendly <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-blue">
                            Workouts
                        </span>
                    </h2>
                    <p className="text-slate-600 text-base sm:text-lg">
                        Don't be intimidated. Everyone starts somewhere. These curated sessions are designed to build confidence, proper form, and a habit of consistency.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {workoutsData.map((workout, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group bg-white rounded-3xl overflow-hidden hover:scale-[1.02] transition-transform duration-300 shadow-lg border border-slate-100 flex flex-col"
                        >
                            <div
                                className="relative h-64 overflow-hidden shrink-0 cursor-pointer"
                                onClick={() => navigate(`/beginner-workouts/${workout.id}`)}
                            >
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
                            </div>
                            <div className="p-8 flex flex-col flex-grow">
                                <p className="text-slate-600 mb-6 line-clamp-2">
                                    {workout.description}
                                </p>

                                <div className="space-y-3 mb-8">
                                    <div className="flex items-center gap-3 text-sm text-slate-700">
                                        <CheckCircle size={16} className="text-green-500" />
                                        <span>No equipment needed</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-700">
                                        <CheckCircle size={16} className="text-green-500" />
                                        <span>Detailed Instructions</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-700">
                                        <CheckCircle size={16} className="text-green-500" />
                                        <span>{workout.exercisesCount} Exercises in Plan</span>
                                    </div>
                                </div>

                                <Button
                                    onClick={() => navigate(`/beginner-workouts/${workout.id}`)}
                                    className="w-full bg-slate-900 text-white hover:bg-brand-orange transition-colors mt-auto"
                                >
                                    Start Workout
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mt-20 bg-slate-50 border border-slate-100 shadow-xl rounded-[40px] p-8 md:p-12 text-center relative overflow-hidden"
                >
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold font-display mb-4 text-slate-900">Not sure where to begin?</h2>
                        <p className="text-slate-600 max-w-xl mx-auto mb-8">
                            Our trainers can create a personalized 4-week roadmap just for you. Completely free for new starters.
                        </p>
                        <a href="https://wa.me/9779743223799" target="_blank" rel="noopener noreferrer">
                            <Button className="bg-brand-orange text-white hover:bg-orange-600 px-8 h-12 rounded-full text-lg shadow-lg shadow-orange-200">
                                Get My Free Plan
                            </Button>
                        </a>
                    </div>
                    {/* Background Detail */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/5 rounded-full blur-3xl -mr-32 -mt-32" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-blue/5 rounded-full blur-3xl -ml-32 -mb-32" />
                </motion.div>
            </div>
        </section>
    );
};

export default WorkoutsSection;
