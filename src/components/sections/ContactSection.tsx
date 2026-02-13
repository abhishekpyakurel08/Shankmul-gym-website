import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactSection = () => {
    return (
        <section id="contact" className="py-24 px-6 bg-white">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    {/* Contact Info */}
                    <div className="flex-1 space-y-8">
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
                                <p className="text-slate-600 pl-13">+977 1-2345678<br />+977 9876543210</p>
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
                        </div>
                    </div>

                    {/* Map Visual */}
                    <div className="flex-1 w-full lg:w-auto">
                        <div className="relative rounded-[40px] overflow-hidden shadow-2xl border-8 border-slate-50 group">
                            <img
                                src="/images/map.png"
                                alt="Shankhamul Health Club Map Location"
                                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-brand-orange/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                            {/* Floating Card on Map */}
                            <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-xl hidden md:block">
                                <h3 className="font-bold text-slate-900 mb-2">Shankhamul Health Club</h3>
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
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
