import { MapPin, Clock, Activity, Zap, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

const WhatsAppIcon = ({ size = 18, className }: { size?: number, className?: string }) => (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
);

const TikTokIcon = ({ size = 20, className }: { size?: number, className?: string }) => (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
        <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.617a8.171 8.171 0 0 0 5.407 1.488V6.686z" />
    </svg>
);

const HeroSection = () => {
    return (
        <>
            <section className="relative min-h-screen flex items-center pt-28 sm:pt-32 pb-16 overflow-hidden bg-white">
                {/* Background Orbs — hidden on small screens for perf */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-brand-blue/5 rounded-full blur-[80px] sm:blur-[100px] animate-pulse" />
                    <div className="absolute bottom-20 right-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-brand-orange/5 rounded-full blur-[80px] sm:blur-[100px] animate-float" />
                </div>

                <div className="container mx-auto px-4 sm:px-6 relative z-10">
                    {/* Mobile-first: single col → 2-col on lg */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">

                        {/* LEFT: Text Content */}
                        <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="flex justify-center lg:justify-start"
                            >
                                <Badge variant="secondary" className="btn-primary border border-brand-orange/20 py-3 px-5 rounded-full flex items-center gap-2 shadow-[0_0_20px_rgba(255,69,0,0.25)] text-xs sm:text-sm">
                                    <Zap size={14} fill="currentColor" className="animate-pulse" />
                                    <span>#1 Fitness Destination in Kathmandu</span>
                                </Badge>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="font-display text-[2.75rem] leading-[1.1] md:leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 text-glow"
                            >
                                Forge Your <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-brand-blue to-brand-orange bg-[length:200%_auto] animate-gradient-x">
                                    Ultimate Body
                                </span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed"
                            >
                                World-class equipment, expert trainers, and a community that pushes you further.
                                Join Shankhamul Health Club today.
                            </motion.p>

                            {/* CTAs */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
                            >
                                <motion.a
                                    href="https://wa.me/9779743223799"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="w-full sm:w-auto overflow-hidden rounded-full"
                                >
                                    <Button className="bg-[#25D366] hover:bg-[#1DA851] text-white border-transparent h-14 px-8 font-bold text-lg rounded-full flex items-center justify-center gap-3 w-full sm:w-auto shadow-xl shadow-[#25D366]/20 transition-all duration-300">
                                        <WhatsAppIcon size={24} />
                                        Join Now
                                    </Button>
                                </motion.a>

                                {/* Social Icon Row */}
                                <div className="flex items-center gap-3">
                                    <motion.a href="https://wa.me/9779743223799" target="_blank" whileHover={{ y: -4 }} aria-label="WhatsApp">
                                        <Button variant="outline" size="icon" className="rounded-full w-12 h-12 border-slate-200 text-emerald-500 hover:text-emerald-600 hover:bg-emerald-50">
                                            <WhatsAppIcon size={20} />
                                        </Button>
                                    </motion.a>
                                    <motion.a href="https://www.tiktok.com/@shankhamul_health_club" target="_blank" whileHover={{ y: -4 }} aria-label="TikTok">
                                        <Button variant="outline" size="icon" className="rounded-full w-12 h-12 border-slate-200 text-slate-900 hover:bg-slate-50">
                                            <TikTokIcon size={20} />
                                        </Button>
                                    </motion.a>
                                    <motion.a href="https://www.facebook.com/profile.php?id=61557900626377" target="_blank" whileHover={{ y: -4 }} aria-label="Facebook">
                                        <Button variant="outline" size="icon" className="rounded-full w-12 h-12 border-slate-200 text-blue-600 hover:bg-blue-50">
                                            <Facebook size={20} fill="currentColor" />
                                        </Button>
                                    </motion.a>
                                </div>
                            </motion.div>

                            {/* Info Cards */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                                className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-4"
                            >
                                <div className="bg-white border border-slate-100 p-4 sm:p-5 rounded-2xl flex items-start gap-3 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center shrink-0">
                                        <MapPin className="text-brand-orange" size={18} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold font-display text-slate-900 text-sm sm:text-base">Location</h3>
                                        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Shankhamul, Kathmandu</p>
                                    </div>
                                </div>
                                <div className="bg-white border border-slate-100 p-4 sm:p-5 rounded-2xl flex items-start gap-3 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center shrink-0">
                                        <Clock className="text-brand-blue" size={18} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold font-display text-slate-900 text-sm sm:text-base">Hours</h3>
                                        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Sun–Fri: 5am–9pm</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* RIGHT: Hero Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, x: 20 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="relative h-[350px] sm:h-[450px] lg:h-[600px] w-full mt-4 lg:mt-0"
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/60 z-20 rounded-2xl sm:rounded-3xl pointer-events-none" />
                            <img
                                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop"
                                alt="Shankhamul Gym Interior"
                                className="w-full h-full object-cover rounded-2xl sm:rounded-3xl shadow-2xl"
                            />
                            {/* Floating Stat — hidden on very small screens */}
                            <div className="absolute top-4 sm:top-20 left-3 sm:-left-10 bg-white border border-slate-100 px-3 py-2 sm:p-4 rounded-xl sm:rounded-2xl animate-float z-30 flex items-center gap-2 sm:gap-3 shadow-xl">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 shrink-0">
                                    <Activity size={16} />
                                </div>
                                <div>
                                    <p className="text-[10px] sm:text-xs text-slate-500">Calories Burned</p>
                                    <p className="font-bold font-display text-slate-900 text-sm sm:text-base">500+ kcal/hr</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HeroSection;
