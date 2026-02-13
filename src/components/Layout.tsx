import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { MapPin, User, Clock, Menu, X, Facebook, Instagram, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Layout = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
                    <Link to="/" className="font-display font-bold text-2xl tracking-tighter">
                        SHANK<span className="text-brand-orange">MUL</span>
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

                    <div className="hidden md:flex items-center gap-4">
                        <Link to="/download">
                            <Button className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 hover:from-green-500 hover:to-purple-600 text-white rounded-full px-6 shadow-lg flex items-center gap-2 transition-all duration-200">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3.6 2.6c-.4.4-.6.9-.6 1.4v15.9c0 .5.2 1 .6 1.4.6.6 1.5.7 2.2.3l13.2-7.9c.7-.4.7-1.4 0-1.8L5.8 2.6c-.7-.4-1.6-.3-2.2.3zm1.4 1.4l13.2 7.9-13.2 7.9V4z" fill="currentColor" /></svg>
                                Download App
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-4">
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-900">
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMobileMenuOpen && (
                    <div className="absolute top-24 left-6 right-6 bg-white border border-slate-200 shadow-2xl rounded-3xl p-6 flex flex-col space-y-4 md:hidden animate-in fade-in slide-in-from-top-4">
                        <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium hover:text-brand-orange">Home</Link>
                        <Link to="/#about" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium hover:text-brand-orange">About</Link>
                        <Link to="/#services" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium hover:text-brand-orange">Services</Link>
                        <Link to="/#nutrition" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium hover:text-brand-orange">Nutrition</Link>
                        <Link to="/#schedule" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium hover:text-brand-orange">Schedule</Link>
                        <Link to="/#gallery" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium hover:text-brand-orange">Gallery</Link>
                        <Link to="/#workouts" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium hover:text-brand-orange">Workouts</Link>
                        <Link to="/#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium hover:text-brand-orange">Contact</Link>
                        <Link to="/download" onClick={() => setIsMobileMenuOpen(false)}>
                            <Button className="w-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 hover:from-green-500 hover:to-purple-600 text-white rounded-xl flex items-center gap-2 shadow-lg transition-all duration-200">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3.6 2.6c-.4.4-.6.9-.6 1.4v15.9c0 .5.2 1 .6 1.4.6.6 1.5.7 2.2.3l13.2-7.9c.7-.4.7-1.4 0-1.8L5.8 2.6c-.7-.4-1.6-.3-2.2.3zm1.4 1.4l13.2 7.9-13.2 7.9V4z" fill="currentColor" /></svg>
                                Download App
                            </Button>
                        </Link>
                    </div>
                )}
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
                            <Link to="/" className="font-display font-bold text-3xl tracking-tighter mb-6 block">
                                SHANK<span className="text-brand-orange">MUL</span>
                            </Link>
                            <p className="text-slate-600 max-w-md mb-8">
                                Premium fitness destination in the heart of Kathmandu.
                                State-of-the-art equipment, expert trainers, and a supportive community to help you reach your goals.
                            </p>
                            <div className="flex gap-4">
                                {[
                                    { name: 'Facebook', icon: Facebook },
                                    {
                                        name: 'TikTok',
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
                                    { name: 'Instagram', icon: Instagram }
                                ].map((social) => (
                                    <a key={social.name} href="#" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-brand-orange hover:text-white transition-colors border border-slate-200">
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
                                    <span>+977 1234567890</span>
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
                        <p>© 2024 Shankhamul Health Club. All rights reserved.</p>
                        <div className="flex gap-8">
                            <a href="#" className="hover:text-brand-orange transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-brand-orange transition-colors">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
