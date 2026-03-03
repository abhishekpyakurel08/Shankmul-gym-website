import { Button } from '@/components/ui/button';

const MotivationSection = () => {
    return (
        <section className="relative py-32 px-6 overflow-hidden">
            <div className="absolute inset-0 bg-slate-900 z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-orange/20 to-brand-blue/20 opacity-50" />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-30" />
            </div>

            <div className="container mx-auto relative z-10 text-center">
                <div className="max-w-4xl mx-auto">
                    <h2 className="font-display text-5xl md:text-8xl font-bold mb-8 items-center justify-center flex flex-col gap-2">
                        <span className="text-white/60 text-2xl md:text-3xl font-normal tracking-widest uppercase">Don't Wish For It</span>
                        <span className="text-white">
                            WORK FOR IT
                        </span>
                    </h2>
                    <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium">
                        "The only bad workout is the one that didn't happen.
                        Join our community of over 5,000+ members transforming their lives today."
                    </p>
                    <a href="#contact">
                        <Button className="h-20 px-16 text-2xl bg-brand-orange text-white hover:bg-white hover:text-brand-orange rounded-full font-black shadow-[0_0_50px_rgba(255,107,0,0.3)] transition-all hover:scale-105 uppercase tracking-tighter">
                            Join The Club
                        </Button>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default MotivationSection;
