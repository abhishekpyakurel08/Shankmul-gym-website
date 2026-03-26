import { Link } from 'react-router-dom';
import { PieChart, Utensils, Droplets, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { nutritionData } from '@/data/nutritionData';

const NutritionSection = () => {
    return (
        <section id="nutrition" className="py-24 px-6 bg-slate-50">
            <div className="container mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
                    <span className="text-brand-orange font-bold tracking-wider uppercase text-sm mb-2 block">Nutrition Guide</span>
                    <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 text-slate-900">
                        Fuel Your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-blue">
                            Ambition
                        </span>
                    </h2>
                    <p className="text-slate-600 text-lg">
                        Training is only half the battle. Discover how to nourish your body for optimal performance and recovery.
                    </p>
                </div>

                {/* The Balanced Plate Visual */}
                <div className="flex flex-col lg:flex-row items-center gap-16 mb-24 bg-white p-8 md:p-12 rounded-[40px] shadow-xl shadow-slate-200/50 border border-slate-100">
                    <div className="flex-1 space-y-6">
                        <h2 className="text-3xl font-bold font-display text-slate-900">The Balanced Plate</h2>
                        <p className="text-slate-600 text-lg leading-relaxed">
                            A healthy diet isn't about restriction; it's about balance. Aim to fill your plate with a variety of nutrient-dense foods to support your energy levels and muscle growth.
                        </p>

                        <div className="space-y-4">
                            <Card className="bg-slate-50 border-slate-100 shadow-sm transition-colors hover:bg-slate-100">
                                <CardContent className="flex items-start gap-4 p-4">
                                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                                        <Utensils className="text-red-500" />
                                    </div>
                                    <div className="pt-1">
                                        <h3 className="font-bold text-lg text-slate-900 leading-tight">Protein (25-30%)</h3>
                                        <p className="text-sm text-slate-500 mt-1">Essential for muscle repair. Lean meats, fish, eggs, beans, tofu.</p>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="bg-slate-50 border-slate-100 shadow-sm transition-colors hover:bg-slate-100">
                                <CardContent className="flex items-start gap-4 p-4">
                                    <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center shrink-0">
                                        <PieChart className="text-yellow-500" />
                                    </div>
                                    <div className="pt-1">
                                        <h3 className="font-bold text-lg text-slate-900 leading-tight">Carbohydrates (45-55%)</h3>
                                        <p className="text-sm text-slate-500 mt-1">Your body's main energy source. Whole grains, fruits, vegetables.</p>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="bg-slate-50 border-slate-100 shadow-sm transition-colors hover:bg-slate-100">
                                <CardContent className="flex items-start gap-4 p-4">
                                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                        <Droplets className="text-green-500" />
                                    </div>
                                    <div className="pt-1">
                                        <h3 className="font-bold text-lg text-slate-900 leading-tight">Healthy Fats (20-25%)</h3>
                                        <p className="text-sm text-slate-500 mt-1">Vital for hormone function. Avocados, nuts, seeds, olive oil.</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <div className="flex-1 relative">
                        <div className="aspect-square relative rounded-full overflow-hidden border-8 border-slate-50 shadow-2xl">
                            {/* Conceptual Plate Image/Graphic */}
                            <img
                                src="https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1000&auto=format&fit=crop"
                                alt="Balanced Meal"
                                className="w-full h-full object-cover"
                            />
                            {/* Overlay Chart - Simplified Visual */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange/20 to-transparent pointer-events-none" />
                        </div>
                        {/* Floating Labels - Hidden on mobile for cleaner look */}
                        <div className="absolute top-1/2 left-0 -translate-x-1/2 bg-white border border-slate-100 shadow-xl px-4 py-2 rounded-full text-sm font-bold hidden md:flex items-center gap-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full" /> Protein
                        </div>
                        <div className="absolute bottom-10 right-0 translate-x-1/4 bg-white border border-slate-100 shadow-xl px-4 py-2 rounded-full text-sm font-bold hidden md:flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full" /> Veggies
                        </div>
                    </div>
                </div>

                {/* Sample Meal Plan */}
                <div className="mb-24">
                    <h2 className="text-3xl font-bold font-display text-slate-900 text-center mb-12">Sample Daily Plan</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {nutritionData.map((meal) => (
                            <Link to={`/nutrition/${meal.id}`} key={meal.id} className="group">
                                <Card className="relative overflow-hidden hover:-translate-y-2 transition-all duration-300 shadow-md hover:shadow-xl border-slate-100 h-full flex flex-col">
                                    <div className="h-48 overflow-hidden relative shrink-0">
                                        <Badge className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur-md text-white hover:bg-black/60 rounded-full font-bold uppercase tracking-wider">
                                            {meal.time}
                                        </Badge>
                                        <img
                                            src={meal.img}
                                            alt={meal.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    </div>
                                    <CardContent className="p-6 flex flex-col flex-grow">
                                        <h3 className="font-bold text-xl mb-3 text-slate-900 group-hover:text-brand-orange transition-colors">{meal.name}</h3>

                                        {/* Macro Preview */}
                                        <div className="grid grid-cols-2 gap-2 mb-4 text-xs font-medium text-slate-500">
                                            <div className="flex items-center gap-1">
                                                <span className="text-brand-orange">🔥 {meal.calories}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <span className="text-brand-blue">💪 {meal.protein}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <span className="text-green-600">🌾 {meal.carbs}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <span className="text-orange-500">💧 {meal.fats}</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {meal.items.slice(0, 2).map((item, i) => (
                                                <Badge key={i} variant="secondary" className="text-xs bg-slate-100 text-slate-600 font-normal">
                                                    {item}
                                                </Badge>
                                            ))}
                                            {meal.items.length > 2 && (
                                                <span className="text-xs text-slate-400 px-2 py-1">+{meal.items.length - 2} more</span>
                                            )}
                                        </div>

                                        <div className="mt-auto flex items-center text-brand-orange text-sm font-bold group-hover:gap-2 transition-all">
                                            View Details <ArrowRight size={16} className="ml-1" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Hydration Section */}
                <div className="bg-white border border-slate-200 shadow-xl rounded-[40px] p-8 md:p-12 flex flex-col md:flex-row items-center gap-12 text-center md:text-left">
                    <div className="w-32 h-32 rounded-full bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
                        <Droplets size={64} className="text-blue-500 animate-pulse" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-3xl font-display font-bold mb-4 text-slate-900">Don't Forget to Hydrate</h2>
                        <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                            Water is critical for performance. Aim for at least 3-4 liters per day, especially on training days. Dehydration can reduce strength by up to 10%.
                        </p>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 h-12 font-bold shadow-lg shadow-blue-200">
                            Learn More About Hydration
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NutritionSection;
