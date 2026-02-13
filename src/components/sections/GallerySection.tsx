import { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';

const GallerySection = () => {
    const images = [
        { src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop", cat: "Interior" },
        { src: "https://images.unsplash.com/photo-1540497077202-7c8a33801524?q=80&w=1000&auto=format&fit=crop", cat: "Equipment" },
        { src: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1000&auto=format&fit=crop", cat: "Classes" },
        { src: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1000&auto=format&fit=crop", cat: "Interior" },
        { src: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000&auto=format&fit=crop", cat: "Classes" },
        { src: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=1000&auto=format&fit=crop", cat: "Equipment" },
        { src: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1000&auto=format&fit=crop", cat: "Training" },
        { src: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=1000&auto=format&fit=crop", cat: "Interior" },
    ];

    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState('All');

    const filteredImages = selectedCategory === 'All'
        ? images
        : images.filter(img => img.cat === selectedCategory);

    return (
        <section id="gallery" className="py-24 px-6 bg-slate-50">
            <div className="container mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
                    <span className="text-brand-orange font-bold tracking-wider uppercase text-sm mb-2 block">Visual Tour</span>
                    <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 text-slate-900">
                        Gallery
                    </h2>
                    <p className="text-slate-600 text-lg">
                        Take a look inside Shankhamul Health Club.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {['All', 'Interior', 'Equipment', 'Classes', 'Training'].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-6 py-2 rounded-full text-sm font-bold transition-all border ${selectedCategory === cat
                                ? 'bg-brand-orange text-white shadow-lg border-brand-orange'
                                : 'bg-white text-slate-600 hover:bg-slate-100 border-slate-200'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 animate-fade-in-up">
                    {filteredImages.map((img, index) => (
                        <div
                            key={index}
                            onClick={() => setSelectedImage(img.src)}
                            className="group relative rounded-2xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 break-inside-avoid shadow-lg"
                        >
                            <img
                                src={img.src}
                                alt={`Gallery ${index}`}
                                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm font-bold flex items-center gap-2">
                                    <ZoomIn size={16} /> View
                                </span>
                            </div>
                            <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="bg-black/60 text-white text-xs px-2 py-1 rounded-md">{img.cat}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            {selectedImage && (
                <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
                    <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors p-2"
                    >
                        <X size={32} />
                    </button>
                    <img
                        src={selectedImage}
                        alt="Full View"
                        className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                    />
                </div>
            )}
        </section>
    );
};

export default GallerySection;
