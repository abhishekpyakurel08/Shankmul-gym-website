import { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import galleryDataRaw from '@/data/galleryData.json';

const GallerySection = () => {
    const images = galleryDataRaw as { src: string; cat: string }[];

    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState('All');

    const filteredImages = selectedCategory === 'All'
        ? images
        : images.filter(img => img.cat === selectedCategory);

    return (
        <section id="gallery" className="py-16 md:py-32 px-4 sm:px-6 bg-slate-50 overflow-hidden">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    <span className="text-brand-orange font-bold tracking-wider uppercase text-sm mb-2 block">Visual Tour</span>
                    <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 text-slate-900">
                        Gallery
                    </h2>
                    <p className="text-slate-600 text-lg">
                        Take a look inside Shankhamul Health Club.
                    </p>
                </motion.div>

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="flex overflow-x-auto gap-3 mb-10 pb-3 hide-scrollbar -mx-4 sm:mx-0 px-4 sm:px-0 sm:flex-wrap sm:justify-center"
                >
                    {['All', 'Interior', 'Equipment', 'Classes', 'Training'].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all border shrink-0 ${selectedCategory === cat
                                ? 'bg-brand-orange text-white shadow-xl shadow-brand-orange/20 border-brand-orange scale-105'
                                : 'bg-white text-slate-600 hover:bg-slate-100 border-slate-200'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </motion.div>

                <motion.div
                    layout
                    className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8"
                >
                    <AnimatePresence mode='popLayout'>
                        {filteredImages.map((img, index) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                key={img.src}
                                onClick={() => setSelectedImage(img.src)}
                                className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-xl bg-slate-200"
                            >
                                <img
                                    src={img.src}
                                    alt={`Gallery ${index}`}
                                    className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[2px] flex items-center justify-center">
                                    <span className="bg-white text-slate-900 px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-2xl">
                                        <ZoomIn size={18} /> Deep View
                                    </span>
                                </div>
                                <div className="absolute bottom-6 left-6 transform -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                                    <span className="bg-brand-orange text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-lg">{img.cat}</span>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
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
