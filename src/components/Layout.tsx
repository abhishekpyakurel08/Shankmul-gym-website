import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { MapPin, User, Clock, Menu, X, Facebook, Instagram, Mail, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
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
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-brand-orange selection:text-white flex flex-col">
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
                    <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-600">
                        <Link to="/" className="hover:text-brand-orange transition-colors">Home</Link>
                        <Link to="/#about" className="hover:text-brand-orange transition-colors">About</Link>
                        <Link to="/#services" className="hover:text-brand-orange transition-colors">Services</Link>
                        <Link to="/#nutrition" className="hover:text-brand-orange transition-colors">Nutrition</Link>
                        <Link to="/#schedule" className="hover:text-brand-orange transition-colors">Schedule</Link>
                        <Link to="/#gallery" className="hover:text-brand-orange transition-colors">Gallery</Link>
                        <Link to="/#workouts" className="hover:text-brand-orange transition-colors">Workouts</Link>
                        <Link to="/#contact" className="hover:text-brand-orange transition-colors">Contact</Link>
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
                            <Button className="bg-slate-900 hover:bg-brand-orange text-white rounded-full px-6 shadow-lg shadow-slate-900/10 flex items-center gap-2 transition-all duration-300 font-bold">
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
                            <div className="flex flex-col space-y-4">
                                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold text-slate-900 border-b border-slate-50 pb-2">Home</Link>
                                <Link to="/#about" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold text-slate-900 border-b border-slate-50 pb-2">About</Link>
                                <Link to="/#services" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold text-slate-900 border-b border-slate-50 pb-2">Services</Link>
                                <Link to="/#nutrition" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold text-slate-900 border-b border-slate-50 pb-2">Nutrition</Link>
                                <Link to="/#schedule" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold text-slate-900 border-b border-slate-50 pb-2">Schedule</Link>
                                <Link to="/#gallery" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold text-slate-900 border-b border-slate-50 pb-2">Gallery</Link>
                                <Link to="/#workouts" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold text-slate-900 border-b border-slate-50 pb-2">Workouts</Link>
                                <Link to="/#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold text-slate-900 border-b border-slate-50 pb-2">Contact</Link>
                            </div>

                            <motion.a
                                href="https://wa.me/9743223799"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileTap={{ scale: 0.95 }}
                                className="w-full mt-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <Button className="w-full h-14 bg-slate-900 hover:bg-brand-orange text-white rounded-2xl flex items-center justify-center gap-3 shadow-xl transition-all duration-300 font-bold text-lg">
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
                                    { name: 'Instagram', icon: Instagram, url: '#' }
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
                className={`fixed bottom-8 right-8 z-50 p-4 rounded-2xl bg-white border border-slate-200 shadow-2xl text-slate-900 transition-all duration-300 hover:bg-brand-orange hover:text-white hover:-translate-y-2 ${showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none'
                    }`}
                aria-label="Back to Top"
            >
                <ChevronUp size={24} />
            </button>
        </div>
    );
};

export default Layout;
