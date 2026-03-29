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
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [activeSection, setActiveSection] = useState('Home');
    const { pathname, hash } = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
            setShowBackToTop(window.scrollY > 500);

            // ScrollSpy Logic
            const sections = ['about', 'nutrition', 'trainers', 'schedule', 'gallery', 'contact'];
            const scrollPos = window.scrollY + (window.innerHeight / 3);

            if (window.scrollY < 300) {
                setActiveSection('Home');
                return;
            }

            let currentSection = activeSection;
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
                        currentSection = section.charAt(0).toUpperCase() + section.slice(1);
                        break;
                    }
                }
            }

            // Special cases for mapped names if needed
            if (currentSection === 'Trainers') currentSection = 'About'; // If Trainers is part of About flow

            setActiveSection(currentSection);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (path: string, name: string) => {
        if (pathname !== '/') return false;
        if (path === '/' && activeSection === 'Home') return true;
        return activeSection === name;
    };

    // Ensure dark mode is removed on mount
    useEffect(() => {
        document.documentElement.classList.remove('dark');
    }, []);

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

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/#about' },
        { name: 'Gallery', path: '/#gallery' },
        { name: 'Nutrition', path: '/#nutrition' },
        { name: 'Schedule', path: '/#schedule' },
        { name: 'Contact', path: '/#contact' },
    ];

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-brand-orange selection:text-white flex flex-col">
            {/* Header / Navigation */}
            <nav
                className={`fixed w-full z-50 top-0 left-0 px-4 md:px-6 transition-all duration-300 ${isScrolled ? 'py-3' : 'py-5'}`}
            >
                <div
                    className={`max-w-7xl mx-auto border transition-all duration-300 rounded-[2rem] px-4 md:px-6 py-3 flex justify-between items-center ${isScrolled
                        ? 'bg-white/95 backdrop-blur-xl border-slate-200 shadow-xl'
                        : 'bg-white/70 backdrop-blur-md border-white/20 shadow-lg'
                        }`}
                >
                    <Link to="/" className="flex items-center gap-2 md:gap-3 group">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-xl flex items-center justify-center overflow-hidden border border-slate-100 group-hover:scale-105 transition-transform duration-300">
                            <img src="/shankhamul-logo.jpg" alt="Logo" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col leading-none">
                            <span className="font-display font-bold text-sm md:text-lg tracking-tight text-slate-900">
                                SHANKHAMUL
                            </span>
                            <span className="text-[7px] md:text-[8px] font-black uppercase tracking-[0.2em] text-brand-orange mt-0.5">
                                Health Club & Fitness Centre
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-1 text-[11px] font-bold uppercase tracking-widest">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`relative px-4 py-2 group overflow-hidden transition-colors rounded-full ${isActive(link.path, link.name) ? 'text-brand-orange bg-brand-orange/5' : 'text-slate-600 hover:text-brand-orange'
                                    }`}
                            >
                                <span className="relative z-10 transition-colors">{link.name}</span>
                                <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-brand-orange rounded-full transition-all duration-300 ${isActive(link.path, link.name) ? 'opacity-100' : 'opacity-0 scale-0 group-hover:opacity-40 group-hover:scale-100'
                                    }`} />
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        <motion.a
                            href="https://wa.me/9779743223799"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Button className="bg-slate-900 hover:bg-[#25D366] text-white rounded-full px-6 shadow-lg shadow-slate-900/10 flex items-center gap-2 transition-all font-bold h-12">
                                <WhatsAppIcon size={18} />
                                Join Now
                            </Button>
                        </motion.a>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-4">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className={`p-2 rounded-xl transition-colors ${isMobileMenuOpen ? 'bg-brand-orange/10 text-brand-orange' : 'text-slate-900 hover:bg-slate-100'}`}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-[calc(100%+12px)] left-4 right-4 bg-white/95 backdrop-blur-2xl border border-slate-200 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] rounded-3xl p-6 flex flex-col md:hidden z-40 overflow-hidden"
                        >
                            <div className="flex flex-col space-y-1 mb-6">
                                {navLinks.map((link, idx) => {
                                    const Icon = [Home, User, Dumbbell, Calendar, Mail, Phone][idx] || Home;
                                    const active = isActive(link.path, link.name);
                                    return (
                                        <Link
                                            key={link.name}
                                            to={link.path}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={`text-lg font-bold flex items-center gap-4 py-3 px-3 rounded-2xl transition-all group ${active
                                                ? 'bg-brand-orange/5 text-brand-orange'
                                                : 'text-slate-700 hover:bg-slate-50'
                                                }`}
                                        >
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${active ? 'bg-brand-orange text-white shadow-md shadow-brand-orange/30' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200 group-hover:text-slate-600'
                                                }`}>
                                                <Icon size={20} />
                                            </div>
                                            {link.name}
                                        </Link>
                                    );
                                })}
                            </div>

                            <motion.a
                                href="https://wa.me/9779743223799"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileTap={{ scale: 0.97 }}
                                className="w-full"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <Button className="w-full h-14 bg-[#25D366] hover:bg-[#1DA851] text-white rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-[#25D366]/30 transition-all font-bold text-lg border-none">
                                    <WhatsAppIcon size={22} />
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
                                    <a
                                        href="https://www.google.com/maps/place/Shankhamul+Health+Club+And+Fitness+Centre/@27.6841094,85.3308253,17z/data=!3m1!4b1!4m6!3m5!1s0x39eb19bfc1c849bd:0x8155f42b16996f5b!8m2!3d27.6841094!4d85.3334002!16s%2Fg%2F11hbg9jjdk?entry=ttu&g_ep=EgoyMDI2MDMyNC4wIKXMDSoASAFQAw%3D%3D"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-brand-orange transition-colors"
                                    >
                                        Shankhamul, Kathmandu<br />Nepal
                                    </a>
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

        </div>
    );
};

export default Layout;
