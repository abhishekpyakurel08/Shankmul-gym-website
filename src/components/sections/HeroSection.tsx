import { MapPin, Clock, Activity, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const WhatsAppIcon = ({ size = 18, className }: { size?: number, className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill="currentColor"
        className={className}
    >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
);

const HeroSection = () => {
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

                        <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.1] text-slate-900">
                            Forge Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-blue">
                                Ultimate Body
                            </span>
                        </h1>

                        <p className="text-slate-600 text-lg max-w-xl leading-relaxed">
                            Experience world-class equipment, expert trainers, and a community that pushes you further.
                            Join Shankhamul Health Club & Fitness Centre today.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <motion.a
                                href="https://wa.me/9779743223799"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button className="h-14 px-8 text-lg bg-slate-900 text-white hover:bg-[#25D366] rounded-full font-bold transition-all shadow-xl shadow-slate-900/10 flex items-center gap-3">
                                    <WhatsAppIcon size={24} />
                                    Join Now
                                </Button>
                            </motion.a>
                        </div>

                        {/* Info Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
                            <div className="bg-white border border-slate-100 p-6 rounded-2xl flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center shrink-0">
                                    <MapPin className="text-brand-orange" size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold font-display text-slate-900">Location</h3>
                                    <p className="text-sm text-slate-500 mt-1">Shankhamul, Kathmandu<br />Nepal</p>
                                </div>
                            </div>
                            <div className="bg-white border border-slate-100 p-6 rounded-2xl flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center shrink-0">
                                    <Clock className="text-brand-blue" size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold font-display text-slate-900">Opening Hours</h3>
                                    <p className="text-sm text-slate-500 mt-1">Sun - Fri: 5am - 9pm<br />Sat: 6am - 12pm</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative h-[400px] lg:h-[600px] mt-12 lg:mt-0">
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

        </>
    );
};

export default HeroSection;
