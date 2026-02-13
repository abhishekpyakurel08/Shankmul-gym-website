
import { useParams, Link } from 'react-router-dom';
import { nutritionData } from '@/data/nutritionData';
import { ArrowLeft, Flame, Dumbbell, Droplets, Utensils } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NutritionDetail = () => {
    const { id } = useParams();
    const meal = nutritionData.find(m => m.id === id);

    if (!meal) {
        return (
            <div className="pt-32 pb-20 text-center bg-slate-50 min-h-screen">
                <h1 className="text-3xl font-bold mb-4 text-slate-900">Meal Not Found</h1>
                <Link to="/nutrition">
                    <Button className="bg-brand-orange text-white rounded-full px-8">Back to Nutrition</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
            {/* Hero Section with Image */}
            <div className="relative h-[400px] w-full">
                <img
                    src={meal.img}
                    alt={meal.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
                <div className="absolute inset-0 flex items-center justify-center pt-12">
                    <div className="container mx-auto px-6">
                        <Link to="/nutrition" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors font-medium">
                            <ArrowLeft size={20} className="mr-2" />
                            Back to Plan
                        </Link>
                        <h1 className="text-4xl md:text-6xl font-bold font-display text-white mb-4">{meal.name}</h1>
                        <div className="flex items-center gap-4 text-white/90 text-lg">
                            <span className="bg-brand-orange px-4 py-1.5 rounded-full text-sm font-bold shadow-lg shadow-brand-orange/20">{meal.time}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 -mt-20 relative z-10">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Macros Card */}
                        <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100">
                            <h2 className="text-2xl font-bold font-display mb-8 text-slate-900">Nutritional Information</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                <div className="p-6 rounded-3xl bg-orange-50 border border-orange-100 text-center">
                                    <div className="flex justify-center mb-3 text-brand-orange">
                                        <Flame size={28} />
                                    </div>
                                    <div className="text-3xl font-bold text-slate-900">{meal.calories}</div>
                                    <div className="text-sm text-slate-500 font-medium">Calories</div>
                                </div>
                                <div className="p-6 rounded-3xl bg-blue-50 border border-blue-100 text-center">
                                    <div className="flex justify-center mb-3 text-brand-blue">
                                        <Dumbbell size={28} />
                                    </div>
                                    <div className="text-3xl font-bold text-slate-900">{meal.protein}</div>
                                    <div className="text-sm text-slate-500 font-medium">Protein</div>
                                </div>
                                <div className="p-6 rounded-3xl bg-green-50 border border-green-100 text-center">
                                    <div className="flex justify-center mb-3 text-green-600">
                                        <Utensils size={28} />
                                    </div>
                                    <div className="text-3xl font-bold text-slate-900">{meal.carbs}</div>
                                    <div className="text-sm text-slate-500 font-medium">Carbs</div>
                                </div>
                                <div className="p-6 rounded-3xl bg-yellow-50 border border-yellow-100 text-center">
                                    <div className="flex justify-center mb-3 text-yellow-600">
                                        <Droplets size={28} />
                                    </div>
                                    <div className="text-3xl font-bold text-slate-900">{meal.fats}</div>
                                    <div className="text-sm text-slate-500 font-medium">Fats</div>
                                </div>
                            </div>
                        </div>

                        {/* Instructions */}
                        <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100">
                            <h2 className="text-2xl font-bold font-display mb-8 text-slate-900">Preparation Instructions</h2>
                            <div className="space-y-8">
                                {meal.instructions?.map((step, index) => (
                                    <div key={index} className="flex gap-6">
                                        <div className="w-10 h-10 rounded-2xl bg-brand-orange/10 text-brand-orange flex items-center justify-center shrink-0 font-bold text-xl border border-brand-orange/20">
                                            {index + 1}
                                        </div>
                                        <p className="text-slate-600 text-lg leading-relaxed pt-1.5">{step}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Ingredients */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-[40px] p-8 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100 sticky top-24">
                            <h2 className="text-2xl font-bold font-display mb-8 text-slate-900">Ingredients</h2>
                            <ul className="space-y-5">
                                {meal.ingredients?.map((ingredient, index) => (
                                    <li key={index} className="flex items-center gap-4 text-slate-600 font-medium pb-4 border-b border-slate-50 last:border-0 last:pb-0 group">
                                        <div className="w-2.5 h-2.5 rounded-full bg-brand-blue/30 group-hover:bg-brand-blue transition-colors" />
                                        <span>{ingredient}</span>
                                    </li>
                                ))}
                            </ul>
                            <Button className="w-full mt-10 bg-slate-900 text-white rounded-full h-12 font-bold hover:bg-brand-orange transition-colors">
                                Add All to Shopping List
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NutritionDetail;
