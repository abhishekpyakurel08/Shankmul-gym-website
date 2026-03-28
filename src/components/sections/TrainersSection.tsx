import { motion } from 'framer-motion';
import trainersData from '@/data/trainersData.json';

const TrainersSection = () => {
    return (
        <section id="trainers" className="py-16 md:py-32 px-4 sm:px-6 bg-white overflow-hidden">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-2xl mx-auto mb-20"
                >
                    <span className="badge badge-primary mb-4 p-4 text-xs">Meet Our Experts</span>
                    <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 text-slate-900">Expert Trainers</h2>
                    <p className="text-slate-600 text-base sm:text-lg">Train with the best. Our certified experts are here to guide you every step of the way.</p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {trainersData.map((trainer, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: i * 0.2 }}
                            className="group relative overflow-hidden rounded-3xl sm:rounded-[2.5rem] h-[320px] sm:h-[420px] lg:h-[500px] shadow-2xl bg-slate-100"
                        >
                            <img src={trainer.image} alt={trainer.name} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-95" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 z-30 transition-transform duration-500 group-hover:-translate-y-2">
                                <h3 className="text-white text-2xl sm:text-3xl font-bold font-display mb-1 sm:mb-2">{trainer.name}</h3>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-0.5 bg-brand-orange" />
                                    <p className="text-brand-orange font-bold uppercase tracking-widest text-xs">{trainer.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 flex justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <p className="text-sm text-slate-400 font-medium italic">Loading more trainers</p>
                        <div className="loading-dots text-brand-orange">
                            <span />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrainersSection;
