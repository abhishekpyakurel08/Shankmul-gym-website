import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import {
    LayoutDashboard,
    Users,
    Activity,
    LogOut,
    Bell,
    Menu
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ReceptionLayout: React.FC = () => {
    const navigate = useNavigate();
    const { logout, user } = useAuth();
    const { unreadCount } = useNotifications();


    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [showNotifications, setShowNotifications] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    const navItems = [
        { to: '/reception/dashboard', icon: <LayoutDashboard size={20} />, label: 'Front Desk' },
        { to: '/reception/live', icon: <Activity size={20} />, label: 'Check-ins' },
        { to: '/reception/members', icon: <Users size={20} />, label: 'Members' },
        { to: '/reception/alerts', icon: <Bell size={20} />, label: 'System Alerts' },
    ];

    return (
        <div className="flex h-screen bg-slate-50/50 font-sans">
            {/* Sidebar Overlay for Mobile */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <aside
                className={`
                    fixed md:relative
                    ${isSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0 md:w-20'} 
                    bg-white border-r border-slate-100 text-slate-500 transition-all duration-300 ease-in-out flex flex-col z-50 h-full
                `}
            >
                <div className="p-4 mb-4 flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-sm overflow-hidden border border-slate-100">
                        <img src="/shankhamul-logo.jpg" alt="Shankhamul Logo" className="w-full h-full object-cover" />
                    </div>
                    {isSidebarOpen && (
                        <h1 className="text-slate-900 font-bold text-sm tracking-tight leading-none">
                            Shankhamul<br />
                            <span className="text-indigo-600 text-[9px] uppercase tracking-widest font-black">Health Club & Fitness</span>
                        </h1>
                    )}
                </div>

                <nav className="flex-1 px-3 space-y-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            onClick={() => window.innerWidth < 768 && setIsSidebarOpen(false)}
                            className={({ isActive }) => `
                                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                                ${isActive ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-slate-50 hover:text-slate-900'}
                            `}
                        >
                            <span className={`shrink-0 ${isSidebarOpen ? '' : 'mx-auto'}`}>{item.icon}</span>
                            {(isSidebarOpen || window.innerWidth < 768) && <span className="font-semibold text-sm">{item.label}</span>}
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 mt-auto">
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-rose-500 hover:bg-rose-50 transition-all font-semibold text-sm">
                        <LogOut size={20} className={isSidebarOpen ? '' : 'mx-auto'} />
                        {isSidebarOpen && <span>Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 flex justify-between items-center bg-white px-4 md:px-8 border-b border-slate-100 z-30">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1.5 hover:bg-slate-100 rounded-md text-slate-500 transition-colors">
                            <Menu size={20} />
                        </button>
                        <h2 className="text-lg md:text-xl font-black text-slate-900 tracking-tight whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px] md:max-w-none uppercase tracking-widest md:text-xs opacity-40">Reception Console</h2>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <button
                                onClick={() => setShowNotifications(!showNotifications)}
                                className={`p-2.5 rounded-xl transition-all relative ${showNotifications ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-50 text-slate-400 hover:text-slate-600'}`}
                            >
                                <Bell size={20} />
                                {unreadCount > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#EE4B6A] text-white text-[10px] font-black rounded-full flex items-center justify-center ring-2 ring-white">{unreadCount}</span>}
                            </button>
                            {/* Simple notification dropdown logic could go here similarly to AdminLayout if needed */}
                        </div>

                        <div className="flex items-center gap-3 pl-4 md:pl-6 border-l border-slate-100 group">
                            <div className="hidden xs:block text-right">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Reception</p>
                                <p className="text-xs font-black text-slate-900 tracking-tight">{user?.firstName} {user?.lastName}</p>
                            </div>
                            <div className="w-9 h-9 md:w-10 md:h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-[11px] md:text-sm font-black shadow-lg shadow-indigo-100 group-hover:scale-105 transition-transform">
                                {user?.firstName?.[0]}{user?.lastName?.[0]}
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-8 bg-slate-50/30">
                    <div className="max-w-[1600px] mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ReceptionLayout;
