import React from 'react';
import { RefreshCcw, CloudOff } from 'lucide-react';
import { motion } from 'framer-motion';

interface DataErrorStateProps {
    title?: string;
    message?: string;
    onRetry?: () => void;
}

const DataErrorState: React.FC<DataErrorStateProps> = ({
    title = "Connection Interrupted",
    message = "We're having trouble reaching the gym servers. Please check your connection or try again.",
    onRetry
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 px-6 text-center bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-100/50 max-w-lg mx-auto my-12"
        >
            <div className="relative mb-6">
                <div className="w-20 h-20 bg-rose-50 rounded-3xl flex items-center justify-center text-rose-500 relative z-10">
                    <CloudOff size={32} />
                </div>
                <div className="absolute inset-0 bg-rose-200 blur-2xl opacity-20 rounded-full -z-0"></div>
            </div>

            <h3 className="text-xl font-black text-slate-900 tracking-tight mb-2">{title}</h3>
            <p className="text-sm font-medium text-slate-400 leading-relaxed mb-8">
                {message}
            </p>

            {onRetry && (
                <button
                    onClick={onRetry}
                    className="flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95 group"
                >
                    <RefreshCcw size={14} className="group-hover:rotate-180 transition-transform duration-500" />
                    Restore Connection
                </button>
            )}

            <div className="mt-8 pt-6 border-t border-slate-50 w-full">
                <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                    Infrastructure Status: <span className="text-rose-400">Degraded</span>
                </p>
            </div>
        </motion.div>
    );
};

export default DataErrorState;
