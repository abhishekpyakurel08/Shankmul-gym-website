import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, MapPin, Clock, Activity, Zap, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    return (
        <>
            <section className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-white">
                {/* Animated Background Orbs */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[100px] animate-pulse" />
                    <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[100px] animate-float decoration-delay-1000" />
                </div>

                <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-orange/10 text-brand-orange text-sm font-bold animate-fade-in-up border border-brand-orange/20">
                            <Zap size={16} fill="currentColor" />
                            <span>#1 Fitness Destination in Kathmandu</span>
                        </div>

                        <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight text-slate-900">
                            Forge Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-blue">
                                Ultimate Body
                            </span>
                        </h1>

                        <p className="text-slate-600 text-lg max-w-xl leading-relaxed">
                            Experience world-class equipment, expert trainers, and a community that pushes you further.
                            Join Shankhamul Health Club today.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Link to="/#membership">
                                <Button className="h-14 px-8 text-lg bg-slate-900 text-white hover:bg-brand-orange rounded-full font-bold transition-all hover:scale-105 shadow-xl shadow-slate-900/10">
                                    Start Free Trial
                                </Button>
                            </Link>
                            <button
                                onClick={() => setIsVideoOpen(true)}
                                className="h-14 px-8 rounded-full bg-white border border-slate-200 text-slate-900 hover:bg-slate-50 flex items-center gap-3 transition-colors group shadow-sm"
                            >
                                <div className="w-8 h-8 rounded-full bg-brand-orange flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Play size={14} fill="white" className="ml-1" />
                                </div>
                                <span>Watch Video</span>
                            </button>
                        </div>

                        {/* Info Cards */}
                        <div className="grid grid-cols-2 gap-4 mt-12">
                            <div className="bg-white border border-slate-100 p-4 rounded-2xl flex items-start gap-3 shadow-sm hover:shadow-md transition-shadow">
                                <MapPin className="text-brand-orange shrink-0" />
                                <div>
                                    <h3 className="font-bold font-display text-slate-900">Location</h3>
                                    <p className="text-xs text-slate-500 mt-1">Shankhamul, Kathmandu<br />Nepal</p>
                                </div>
                            </div>
                            <div className="bg-white border border-slate-100 p-4 rounded-2xl flex items-start gap-3 shadow-sm hover:shadow-md transition-shadow">
                                <Clock className="text-brand-blue shrink-0" />
                                <div>
                                    <h3 className="font-bold font-display text-slate-900">Opening Hours</h3>
                                    <p className="text-xs text-slate-500 mt-1">Sun - Fri: 5am - 9pm<br />Sat: 6am - 12pm</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative hidden lg:block h-[600px]">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/80 z-20 rounded-3xl" />
                        <img
                            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop"
                            alt="Fitness Trainer"
                            className="w-full h-full object-cover rounded-3xl shadow-2xl"
                        />

                        {/* Floating Quick Stats */}
                        <div className="absolute top-20 -left-10 bg-white border border-slate-100 p-4 rounded-2xl animate-float z-30 flex items-center gap-3 shadow-xl">
                            <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                                <Activity size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500">Calories Burned</p>
                                <p className="font-bold font-display text-slate-900">500+ kcal/hr</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Video Modal */}
            {isVideoOpen && (
                <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="relative w-full max-w-5xl">
                        <button
                            onClick={() => setIsVideoOpen(false)}
                            className="absolute -top-12 right-0 text-white hover:text-brand-orange transition-colors"
                        >
                            <X size={32} />
                        </button>
                        <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/20">
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
                </div>
            )}
        </>
    );
};

export default HeroSection;
