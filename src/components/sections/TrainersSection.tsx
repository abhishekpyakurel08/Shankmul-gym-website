const TrainersSection = () => {
    return (
        <section id="trainers" className="py-24 px-6 bg-white">
            <div className="container mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="font-display text-4xl font-bold mb-4 text-slate-900">Expert Trainers</h2>
                    <p className="text-slate-600">Train with the best. Our certified experts are here to guide you every step of the way.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { name: "Alex Roy", role: "Strength Coach", image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=800&auto=format&fit=crop&q=60" },
                        { name: "Sarah Lee", role: "Yoga Instructor", image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&q=60" },
                        { name: "Mike Chen", role: "HIIT Specialist", image: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=800&auto=format&fit=crop&q=60" }
                    ].map((trainer, i) => (
                        <div key={i} className="group relative overflow-hidden rounded-3xl h[400px] shadow-lg">
                            <img src={trainer.image} alt={trainer.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                                <h3 className="text-white text-2xl font-bold font-display">{trainer.name}</h3>
                                <p className="text-brand-orange font-medium">{trainer.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrainersSection;
