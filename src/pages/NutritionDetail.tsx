
import { useParams, Link } from 'react-router-dom';
import { nutritionData } from '@/data/nutritionData';
import { ArrowLeft, Flame, Dumbbell, Droplets, Utensils } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NutritionDetail = () => {
    const { id } = useParams();
    const meal = nutritionData.find(m => m.id === id);

    if (!meal) {
        return (
            <div className="pt-32 pb-20 text-center">
                <h1 className="text-3xl font-bold mb-4">Meal Not Found</h1>
                <Link to="/nutrition">
                    <Button>Back to Nutrition</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="pt-24 pb-20">
            {/* Hero Section with Image */}
            <div className="relative h-[400px] w-full">
                <img
                    src={meal.img}
                    alt={meal.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="container mx-auto px-6">
                        <Link to="/nutrition" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
                            <ArrowLeft size={20} className="mr-2" />
                            Back to Plan
                        </Link>
                        <h1 className="text-4xl md:text-6xl font-bold font-display text-white mb-4">{meal.name}</h1>
                        <div className="flex items-center gap-4 text-white/90 text-lg">
                            <span className="bg-brand-orange px-3 py-1 rounded-full text-sm font-bold">{meal.time}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 -mt-20 relative z-10">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Macros Card */}
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-100 dark:border-slate-800">
                            <h2 className="text-2xl font-bold font-display mb-6 dark:text-white">Nutritional Information</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="p-4 rounded-2xl bg-orange-50 dark:bg-orange-900/10 text-center">
                                    <div className="flex justify-center mb-2 text-brand-orange">
                                        <Flame size={24} />
                                    </div>
                                    <div className="text-2xl font-bold text-slate-900 dark:text-white">{meal.calories}</div>
                                    <div className="text-sm text-slate-600 dark:text-slate-400">Calories</div>
                                </div>
                                <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/10 text-center">
                                    <div className="flex justify-center mb-2 text-brand-blue">
                                        <Dumbbell size={24} />
                                    </div>
                                    <div className="text-2xl font-bold text-slate-900 dark:text-white">{meal.protein}</div>
                                    <div className="text-sm text-slate-600 dark:text-slate-400">Protein</div>
                                </div>
                                <div className="p-4 rounded-2xl bg-green-50 dark:bg-green-900/10 text-center">
                                    <div className="flex justify-center mb-2 text-green-500">
                                        <Utensils size={24} />
                                    </div>
                                    <div className="text-2xl font-bold text-slate-900 dark:text-white">{meal.carbs}</div>
                                    <div className="text-sm text-slate-600 dark:text-slate-400">Carbs</div>
                                </div>
                                <div className="p-4 rounded-2xl bg-yellow-50 dark:bg-yellow-900/10 text-center">
                                    <div className="flex justify-center mb-2 text-yellow-500">
                                        <Droplets size={24} />
                                    </div>
                                    <div className="text-2xl font-bold text-slate-900 dark:text-white">{meal.fats}</div>
                                    <div className="text-sm text-slate-600 dark:text-slate-400">Fats</div>
                                </div>
                            </div>
                        </div>

                        {/* Instructions */}
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-100 dark:border-slate-800">
                            <h2 className="text-2xl font-bold font-display mb-6 dark:text-white">Preparation Instructions</h2>
                            <div className="space-y-6">
                                {meal.instructions?.map((step, index) => (
                                    <div key={index} className="flex gap-4">
                                        <div className="w-8 h-8 rounded-full bg-brand-orange text-white flex items-center justify-center shrink-0 font-bold">
                                            {index + 1}
                                        </div>
                                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed pt-1">{step}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Ingredients */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-100 dark:border-slate-800 sticky top-24">
                            <h2 className="text-2xl font-bold font-display mb-6 dark:text-white">Ingredients</h2>
                            <ul className="space-y-4">
                                {meal.ingredients?.map((ingredient, index) => (
                                    <li key={index} className="flex items-center gap-3 text-slate-600 dark:text-slate-300 pb-3 border-b border-slate-100 dark:border-slate-800 last:border-0 last:pb-0">
                                        <div className="w-2 h-2 rounded-full bg-brand-blue" />
                                        <span>{ingredient}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NutritionDetail;
