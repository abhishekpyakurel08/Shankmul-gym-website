import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const MembershipSection = () => {
    return (
        <section id="membership" className="py-24 px-6 bg-slate-50">
            <div className="container mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="font-display text-4xl font-bold mb-4 text-slate-900">Membership Plans</h2>
                    <p className="text-slate-600">Choose the perfect plan for your fitness journey. No hidden fees.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { name: "Basic", price: "Rs 2500", features: ["Access to Gym Floor", "Locker Access", "1 Free Training Session"] },
                        { name: "Premium", price: "Rs 4500", featured: true, features: ["All Basic Features", "Unlimited Classes", "Nutritional Guidance", "Sauna Access"] },
                        { name: "Elite", price: "Rs 8000", features: ["All Premium Features", "Personal Trainer (4x/mo)", "Guest Passes", "Priority Booking"] }
                    ].map((plan, i) => (
                        <div key={i} className={cn(
                            "relative p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-2",
                            plan.featured
                                ? "bg-brand-orange text-white border-brand-orange shadow-2xl shadow-brand-orange/20 scale-105 z-10"
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
                            <Button className={cn("w-full h-12 rounded-xl font-bold transition-transform hover:scale-105", plan.featured ? "bg-white text-brand-orange hover:bg-white/90" : "bg-slate-900 text-white hover:bg-brand-orange transition-colors")}>
                                Choose Plan
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MembershipSection;

