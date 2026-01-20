import { Award, Users, Target, History } from 'lucide-react';
import { Button } from '@/components/ui/button';

const About = () => {
    return (
        <div className="pt-24 pb-20">
            {/* Hero */}
            <section className="relative h-[400px] mb-20 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1595078475328-1ab05d0a6a0e?q=80&w=2000&auto=format&fit=crop"
                        alt="Gym Interior"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
                </div>
                <div className="relative container mx-auto px-6 h-full flex items-center">
                    <div className="max-w-2xl animate-fade-in-up">
                        <span className="text-brand-orange font-bold tracking-wider uppercase text-sm mb-2 block">Our Story</span>
                        <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">
                            More Than Just <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-blue">
                                A Gym
                            </span>
                        </h1>
                        <p className="text-slate-200 text-lg">
                            Shankhamul Health Club was founded with a single mission: to empower the community of Kathmandu through health and fitness.
                        </p>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-6">
                {/* Mission & Vision */}
                <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
                    <div className="space-y-8">
                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-brand-orange/10 flex items-center justify-center shrink-0">
                                <Target className="text-brand-orange" size={24} />
                            </div>
                            <div>
                                <h3 className="font-display text-2xl font-bold mb-2 dark:text-white">Our Mission</h3>
                                <p className="text-slate-600 dark:text-slate-400">
                                    To provide world-class fitness facilities and expert guidance accessible to everyone, helping our members discover their true potential.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 flex items-center justify-center shrink-0">
                                <Users className="text-brand-blue" size={24} />
                            </div>
                            <div>
                                <h3 className="font-display text-2xl font-bold mb-2 dark:text-white">Our Community</h3>
                                <p className="text-slate-600 dark:text-slate-400">
                                    We believe fitness is stronger together. Our diverse community of members supports and inspires each other every single day.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center shrink-0">
                                <History className="text-green-500" size={24} />
                            </div>
                            <div>
                                <h3 className="font-display text-2xl font-bold mb-2 dark:text-white">Our History</h3>
                                <p className="text-slate-600 dark:text-slate-400">
                                    Established in 2018, we've grown from a small neighborhood gym to Kathmandu's premier fitness destination, serving over 5,000 members.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute -inset-4 bg-brand-orange/20 rounded-3xl blur-2xl dark:opacity-40" />
                        <img
                            src="https://images.unsplash.com/photo-1549476464-37392f717541?q=80&w=1000&auto=format&fit=crop"
                            alt="Community Workout"
                            className="relative rounded-3xl shadow-2xl dark:border dark:border-white/10"
                        />
                        {/* Stats Card */}
                        <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 p-6 rounded-2xl shadow-xl flex gap-6">
                            <div>
                                <p className="text-3xl font-bold font-display text-brand-orange">5k+</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Members</p>
                            </div>
                            <div className="w-px bg-slate-200 dark:bg-slate-700" />
                            <div>
                                <p className="text-3xl font-bold font-display text-brand-blue">20+</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Trainers</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Why Choose Us */}
                <div className="mb-24">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="font-display text-4xl font-bold mb-4 dark:text-white">Why Choose Shankhamul?</h2>
                        <p className="text-slate-600 dark:text-slate-400">We invest in the best so you can be your best.</p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            { title: "Top Equipment", text: "Premium Technogym & Rogue fitness equipment." },
                            { title: "Expert Trainers", text: "Certified professionals to guide your journey." },
                            { title: "Hygiene Focused", text: "Sanitized continuously for your safety." },
                            { title: "Flexible Hours", text: "Open early and late to fit your schedule." }
                        ].map((item, i) => (
                            <div key={i} className="glass-adaptive p-6 rounded-2xl hover:bg-brand-orange/5 transition-colors">
                                <Award className="text-brand-orange mb-4" size={32} />
                                <h3 className="font-bold text-lg mb-2 dark:text-white">{item.title}</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="relative rounded-3xl overflow-hidden bg-slate-900 px-6 py-16 text-center">
                    <div className="absolute inset-0 opacity-30">
                        <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80" alt="CTA BG" className="w-full h-full object-cover" />
                    </div>
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">Ready to Join the Family?</h2>
                        <Button className="bg-brand-orange hover:bg-orange-600 text-white px-8 py-6 rounded-full text-lg">
                            Contact Us Today
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
