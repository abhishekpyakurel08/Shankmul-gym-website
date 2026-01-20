import { Link } from 'react-router-dom';
import { PieChart, Utensils, Droplets, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { nutritionData } from '@/data/nutritionData';

const Nutrition = () => {
    return (
        <div className="pt-24 pb-20">
            {/* Hero */}
            <section className="relative h-[400px] mb-20 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2000&auto=format&fit=crop"
                        alt="Healthy Food"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
                </div>
                <div className="relative container mx-auto px-6 h-full flex items-center">
                    <div className="max-w-2xl animate-fade-in-up">
                        <span className="text-brand-orange font-bold tracking-wider uppercase text-sm mb-2 block">Nutrition Guide</span>
                        <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">
                            Fuel Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-blue">
                                Ambition
                            </span>
                        </h1>
                        <p className="text-slate-200 text-lg">
                            Training is only half the battle. Discover how to nourish your body for optimal performance and recovery.
                        </p>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-6">
                {/* The Balanced Plate Visual */}
                <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
                    <div className="flex-1 space-y-6">
                        <h2 className="text-3xl font-bold font-display dark:text-white">The Balanced Plate</h2>
                        <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                            A healthy diet isn't about restriction; it's about balance. Aim to fill your plate with a variety of nutrient-dense foods to support your energy levels and muscle growth.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-start gap-4 p-4 glass-adaptive rounded-2xl">
                                <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0">
                                    <Utensils className="text-red-500" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg dark:text-white">Protein (25-30%)</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Essential for muscle repair. Lean meats, fish, eggs, beans, tofu.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-4 glass-adaptive rounded-2xl">
                                <div className="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center shrink-0">
                                    <PieChart className="text-yellow-500" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg dark:text-white">Carbohydrates (45-55%)</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Your body's main energy source. Whole grains, fruits, vegetables.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-4 glass-adaptive rounded-2xl">
                                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
                                    <Droplets className="text-green-500" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg dark:text-white">Healthy Fats (20-25%)</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Vital for hormone function. Avocados, nuts, seeds, olive oil.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 relative">
                        <div className="aspect-square relative rounded-full overflow-hidden border-8 border-white/10 shadow-2xl">
                            {/* Conceptual Plate Image/Graphic */}
                            <img
                                src="https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1000&auto=format&fit=crop"
                                alt="Balanced Meal"
                                className="w-full h-full object-cover"
                            />
                            {/* Overlay Chart - Simplified Visual */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange/20 to-transparent pointer-events-none" />
                        </div>
                        {/* Floating Labels */}
                        <div className="absolute top-1/2 left-0 -translate-x-1/2 bg-white dark:bg-slate-900 shadow-xl px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full" /> Protein
                        </div>
                        <div className="absolute bottom-10 right-0 translate-x-1/4 bg-white dark:bg-slate-900 shadow-xl px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full" /> Veggies
                        </div>
                    </div>
                </div>

                {/* Sample Meal Plan */}
                <div className="mb-24">
                    <h2 className="text-3xl font-bold font-display dark:text-white text-center mb-12">Sample Daily Plan</h2>
                    <div className="grid md:grid-cols-4 gap-6">
                        {nutritionData.map((meal) => (
                            <Link to={`/nutrition/${meal.id}`} key={meal.id} className="group relative bg-white dark:bg-slate-900 rounded-3xl overflow-hidden hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-xl border border-slate-100 dark:border-slate-800 flex flex-col h-full">
                                <div className="h-48 overflow-hidden relative shrink-0">
                                    <div className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                        {meal.time}
                                    </div>
                                    <img
                                        src={meal.img}
                                        alt={meal.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="font-bold text-xl mb-3 dark:text-white group-hover:text-brand-orange transition-colors">{meal.name}</h3>

                                    {/* Macro Preview */}
                                    <div className="grid grid-cols-2 gap-2 mb-4 text-xs font-medium text-slate-500 dark:text-slate-400">
                                        <div className="flex items-center gap-1">
                                            <span className="text-brand-orange">🔥 {meal.calories}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="text-brand-blue">💪 {meal.protein}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="text-green-500">🌾 {meal.carbs}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="text-yellow-500">💧 {meal.fats}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {meal.items.slice(0, 2).map((item, i) => (
                                            <span key={i} className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-1 rounded-md">
                                                {item}
                                            </span>
                                        ))}
                                        {meal.items.length > 2 && (
                                            <span className="text-xs text-slate-500 px-2 py-1">+{meal.items.length - 2} more</span>
                                        )}
                                    </div>

                                    <div className="mt-auto flex items-center text-brand-orange text-sm font-bold group-hover:gap-2 transition-all">
                                        View Details <ArrowRight size={16} className="ml-1" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Hydration Section */}
                <div className="glass-adaptive rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-12 text-center md:text-left">
                    <div className="w-32 h-32 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 animate-pulse">
                        <Droplets size={64} className="text-blue-500" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-3xl font-display font-bold mb-4 dark:text-white">Don't Forget to Hydrate</h2>
                        <p className="text-slate-600 dark:text-slate-300 text-lg mb-6">
                            Water is critical for performance. Aim for at least 3-4 liters per day, especially on training days. Dehydration can reduce strength by up to 10%.
                        </p>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8">
                            Learn More About Hydration
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Nutrition;
