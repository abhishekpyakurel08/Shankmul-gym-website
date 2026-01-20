import { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';

const quotes = [
    {
        text: "The only bad workout is the one that didn't happen.",
        author: "Unknown"
    },
    {
        text: "Motivation is what gets you started. Habit is what keeps you going.",
        author: "Jim Ryun"
    },
    {
        text: "Your body can stand almost anything. It’s your mind that you have to convince.",
        author: "Unknown"
    },
    {
        text: "Fitness is not about being better than someone else. It’s about being better than you were yesterday.",
        author: "Khloe Kardashian"
    },
    {
        text: "Success isn't always about greatness. It's about consistency. Consistent hard work gains success.",
        author: "Dwayne Johnson"
    }
];

const MotivationCarousel = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % quotes.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-20 px-6 bg-brand-orange/5">
            <div className="container mx-auto max-w-4xl text-center">
                <div className="mb-8 flex justify-center">
                    <div className="w-16 h-16 rounded-full bg-brand-orange/10 flex items-center justify-center">
                        <Quote size={32} className="text-brand-orange" fill="currentColor" />
                    </div>
                </div>

                <div className="relative h-48 flex items-center justify-center">
                    {quotes.map((quote, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ease-in-out px-4 ${index === current
                                    ? 'opacity-100 translate-y-0 scale-100'
                                    : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
                                }`}
                        >
                            <h3 className="font-display text-2xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                                "{quote.text}"
                            </h3>
                            <p className="text-brand-orange font-medium tracking-wide uppercase text-sm">
                                — {quote.author}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center gap-2 mt-8">
                    {quotes.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrent(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === current ? 'w-8 bg-brand-orange' : 'bg-slate-300 dark:bg-slate-700 hover:bg-brand-orange/50'
                                }`}
                            aria-label={`Go to quote ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MotivationCarousel;
