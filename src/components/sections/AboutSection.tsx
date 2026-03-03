import { Award, Users, Target, History } from 'lucide-react';

const AboutSection = () => {
    return (
        <section id="about" className="py-24 px-6 bg-white">
            <div className="container mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-brand-orange font-bold tracking-wider uppercase text-sm mb-2 block">Our Story</span>
                    <h2 className="font-display text-4xl font-bold mb-4 text-slate-900">More Than Just A Gym</h2>
                    <p className="text-slate-600">
                        Shankhamul Health Club & Fitness Centre was founded with a single mission: to empower the community of Kathmandu through health and fitness.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
                    <div className="space-y-8">
                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-brand-orange/10 flex items-center justify-center shrink-0">
                                <Target className="text-brand-orange" size={24} />
                            </div>
                            <div>
                                <h3 className="font-display text-2xl font-bold mb-2">Our Mission</h3>
                                <p className="text-slate-600">
                                    To provide world-class fitness facilities and expert guidance accessible to everyone, helping our members discover their true potential.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 flex items-center justify-center shrink-0">
                                <Users className="text-brand-blue" size={24} />
                            </div>
                            <div>
                                <h3 className="font-display text-2xl font-bold mb-2">Our Community</h3>
                                <p className="text-slate-600">
                                    We believe fitness is stronger together. Our diverse community of members supports and inspires each other every single day.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center shrink-0">
                                <History className="text-green-500" size={24} />
                            </div>
                            <div>
                                <h3 className="font-display text-2xl font-bold mb-2">Our History</h3>
                                <p className="text-slate-600">
                                    Established in 2018, we've grown from a small neighborhood gym to Kathmandu's premier fitness destination, serving over 5,000 members.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute -inset-4 bg-brand-orange/20 rounded-3xl blur-2xl opacity-40" />
                        <img
                            src="https://images.unsplash.com/photo-1549476464-37392f717541?q=80&w=1000&auto=format&fit=crop"
                            alt="Community Workout"
                            className="relative rounded-3xl shadow-2xl w-full"
                        />
                        {/* Stats Card */}
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 md:-left-6 md:translate-x-0 bg-white border border-slate-100 p-6 rounded-2xl shadow-xl flex gap-6 z-20 whitespace-nowrap">
                            <div>
                                <p className="text-2xl md:text-3xl font-bold font-display text-brand-orange">5k+</p>
                                <p className="text-[10px] md:text-xs text-slate-500 uppercase font-bold tracking-wider">Members</p>
                            </div>
                            <div className="w-px bg-slate-200" />
                            <div>
                                <p className="text-2xl md:text-3xl font-bold font-display text-brand-blue">20+</p>
                                <p className="text-[10px] md:text-xs text-slate-500 uppercase font-bold tracking-wider">Trainers</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Why Choose Us */}
                <div>
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="font-display text-4xl font-bold mb-4">Why Choose Shankhamul?</h2>
                        <p className="text-slate-600">We invest in the best so you can be your best.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "Top Equipment", text: "Premium Technogym & Rogue fitness equipment." },
                            { title: "Expert Trainers", text: "Certified professionals to guide your journey." },
                            { title: "Hygiene Focused", text: "Sanitized continuously for your safety." },
                            { title: "Flexible Hours", text: "Open early and late to fit your schedule." }
                        ].map((item, i) => (
                            <div key={i} className="bg-slate-50 p-6 rounded-2xl hover:bg-brand-orange/5 transition-colors border border-slate-100 shadow-sm">
                                <Award className="text-brand-orange mb-4" size={32} />
                                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                                <p className="text-sm text-slate-600">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
