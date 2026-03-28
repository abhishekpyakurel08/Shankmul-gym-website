import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

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

const ContactSection = () => {
    return (
        <section id="contact" className="py-32 px-6 bg-white overflow-hidden">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="flex-1 space-y-8"
                    >
                        <div>
                            <span className="text-brand-orange font-bold tracking-wider uppercase text-sm mb-2 block">Find Us</span>
                            <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900 mb-6">Visit Our <br /> <span className="text-brand-orange">Health Club</span></h2>
                            <p className="text-slate-600 text-lg max-w-lg">
                                Located in the heart of Shankhamul, our facility is easily accessible and equipped with everything you need for your fitness journey.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-slate-900 font-bold">
                                    <div className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange">
                                        <MapPin size={20} />
                                    </div>
                                    Our Location
                                </div>
                                <p className="text-slate-600 pl-13">Shankhamul, Kathmandu<br />Bagmati, Nepal</p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-slate-900 font-bold">
                                    <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                                        <Phone size={20} />
                                    </div>
                                    Call Us
                                </div>
                                <p className="text-slate-600 pl-13">01-4793718</p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-slate-900 font-bold">
                                    <div className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange">
                                        <Mail size={20} />
                                    </div>
                                    Email
                                </div>
                                <p className="text-slate-600 pl-13">info@shankhamulgym.com<br />contact@shankhamulgym.com</p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-slate-900 font-bold">
                                    <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                                        <Clock size={20} />
                                    </div>
                                    Hours
                                </div>
                                <p className="text-slate-600 pl-13">Sun - Fri: 5 AM - 9 PM<br />Sat: 6 AM - 12 PM</p>
                            </div>

                            <div className="space-y-4">
                                <a
                                    href="https://wa.me/9779743223799"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 text-slate-900 font-bold hover:text-[#25D366] transition-colors group"
                                >
                                    <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-all">
                                        <WhatsAppIcon size={20} />
                                    </div>
                                    WhatsApp
                                </a>
                                <p className="text-slate-600 pl-13 font-medium">+977 9743223799</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Map Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="flex-1 w-full lg:w-auto"
                    >
                        <div className="relative rounded-[40px] overflow-hidden shadow-2xl border-8 border-slate-50 group">
                            <img
                                src="/images/map.png"
                                alt="Shankhamul Health Club Map Location"
                                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-brand-orange/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                            {/* Floating Card on Map */}
                            <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-xl hidden md:block">
                                <h3 className="font-bold text-slate-900 mb-2">Shankhamul Health Club & Fitness Centre</h3>
                                <p className="text-sm text-slate-600">Health Club and Fitness Centre</p>
                                <a
                                    href="https://maps.google.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block mt-4 text-brand-orange font-bold text-sm hover:underline"
                                >
                                    Get Directions →
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
