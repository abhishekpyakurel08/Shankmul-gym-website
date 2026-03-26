import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { MapPin, User, Clock, Menu, X, Facebook, Instagram, Mail, ChevronUp, Home, Dumbbell, Calendar, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

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

const Layout = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showBackToTop, setShowBackToTop] = useState(false);

    // Watch scroll position for Back to Top button
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 1000) {
                setShowBackToTop(true);
            } else {
                setShowBackToTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Ensure dark mode is removed on mount
    useEffect(() => {
        document.documentElement.classList.remove('dark');
    }, []);

    const { pathname, hash } = useLocation();

    // Handle scroll to hash on route change
    useEffect(() => {
        if (hash) {
            const element = document.getElementById(hash.substring(1));
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        } else {
            window.scrollTo(0, 0);
        }
    }, [pathname, hash]);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-brand-orange selection:text-white flex flex-col pb-24 md:pb-0">
            {/* Navigation */}
            <nav className="fixed w-full z-50 top-0 left-0 px-6 py-4">
                <div className="max-w-7xl mx-auto bg-white/80 backdrop-blur-md border border-slate-200 rounded-full px-6 py-3 flex justify-between items-center shadow-lg">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center overflow-hidden border border-slate-100 group-hover:scale-105 transition-transform">
                            <img src="/shankhamul-logo.jpg" alt="Logo" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col leading-none">
                            <span className="font-display font-bold text-lg tracking-tight text-slate-900">
                                SHANKHAMUL
                            </span>
                            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-brand-orange">
                                Health Club & Fitness Centre
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8 text-sm font-bold uppercase tracking-widest text-slate-500">
                        <Link to="/" className="relative py-2 group overflow-hidden">
                            <span className="group-hover:text-brand-orange transition-colors duration-300">Home</span>
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-orange transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                        </Link>
                        <Link to="/#about" className="relative py-2 group overflow-hidden">
                            <span className="group-hover:text-brand-orange transition-colors duration-300">About</span>
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-orange transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                        </Link>
                        <Link to="/#services" className="relative py-2 group overflow-hidden">
                            <span className="group-hover:text-brand-orange transition-colors duration-300">Services</span>
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-orange transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                        </Link>
                        <Link to="/#schedule" className="relative py-2 group overflow-hidden">
                            <span className="group-hover:text-brand-orange transition-colors duration-300">Schedule</span>
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-orange transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                        </Link>
                        <Link to="/#gallery" className="relative py-2 group overflow-hidden">
                            <span className="group-hover:text-brand-orange transition-colors duration-300">Gallery</span>
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-orange transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                        </Link>
                        <Link to="/#contact" className="relative py-2 group overflow-hidden">
                            <span className="group-hover:text-brand-orange transition-colors duration-300">Contact</span>
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-orange transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                        </Link>
                    </div>

                    {/* Desktop Join Button */}
                    <div className="hidden md:flex items-center gap-4">
                        <motion.a
                            href="https://wa.me/9779743223799"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button className="bg-slate-900 hover:bg-[#25D366] text-white rounded-full px-6 shadow-lg shadow-slate-900/10 flex items-center gap-2 transition-all duration-300 font-bold">
                                <WhatsAppIcon size={18} />
                                Join Now
                            </Button>
                        </motion.a>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-4">
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-900">
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute top-24 left-6 right-6 bg-white border border-slate-200 shadow-2xl rounded-3xl p-8 flex flex-col space-y-6 md:hidden z-40"
                        >
                            <div className="flex flex-col space-y-6">
                                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-slate-900 flex items-center gap-4 group">
                                    <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-all">
                                        <Home size={20} />
                                    </div>
                                    Home
                                </Link>
                                <Link to="/#about" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-slate-900 flex items-center gap-4 group">
                                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-brand-orange group-hover:text-white transition-all">
                                        <User size={20} />
                                    </div>
                                    About
                                </Link>
                                <Link to="/#services" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-slate-900 flex items-center gap-4 group">
                                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-brand-orange group-hover:text-white transition-all">
                                        <Dumbbell size={20} />
                                    </div>
                                    Services
                                </Link>
                                <Link to="/#schedule" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-slate-900 flex items-center gap-4 group">
                                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-brand-orange group-hover:text-white transition-all">
                                        <Calendar size={20} />
                                    </div>
                                    Schedule
                                </Link>
                                <Link to="/#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-slate-900 flex items-center gap-4 group">
                                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-brand-orange group-hover:text-white transition-all">
                                        <Phone size={20} />
                                    </div>
                                    Contact
                                </Link>
                            </div>

                            <motion.a
                                href="https://wa.me/9779743223799"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileTap={{ scale: 0.95 }}
                                className="w-full mt-4"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <Button className="w-full h-16 bg-slate-900 hover:bg-[#25D366] text-white rounded-2xl flex items-center justify-center gap-3 shadow-xl transition-all duration-300 font-bold text-xl">
                                    <WhatsAppIcon size={24} />
                                    Join Now
                                </Button>
                            </motion.a>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Main Content */}
            <main className="flex-grow">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-slate-200 pt-20 pb-10 px-6 mt-auto">
                <div className="container mx-auto">
                    <div className="grid md:grid-cols-4 gap-12 mb-16">
                        <div className="col-span-1 md:col-span-2">
                            <Link to="/" className="flex items-center gap-3 mb-6 group">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center overflow-hidden border border-slate-100 group-hover:scale-105 transition-transform">
                                    <img src="/shankhamul-logo.jpg" alt="Logo" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex flex-col leading-none">
                                    <span className="font-display font-bold text-2xl tracking-tight text-slate-900">
                                        SHANKHAMUL
                                    </span>
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-orange mt-1">
                                        Health Club & Fitness Centre
                                    </span>
                                </div>
                            </Link>
                            <p className="text-slate-600 max-w-md mb-8">
                                Premium fitness destination in the heart of Kathmandu.
                                State-of-the-art equipment, expert trainers, and a supportive community to help you reach your goals.
                            </p>
                            <div className="flex gap-4">
                                {[
                                    {
                                        name: 'Facebook',
                                        icon: Facebook,
                                        url: 'https://www.facebook.com/profile.php?id=61557900626377'
                                    },
                                    {
                                        name: 'TikTok',
                                        url: 'https://www.tiktok.com/@shankhamul_health_club?fbclid=IwY2xjawQAPU5leHRuA2FlbQIxMABicmlkETI3M2U1bUIwVkxSa2Y0R2xqc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHrk64ahj4zt0ZbzLAzhs1gwtCbATTEzQKYWr61v3H9yhReyP43vvgJtGJ7Er_aem_HcDf1OI_tVqWP45BR8XLiQ',
                                        icon: ({ size = 18, className }: { size?: number, className?: string }) => (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={size}
                                                height={size}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className={className}
                                            >
                                                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                                            </svg>
                                        )
                                    },
                                    {
                                        name: 'Instagram', icon: Instagram, url: '#'
                                    },
                                    {
                                        name: 'WhatsApp',
                                        icon: WhatsAppIcon,
                                        url: 'https://wa.me/9779743223799'
                                    }
                                ].map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-brand-orange hover:text-white transition-colors border border-slate-200"
                                    >
                                        <span className="sr-only">{social.name}</span>
                                        <social.icon size={18} />
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold font-display text-lg mb-6">Quick Links</h4>
                            <ul className="space-y-4 text-slate-600">
                                <li><Link to="/#about" className="hover:text-brand-orange transition-colors">About Us</Link></li>
                                <li><Link to="/#schedule" className="hover:text-brand-orange transition-colors">Class Schedule</Link></li>
                                <li><Link to="/#workouts" className="hover:text-brand-orange transition-colors">Workouts Guide</Link></li>
                                <li><Link to="/#trainers" className="hover:text-brand-orange transition-colors">Trainers</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold font-display text-lg mb-6">Contact Info</h4>
                            <ul className="space-y-4 text-slate-600">
                                <li className="flex items-start gap-3">
                                    <MapPin size={20} className="text-brand-orange shrink-0 mt-1" />
                                    <span>Shankhamul, Kathmandu<br />Nepal</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <User size={20} className="text-brand-orange shrink-0" />
                                    <span>01-4793718</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Clock size={20} className="text-brand-orange shrink-0" />
                                    <span>Sun - Fri: 5am - 9pm</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Mail size={20} className="text-brand-orange shrink-0" />
                                    <a href="mailto:info@shankhamulgym.com" className="hover:text-brand-orange transition-colors">info@shankhamulgym.com</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
                        <p>© 2024 Shankhamul Health Club & Fitness Centre. All rights reserved.</p>
                        <div className="flex gap-8">
                            <a href="#" className="hover:text-brand-orange transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-brand-orange transition-colors">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Back to Top Button */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className={`fixed bottom-24 md:bottom-8 right-6 md:right-8 z-50 p-4 rounded-2xl bg-white border border-slate-200 shadow-2xl text-slate-900 transition-all duration-300 hover:bg-brand-orange hover:text-white hover:-translate-y-2 ${showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none'
                    }`}
                aria-label="Back to Top"
            >
                <ChevronUp size={24} />
            </button>

            {/* Floating WhatsApp Button */}
            <motion.a
                href="https://wa.me/9779743223799"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-44 md:bottom-28 right-6 md:right-8 z-50 p-4 rounded-full bg-[#25D366] text-white shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <WhatsAppIcon size={24} />
            </motion.a>

            {/* Mobile Bottom Navigation */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-[60] px-6 pb-6 pt-2">
                <div className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-[2rem] flex justify-around items-center py-4 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] px-2">
                    <Link to="/" className="flex flex-col items-center gap-1.5 text-slate-400 hover:text-brand-orange transition-all active:scale-90">
                        <Home size={22} className={pathname === '/' && !hash ? 'text-brand-orange' : ''} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Home</span>
                    </Link>
                    <Link to="/#services" className="flex flex-col items-center gap-1.5 text-slate-400 hover:text-brand-orange transition-all active:scale-90">
                        <Dumbbell size={22} className={hash === '#services' ? 'text-brand-orange' : ''} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Services</span>
                    </Link>
                    <Link to="/#schedule" className="flex flex-col items-center gap-1.5 text-slate-400 hover:text-brand-orange transition-all active:scale-90">
                        <Calendar size={22} className={hash === '#schedule' ? 'text-brand-orange' : ''} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Schedule</span>
                    </Link>
                    <Link to="/#contact" className="flex flex-col items-center gap-1.5 text-slate-400 hover:text-brand-orange transition-all active:scale-90">
                        <Phone size={22} className={hash === '#contact' ? 'text-brand-orange' : ''} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Contact</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Layout;
