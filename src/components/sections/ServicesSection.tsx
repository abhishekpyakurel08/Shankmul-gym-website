import { useState } from 'react';
import { Dumbbell, Users, Utensils, Waves, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ServicesSection = () => {
    // ... services data same as before ...
    const services = [
        {
            icon: <Dumbbell className="w-8 h-8 text-white" />,
            title: "Personal Training",
            description: "One-on-one coaching tailored to your specific goals, body type, and fitness level.",
            color: "bg-brand-orange",
            features: ["Customized Workout Plans", "Nutritional Advice", "Progress Tracking", "Form Correction"],
            price: "Rs 1500/session",
            details: "Unlock your full potential with our certified personal trainers. Whether you're a beginner looking to learn the basics or an athlete aiming for peak performance, our trainers will design a program specifically for you. We focus on proper technique, goal setting, and accountability to ensure you see real results."

        },
        {
            icon: <Users className="w-8 h-8 text-white" />,
            title: "Group Classes",
            description: "High-energy classes led by expert instructors to keep you motivated and moving.",
            color: "bg-brand-blue",
            features: ["Zumba & Dance", "Yoga & Pilates", "HIIT & Cardio", "Spinning"],
            price: "Included in Membership",
            details: "Join our vibrant community in one of our many group fitness classes. From the high-energy beats of Zumba to the mindful flows of Yoga, we have something for everyone. Our expert instructors will guide you through every move, ensuring a safe and effective workout that's also a ton of fun."

        },
        {
            icon: <Utensils className="w-8 h-8 text-white" />,
            title: "Nutrition Planning",
            description: "Fuel your body right with personalized meal plans designed by certified nutritionists.",
            color: "bg-green-500",
            features: ["Macro Calculation", "Meal Prep Guides", "Supplement Advice", "Dietary Adjustments"],
            price: "Rs 3000/month",
            details: "Nutrition is the foundation of fitness. Our certified nutritionists will work with you to create a sustainable eating plan that fuels your workouts and fits your lifestyle. No crash diets or restrictions—just real food and science-backed strategies to help you reach your goals."

        },
        {
            icon: <Waves className="w-8 h-8 text-white" />,
            title: "Recovery & Spa",
            description: "Relax and recover after a hard workout with our premium sauna and steam facilities.",
            color: "bg-purple-500",
            features: ["Steam Room", "Sauna", "Massage Therapy", "Physiotherapy Support"],
            price: "Included in Premium/Elite",
            details: "Recovery is just as important as training. Our spa facilities include a traditional Finnish sauna, a eucalyptus steam room, and cold plunge pools to help reduce inflammation and speed up muscle recovery. We also offer on-site massage therapy and physiotherapy consultations to keep your body in peak condition."
        }
    ];

    const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

    return (
        <section id="services" className="py-24 px-6 bg-slate-50">
            <div className="container mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <span className="text-brand-orange font-bold tracking-wider uppercase text-sm mb-2 block">What We Offer</span>
                    <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 text-slate-900">
                        Premium Services <br />
                        <span className="text-slate-500 text-3xl md:text-5xl">For Elite Results</span>
                    </h2>
                    <p className="text-slate-600 text-lg">
                        We provide everything you need to transform your health and physique under one roof.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {services.map((service, index) => (
                        <div key={index} className="rounded-3xl p-8 border border-slate-200 hover:border-brand-orange/30 transition-all duration-300 group flex flex-col h-full bg-white shadow-lg shadow-slate-200/50">
                            <div className={`${service.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg rotate-3 group-hover:rotate-6 transition-transform`}>
                                {service.icon}
                            </div>
                            <h3 className="font-display text-2xl font-bold mb-4 text-slate-900">{service.title}</h3>
                            <p className="text-slate-600 mb-8 leading-relaxed flex-grow">
                                {service.description}
                            </p>
                            <div className="text-brand-orange font-bold text-lg mb-4">{service.price}</div>

                            <ul className="space-y-3 mb-8">
                                {service.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-sm text-slate-700">
                                        <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                                            <Check size={12} className="text-brand-orange" />
                                        </div>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <Button
                                onClick={() => setSelectedService(service)}
                                className="w-full bg-slate-900 text-white hover:bg-brand-orange transition-colors"
                            >
                                Learn More
                            </Button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Service Detail Modal */}
            {selectedService && (
                <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-2xl w-full relative animate-in zoom-in-95 duration-300 shadow-2xl overflow-y-auto max-h-[90vh]">
                        <button
                            onClick={() => setSelectedService(null)}
                            className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <div className="flex items-center gap-4 mb-6">
                            <div className={`${selectedService.color} w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg`}>
                                {selectedService.icon}
                            </div>
                            <div>
                                <h2 className="font-display text-3xl font-bold text-slate-900">{selectedService.title}</h2>
                                <p className="text-brand-orange font-bold text-lg">{selectedService.price}</p>
                            </div>
                        </div>

                        <div className="prose max-w-none">
                            <h3 className="text-xl font-bold mb-3 text-slate-900">About This Service</h3>
                            <p className="text-slate-600 text-lg leading-relaxed mb-6">
                                {selectedService.details}
                            </p>

                            <h3 className="text-xl font-bold mb-3 text-slate-900">What's Included</h3>
                            <div className="grid md:grid-cols-2 gap-4 mb-8">
                                {selectedService.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                                        <div className="w-6 h-6 rounded-full bg-brand-orange/10 flex items-center justify-center shrink-0">
                                            <Check size={14} className="text-brand-orange" />
                                        </div>
                                        <span className="font-medium text-slate-700">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end gap-4">
                            <Button
                                variant="outline"
                                onClick={() => setSelectedService(null)}
                                className="border-slate-200"
                            >
                                Close
                            </Button>
                            <Button className="bg-brand-orange hover:bg-orange-600 text-white">
                                Book Now
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ServicesSection;
