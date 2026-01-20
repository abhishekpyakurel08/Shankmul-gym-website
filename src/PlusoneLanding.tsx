import { useState, useEffect } from 'react';
import { Menu, X, Play, Star, ArrowRight, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PlusoneLanding = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDark, setIsDark] = useState(true);
    const [scrolled, setScrolled] = useState(false);
    const [activeTab, setActiveTab] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleTheme = () => setIsDark(!isDark);

    const navItems = [
        { id: 'home', label: 'Home' },
        { id: 'classes', label: 'Classes' },
        { id: 'pricing', label: 'Pricing' },
        { id: 'about', label: 'About' },
    ];

    const programs = [
        {
            id: 1,
            title: 'Morning Time',
            image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop',
            rating: 4.8,
        },
        {
            id: 2,
            title: 'Gym Classes',
            image: 'https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?w=400&h=400&fit=crop',
            rating: 4.9,
        },
        {
            id: 3,
            title: 'Cardio Training',
            image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=400&fit=crop',
            rating: 4.7,
        },
    ];

    const testimonials = [
        {
            id: 1,
            name: 'Sarah Johnson',
            rating: 5,
            text: 'Best fitness program I have ever tried. Results in just 2 weeks!',
            avatar: '👩‍🦰',
        },
        {
            id: 2,
            name: 'Mike Chen',
            rating: 5,
            text: 'Professional trainers and amazing community support. Highly recommended!',
            avatar: '👨‍💼',
        },
        {
            id: 3,
            name: 'Emma Davis',
            rating: 5,
            text: 'Life-changing experience. The flexibility is unmatched for my busy schedule.',
            avatar: '👩‍🎨',
        },
    ];

    const bgClass = isDark ? 'bg-slate-950 text-white' : 'bg-white text-slate-900';
    const cardBgClass = isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200';

    return (
        <div className={`min-h-screen ${bgClass} transition-colors duration-300`}>
            {/* Navigation */}
            <nav
                className={`fixed w-full z-50 transition-all duration-300 ${scrolled
                    ? isDark
                        ? 'bg-slate-950/95 backdrop-blur-lg border-b border-slate-800'
                        : 'bg-white/95 backdrop-blur-lg border-b border-slate-200'
                    : 'bg-transparent'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex items-center space-x-2 cursor-pointer group">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-400 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">P</span>
                            </div>
                            <span className="font-bold text-xl hidden sm:inline">PLUSONE</span>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-8">
                            {navItems.map((item) => (
                                <a
                                    key={item.id}
                                    href={`#${item.id}`}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`text-sm font-medium transition-colors hover:text-blue-500 ${activeTab === item.id
                                        ? 'text-blue-500'
                                        : isDark
                                            ? 'text-slate-300'
                                            : 'text-slate-600'
                                        }`}
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>

                        {/* Right Actions */}
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={toggleTheme}
                                className={`p-2 rounded-lg transition-colors ${isDark
                                    ? 'bg-slate-800 hover:bg-slate-700'
                                    : 'bg-slate-100 hover:bg-slate-200'
                                    }`}
                            >
                                {isDark ? (
                                    <Sun size={20} className="text-yellow-400" />
                                ) : (
                                    <Moon size={20} className="text-slate-600" />
                                )}
                            </button>

                            <Button className="hidden sm:block bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-lg px-6">
                                Sign Up
                            </Button>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="md:hidden p-2"
                            >
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {isMenuOpen && (
                        <div
                            className={`md:hidden pb-4 space-y-2 ${isDark ? 'bg-slate-900' : 'bg-slate-50'
                                } rounded-lg mt-2`}
                        >
                            {navItems.map((item) => (
                                <a
                                    key={item.id}
                                    href={`#${item.id}`}
                                    onClick={() => {
                                        setActiveTab(item.id);
                                        setIsMenuOpen(false);
                                    }}
                                    className={`block px-4 py-2 rounded-lg transition-colors ${activeTab === item.id
                                        ? 'bg-blue-600 text-white'
                                        : isDark
                                            ? 'hover:bg-slate-800'
                                            : 'hover:bg-slate-100'
                                        }`}
                                >
                                    {item.label}
                                </a>
                            ))}
                            <Button className="w-full mt-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white">
                                Sign Up
                            </Button>
                        </div>
                    )}
                </div>
            </nav>

            {/* Hero Section */}
            <section className={`relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden`}>
                <div className="absolute inset-0 -z-10">
                    <div
                        className={`absolute top-40 right-0 w-96 h-96 rounded-full blur-3xl opacity-30 ${isDark ? 'bg-blue-600' : 'bg-blue-400'
                            }`}
                    />
                </div>

                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-5xl sm:text-6xl font-bold leading-tight">
                                Complete
                                <span className="block bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                                    Daily Workout
                                </span>
                                At Home
                            </h1>
                            <p
                                className={`text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'
                                    } max-w-lg`}
                            >
                                Transform your body and mind with expert-led workouts. No equipment needed, just you and your dedication.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-8 py-6 text-lg rounded-lg flex items-center justify-center gap-2 group">
                                Book Now
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </Button>
                            <Button
                                variant="outline"
                                className={`px-8 py-6 text-lg rounded-lg flex items-center justify-center gap-2 ${isDark
                                    ? 'border-slate-700 hover:bg-slate-900 text-white'
                                    : 'border-slate-300 hover:bg-slate-50'
                                    }`}
                            >
                                <Play size={20} />
                                Watch Our Story
                            </Button>
                        </div>

                        {/* Stats */}
                        <div className="flex gap-8 pt-8">
                            <div>
                                <p className="text-3xl font-bold text-blue-500">10K+</p>
                                <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Active Members</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-blue-500">95%</p>
                                <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Satisfaction Rate</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="relative h-96 sm:h-full">
                        <div
                            className={`absolute inset-0 rounded-3xl overflow-hidden border-2 ${isDark ? 'border-slate-800' : 'border-slate-300'
                                }`}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?w=600&h=700&fit=crop"
                                alt="Fitness Woman"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-3xl opacity-30 blur-2xl" />
                    </div>
                </div>
            </section>

            {/* Programs Section */}
            <section className={`py-20 px-4 sm:px-6 lg:px-8 ${isDark ? 'bg-slate-900/50' : 'bg-slate-50'}`}>
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-bold mb-4">Our Programs In SF</h2>
                        <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                            Choose from our variety of fitness programs designed for all levels
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {programs.map((program) => (
                            <div
                                key={program.id}
                                className={`group cursor-pointer rounded-2xl overflow-hidden border transition-all duration-300 hover:scale-105 ${cardBgClass}`}
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={program.image}
                                        alt={program.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2">{program.title}</h3>
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={16}
                                                className={`${i < Math.floor(program.rating)
                                                    ? 'fill-yellow-400 text-yellow-400'
                                                    : isDark
                                                        ? 'text-slate-600'
                                                        : 'text-slate-300'
                                                    }`}
                                            />
                                        ))}
                                        <span className={`ml-2 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                            {program.rating}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-bold mb-4">What Our Happy Clients Says</h2>
                        <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                            Real results from real people
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial) => (
                            <div
                                key={testimonial.id}
                                className={`rounded-2xl p-8 border ${cardBgClass} hover:shadow-lg transition-shadow`}
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="text-4xl">{testimonial.avatar}</div>
                                    <div>
                                        <p className="font-semibold">{testimonial.name}</p>
                                        <div className="flex gap-1">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={14}
                                                    className="fill-yellow-400 text-yellow-400"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <p className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                                    "{testimonial.text}"
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-8 py-3 rounded-lg">
                            Write a Review
                        </Button>
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section
                className={`py-20 px-4 sm:px-6 lg:px-8 ${isDark ? 'bg-gradient-to-r from-slate-900 to-slate-800' : 'bg-gradient-to-r from-blue-50 to-slate-50'
                    }`}
            >
                <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Subscribe To Our Newsletter</h2>
                        <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                            Get exclusive workouts, tips, and updates delivered to your inbox
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className={`flex-1 px-6 py-3 rounded-lg border outline-none transition-colors ${isDark
                                ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500'
                                : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                                } focus:border-blue-500`}
                        />
                        <Button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-8 py-3 rounded-lg whitespace-nowrap">
                            Subscribe
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer
                className={`${isDark ? 'bg-slate-950 border-t border-slate-800' : 'bg-slate-100 border-t border-slate-200'
                    } py-12 px-4 sm:px-6 lg:px-8`}
            >
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-400 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold">P</span>
                                </div>
                                <span className="font-bold text-lg">PLUSONE</span>
                            </div>
                            <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                                Transform your fitness journey with us.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Product</h4>
                            <ul className="space-y-2">
                                {['Features', 'Pricing', 'Security', 'Blog'].map((item) => (
                                    <li key={item}>
                                        <a
                                            href="#"
                                            className={`text-sm transition-colors hover:text-blue-500 ${isDark ? 'text-slate-400' : 'text-slate-600'
                                                }`}
                                        >
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Company</h4>
                            <ul className="space-y-2">
                                {['About', 'Blog', 'Jobs', 'Press'].map((item) => (
                                    <li key={item}>
                                        <a
                                            href="#"
                                            className={`text-sm transition-colors hover:text-blue-500 ${isDark ? 'text-slate-400' : 'text-slate-600'
                                                }`}
                                        >
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Legal</h4>
                            <ul className="space-y-2">
                                {['Privacy', 'Terms', 'Cookie Policy'].map((item) => (
                                    <li key={item}>
                                        <a
                                            href="#"
                                            className={`text-sm transition-colors hover:text-blue-500 ${isDark ? 'text-slate-400' : 'text-slate-600'
                                                }`}
                                        >
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div
                        className={`pt-8 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'
                            } text-center`}
                    >
                        <p className={isDark ? 'text-slate-500' : 'text-slate-600'}>
                            © 2024 PLUSONE. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default PlusoneLanding;
