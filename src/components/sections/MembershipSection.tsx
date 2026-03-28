import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import membershipData from '@/data/membershipData.json';

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

const MembershipSection = () => {
    return (
        <section id="membership" className="py-16 md:py-32 px-4 sm:px-6 bg-slate-50 overflow-hidden">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 text-slate-900">Membership Plans</h2>
                    <p className="text-slate-600 text-base sm:text-lg">Choose the perfect plan for your fitness journey. No hidden fees.</p>
                </motion.div>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                    {membershipData.map((plan, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.15 }}
                            className={cn(
                                "relative p-6 sm:p-8 rounded-2xl sm:rounded-3xl border transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2",
                                plan.featured
                                    ? "bg-brand-orange text-white border-brand-orange shadow-2xl shadow-brand-orange/20 md:scale-105 z-10"
                                    : "bg-white border-slate-200 hover:border-brand-orange/50 shadow-lg shadow-slate-200/50"
                            )}>
                            {plan.featured && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-brand-orange text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">Most Popular</div>}
                            <h3 className={cn("text-xl font-bold mb-2", plan.featured ? "text-white" : "text-slate-900")}>{plan.name}</h3>
                            <div className="flex items-baseline gap-1 mb-6">
                                <span className={cn("text-4xl font-display font-bold", plan.featured ? "text-white" : "text-slate-900")}>{plan.price}</span>
                                <span className={cn("text-sm", plan.featured ? "text-white/80" : "text-slate-500")}>/month</span>
                            </div>
                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, f) => (
                                    <li key={f} className="flex items-center gap-3 text-sm">
                                        <div className={cn("w-5 h-5 rounded-full flex items-center justify-center shrink-0", plan.featured ? "bg-white/20 text-white" : "bg-brand-orange/10 text-brand-orange")}>
                                            <div className="w-1.5 h-1.5 rounded-full bg-current" />
                                        </div>
                                        <span className={plan.featured ? "text-white/90" : "text-slate-600"}>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <motion.a
                                href={`https://wa.me/9779743223799?text=Hello, I'm interested in the ${plan.name} Membership Plan.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Button className={cn("w-full h-12 rounded-xl font-bold transition-all flex items-center justify-center gap-2", plan.featured ? "bg-white text-brand-orange hover:bg-white/90" : "bg-slate-900 text-white hover:bg-[#25D366]")}>
                                    <WhatsAppIcon size={18} />
                                    Choose Plan
                                </Button>
                            </motion.a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MembershipSection;

