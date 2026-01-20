import { useState } from 'react';
import { Play, MapPin, Clock, X, Activity, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import MotivationCarousel from '@/components/MotivationCarousel';

const HomePage = () => {
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    return (
        <div>
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
                {/* Animated Background Orbs */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-20 left-1/4 w-96 h-96 bg-brand-blue/30 rounded-full blur-[128px] animate-pulse" />
                    <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-brand-orange/20 rounded-full blur-[128px] animate-float decoration-delay-1000" />
                </div>

                <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-adaptive text-brand-orange text-sm font-bold animate-fade-in-up">
                            <Zap size={16} fill="currentColor" />
                            <span>#1 Fitness Destination in Kathmandu</span>
                        </div>

                        <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight">
                            Forge Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-blue">
                                Ultimate Body
                            </span>
                        </h1>

                        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-xl leading-relaxed">
                            Experience world-class equipment, expert trainers, and a community that pushes you further.
                            Join Shankhamul Health Club today.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Button className="h-14 px-8 text-lg bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-slate-200 rounded-full font-bold transition-all hover:scale-105 shadow-xl shadow-slate-900/10 dark:shadow-white/10">
                                Start Free Trial
                            </Button>
                            <button
                                onClick={() => setIsVideoOpen(true)}
                                className="h-14 px-8 rounded-full glass-adaptive text-slate-900 dark:text-white hover:bg-white/10 flex items-center gap-3 transition-colors group"
                            >
                                <div className="w-8 h-8 rounded-full bg-brand-orange flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Play size={14} fill="white" className="ml-1" />
                                </div>
                                <span>Watch Video</span>
                            </button>
                        </div>

                        {/* Floating Info Cards */}
                        <div className="grid grid-cols-2 gap-4 mt-12">
                            <div className="glass-adaptive p-4 rounded-2xl flex items-start gap-3">
                                <MapPin className="text-brand-orange shrink-0" />
                                <div>
                                    <h3 className="font-bold font-display">Location</h3>
                                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Shankhamul, Kathmandu<br />Nepal</p>
                                </div>
                            </div>
                            <div className="glass-adaptive p-4 rounded-2xl flex items-start gap-3">
                                <Clock className="text-brand-blue shrink-0" />
                                <div>
                                    <h3 className="font-bold font-display">Opening Hours</h3>
                                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Sun - Fri: 5am - 9pm<br />Sat: 6am - 12pm</p>
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
                        <div className="absolute top-20 -left-10 glass-adaptive p-4 rounded-2xl animate-float z-30 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                                <Activity size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-slate-600 dark:text-slate-400">Calories Burned</p>
                                <p className="font-bold font-display">500+ kcal/hr</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Daily Quotes Section */}
            <MotivationCarousel />

            {/* Trainers Section */}
            <section id="trainers" className="py-24 px-6 dark:bg-black bg-white">
                <div className="container mx-auto">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="font-display text-4xl font-bold mb-4 dark:text-white text-slate-900">Expert Trainers</h2>
                        <p className="text-slate-600 dark:text-slate-400">Train with the best. Our certified experts are here to guide you every step of the way.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { name: "Alex Roy", role: "Strength Coach", image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=800&auto=format&fit=crop&q=60" },
                            { name: "Sarah Lee", role: "Yoga Instructor", image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&q=60" },
                            { name: "Mike Chen", role: "HIIT Specialist", image: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=800&auto=format&fit=crop&q=60" }
                        ].map((trainer, i) => (
                            <div key={i} className="group relative overflow-hidden rounded-3xl h-96">
                                <img src={trainer.image} alt={trainer.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                                    <h3 className="text-white text-2xl font-bold font-display">{trainer.name}</h3>
                                    <p className="text-brand-orange font-medium">{trainer.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Membership Section */}
            <section id="plans" className="py-24 px-6 bg-slate-50 dark:bg-slate-900/50">
                <div className="container mx-auto">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="font-display text-4xl font-bold mb-4 dark:text-white text-slate-900">Membership Plans</h2>
                        <p className="text-slate-600 dark:text-slate-400">Choose the perfect plan for your fitness journey. No hidden fees.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { name: "Basic", price: "Rs 2500", features: ["Access to Gym Floor", "Locker Access", "1 Free Training Session"] },
                            { name: "Premium", price: "Rs 4500", featured: true, features: ["All Basic Features", "Unlimited Classes", "Nutritional Guidance", "Sauna Access"] },
                            { name: "Elite", price: "Rs 8000", features: ["All Premium Features", "Personal Trainer (4x/mo)", "Guest Passes", "Priority Booking"] }
                        ].map((plan, i) => (
                            <div key={i} className={cn(
                                "relative p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-2",
                                plan.featured
                                    ? "bg-brand-orange text-white border-brand-orange shadow-2xl shadow-brand-orange/20 scale-105 z-10"
                                    : "glass-adaptive hover:border-brand-orange/50"
                            )}>
                                {plan.featured && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-brand-orange text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Most Popular</div>}
                                <h3 className={cn("text-xl font-bold mb-2", plan.featured ? "text-white" : "text-slate-900 dark:text-white")}>{plan.name}</h3>
                                <div className="flex items-baseline gap-1 mb-6">
                                    <span className={cn("text-4xl font-display font-bold", plan.featured ? "text-white" : "text-slate-900 dark:text-white")}>{plan.price}</span>
                                    <span className={cn("text-sm", plan.featured ? "text-white/80" : "text-slate-500 dark:text-slate-400")}>/month</span>
                                </div>
                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((feature, f) => (
                                        <li key={f} className="flex items-center gap-3 text-sm">
                                            <div className={cn("w-5 h-5 rounded-full flex items-center justify-center shrink-0", plan.featured ? "bg-white/20 text-white" : "bg-brand-orange/10 text-brand-orange")}>
                                                <div className="w-1.5 h-1.5 rounded-full bg-current" />
                                            </div>
                                            <span className={plan.featured ? "text-white/90" : "text-slate-600 dark:text-slate-300"}>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Button className={cn("w-full h-12 rounded-xl font-bold transition-transform hover:scale-105", plan.featured ? "bg-white text-brand-orange hover:bg-slate-100" : "bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-brand-orange dark:hover:bg-brand-orange hover:text-white dark:hover:text-white")}>
                                    Choose Plan
                                </Button>
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
                        <span className="text-slate-600 dark:text-slate-400 text-3xl md:text-4xl font-normal">Don't Wish For It</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
                            WORK FOR IT
                        </span>
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto mb-12">
                        The only bad workout is the one that didn't happen.
                        Join our community of doers, dreamers, and achievers.
                    </p>
                    <Button className="h-16 px-12 text-xl bg-slate-900 text-white dark:bg-white dark:text-black hover:bg-brand-blue hover:text-white rounded-full font-bold shadow-2xl shadow-slate-900/10 dark:shadow-white/10 transition-all hover:scale-105">
                        Join The Club
                    </Button>
                </div>
            </section>

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
        </div>
    );
};

export default HomePage;
