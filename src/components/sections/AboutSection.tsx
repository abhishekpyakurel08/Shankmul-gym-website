import { motion } from 'framer-motion';
import { Award, Users, Target, History } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import aboutData from '@/data/aboutData.json';

type IconName = 'Target' | 'Users' | 'History' | 'Award';
const iconMap: Record<IconName, React.ElementType> = { Target, Users, History, Award };

const AboutSection = () => {
    return (
        <section id="about" className="py-32 px-6 bg-white overflow-hidden">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-2xl mx-auto mb-20"
                >
                    <span className="badge badge-secondary mb-4 p-4 text-xs">Our Story</span>
                    <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 text-slate-900">More Than Just A Gym</h2>
                    <p className="text-slate-600 text-lg leading-relaxed">
                        Shankhamul Health Club & Fitness Centre was founded with a single mission: to empower the community of Kathmandu through health and fitness.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-20 items-center mb-32">
                    <div className="space-y-10">
                        {aboutData.pillars.map((item, i) => {
                            const Icon = iconMap[item.icon as IconName] || Award;
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: i * 0.2 }}
                                    className="flex gap-6 group"
                                >
                                    <div className={`w-14 h-14 rounded-2xl bg-${item.color}/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500`}>
                                        <Icon className={`text-${item.color}`} size={28} />
                                    </div>
                                    <div>
                                        <h3 className="font-display text-2xl font-bold mb-3">{item.title}</h3>
                                        <p className="text-slate-600 leading-relaxed">{item.text}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    <div className="relative group/image">
                        <div className="absolute -inset-4 bg-brand-orange/20 rounded-3xl blur-2xl opacity-0 group-hover/image:opacity-40 transition-opacity duration-700" />
                        <img
                            src="https://images.unsplash.com/photo-1549476464-37392f717541?q=80&w=1000&auto=format&fit=crop"
                            alt="Community Workout"
                            className="relative rounded-[2.5rem] shadow-2xl w-full transition-transform duration-700 ease-out group-hover/image:scale-[1.02] group-hover/image:-rotate-1"
                        />
                        {/* Stats Card */}
                        <Card className="absolute -bottom-6 left-1/2 -translate-x-1/2 md:-left-6 md:translate-x-0 border-slate-100 shadow-2xl z-20 whitespace-nowrap overflow-hidden transition-all duration-700 ease-out group-hover/image:translate-y-[-8px] group-hover/image:shadow-brand-orange/20">
                            <CardContent className="p-8 flex flex-row gap-8 items-center bg-white/90 backdrop-blur-md">
                                <div className="text-center">
                                    <p className="text-3xl md:text-4xl font-black font-display text-brand-orange leading-none mb-1">5k+</p>
                                    <p className="text-[10px] md:text-xs text-muted-foreground uppercase font-black tracking-[0.2em]">Members</p>
                                </div>
                                <div className="w-px h-12 bg-slate-200" />
                                <div className="text-center">
                                    <p className="text-3xl md:text-4xl font-black font-display text-brand-blue leading-none mb-1">20+</p>
                                    <p className="text-[10px] md:text-xs text-muted-foreground uppercase font-black tracking-[0.2em]">Trainers</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Why Choose Us */}
                <div className="mt-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center max-w-2xl mx-auto mb-16"
                    >
                        <h2 className="font-display text-4xl font-bold mb-4">Why Choose Shankhamul?</h2>
                        <p className="text-slate-600">We invest in the best so you can be your best.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {aboutData.whyChooseUs.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="daisy-card group"
                            >
                                <div className="daisy-card-body bg-slate-50 hover:bg-brand-orange/5 transition-colors">
                                    <Award className="text-brand-orange mb-2 group-hover:scale-110 transition-transform" size={32} />
                                    <h3 className="text-lg font-bold">{item.title}</h3>
                                    <p className="text-sm text-muted-foreground">{item.text}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
