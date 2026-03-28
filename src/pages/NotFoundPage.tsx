import { motion } from 'framer-motion';
import { Home, ArrowLeft, Dumbbell } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-[85vh] flex items-center justify-center relative overflow-hidden bg-slate-50 dark:bg-slate-950 px-4 py-20">
            {/* Decorative Background Mesh Glow Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full flex items-center justify-center pointer-events-none opacity-40">
                <div className="w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-brand-orange/20 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-pulse" />
                <div className="w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] bg-brand-blue/20 rounded-full blur-[80px] mix-blend-multiply dark:mix-blend-screen absolute ml-20 sm:ml-32 -mt-20 sm:-mt-32" />
            </div>

            <div className="relative z-10 max-w-3xl w-full flex flex-col items-center text-center space-y-8">

                {/* Animated 404 Icon & Text */}
                <motion.div
                    className="relative inline-block"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, type: "spring", bounce: 0.5 }}
                >
                    <div className="text-[10rem] sm:text-[14rem] md:text-[18rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900 select-none drop-shadow-sm">
                        404
                    </div>
                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-brand-orange to-red-600 text-white p-6 sm:p-8 rounded-full shadow-[0_0_40px_rgba(255,77,0,0.5)] border-4 border-white/10"
                        initial={{ rotate: -180, scale: 0 }}
                        animate={{ rotate: 0, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.9, type: "spring", bounce: 0.6 }}
                        whileHover={{ rotate: 15, scale: 1.1, cursor: "crosshair" }}
                    >
                        <Dumbbell className="w-14 h-14 sm:w-20 sm:h-20" strokeWidth={1.5} />
                    </motion.div>
                </motion.div>

                {/* Messaging */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="space-y-5 px-4"
                >
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-tight">
                        Oops! You <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-red-500">Missed</span> Your Lift
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
                        The page you are looking for has been moved, deleted, or is currently busy setting a new personal record at the squat rack.
                    </p>
                </motion.div>

                {/* Call to Actions */}
                <motion.div
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 w-full px-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                >
                    <button
                        onClick={() => navigate(-1)}
                        className="group flex flex-row items-center justify-center gap-2 h-14 px-8 rounded-full bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:border-brand-blue hover:text-brand-blue dark:hover:border-brand-blue transition-all shadow-sm hover:shadow-md hover:-translate-y-1 w-full sm:w-auto"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Back to previous form
                    </button>

                    <Link
                        to="/"
                        className="group flex flex-row items-center justify-center gap-2 h-14 px-8 rounded-full bg-gradient-to-r from-brand-orange to-[#FF2A00] text-white font-bold hover:shadow-[0_8px_30px_rgba(255,77,0,0.4)] hover:-translate-y-1 transition-all w-full sm:w-auto"
                    >
                        <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        Return to Base
                    </Link>
                </motion.div>

            </div>
        </div>
    );
};

export default NotFoundPage;
