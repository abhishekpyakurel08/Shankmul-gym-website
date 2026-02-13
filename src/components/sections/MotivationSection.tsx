import { Button } from '@/components/ui/button';

const MotivationSection = () => {
    return (
        <section className="relative py-32 px-6 overflow-hidden bg-white">
            <div className="absolute inset-0 bg-brand-orange/5 z-0" />
            <div className="container mx-auto relative z-10 text-center">
                <h2 className="font-display text-5xl md:text-7xl font-bold mb-8 items-center justify-center flex flex-col gap-4">
                    <span className="text-slate-600 text-3xl md:text-4xl font-normal">Don't Wish For It</span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600">
                        WORK FOR IT
                    </span>
                </h2>
                <p className="text-slate-600 text-lg max-w-2xl mx-auto mb-12">
                    The only bad workout is the one that didn't happen.
                    Join our community of doers, dreamers, and achievers.
                </p>
                <Button className="h-16 px-12 text-xl bg-slate-900 text-white hover:bg-brand-blue hover:text-white rounded-full font-bold shadow-2xl shadow-slate-900/10 transition-all hover:scale-105">
                    Join The Club
                </Button>
            </div>
        </section>
    );
};

export default MotivationSection;
