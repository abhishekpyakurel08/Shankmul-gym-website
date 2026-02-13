import React, { useState } from 'react';
import { NavLink, Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import {
    LayoutDashboard,
    Users,
    Activity,
    DollarSign,
    LogOut,
    Bell,
    Menu,
    Briefcase,
    Clock,
    UserPlus,
    AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminLayout: React.FC = () => {
    const navigate = useNavigate();
    const { logout, user } = useAuth();
    const { notifications, unreadCount, markAsRead, markAllAsRead, isConnected } = useNotifications();

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [showNotifications, setShowNotifications] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case 'new_member': return <UserPlus size={16} className="text-emerald-500" />;
            case 'membership_request': return <Clock size={16} className="text-amber-500" />;
            case 'clock_in': return <Activity size={16} className="text-indigo-500" />;
            case 'system': return <AlertCircle size={16} className="text-blue-500" />;
            default: return <Bell size={16} className="text-slate-400" />;
        }
    };

    const navItems = [
        { to: '/admin/dashboard', icon: <LayoutDashboard size={20} />, label: 'Overview' },
        { to: '/admin/live', icon: <Activity size={20} />, label: 'Live Monitor' },
        { to: '/admin/members', icon: <Users size={20} />, label: 'Members' },
        ...(user?.role === 'admin' ? [
            { to: '/admin/finance', icon: <DollarSign size={20} />, label: 'Reports' },
            { to: '/admin/staff', icon: <Briefcase size={20} />, label: 'Staff' },
        ] : []),

        { to: '/admin/notifications', icon: <Bell size={20} />, label: 'Alert Center' },
    ];

    return (
        <div className="flex h-screen bg-slate-50/50 font-sans">
            {/* Sidebar */}
            <aside
                className={`
                    ${isSidebarOpen ? 'w-64' : 'w-20'} 
                    bg-white border-r border-slate-100 text-slate-500 transition-all duration-300 ease-in-out flex flex-col z-40
                `}
            >
                <div className="p-6 mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shrink-0 shadow-md shadow-indigo-100">
                        <span className="text-white font-black text-lg">S</span>
                    </div>
                    {isSidebarOpen && (
                        <h1 className="text-slate-900 font-bold text-lg tracking-tight">Shankmul Gym</h1>
                    )}
                </div>

                <nav className="flex-1 px-3 space-y-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) => `
                                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                                ${isActive
                                    ? 'bg-indigo-50 text-indigo-600'
                                    : 'hover:bg-slate-50 hover:text-slate-900'}
                            `}
                        >
                            <span className={`shrink-0 ${isSidebarOpen ? '' : 'mx-auto'}`}>{item.icon}</span>
                            {isSidebarOpen && <span className="font-semibold text-sm">{item.label}</span>}
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 mt-auto">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-rose-500 hover:bg-rose-50 transition-all font-semibold text-sm"
                    >
                        <LogOut size={20} className={isSidebarOpen ? '' : 'mx-auto'} />
                        {isSidebarOpen && <span>Logout</span>}
                    </button>
                    {isSidebarOpen && (
                        <div className="mt-4 px-4 py-3 bg-slate-50 rounded-xl flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-500' : 'bg-rose-500'} animate-pulse`}></div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                {isConnected ? 'Link Active' : 'Offline'}
                            </span>
                        </div>
                    )}
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 flex justify-between items-center bg-white px-8 border-b border-slate-100 z-30">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-1.5 hover:bg-slate-100 rounded-md text-slate-500 transition-colors md:hidden"
                        >
                            <Menu size={20} />
                        </button>
                        <h2 className="text-xl font-black text-slate-900 tracking-tight">System Console</h2>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* Notifications Bell */}
                        <div className="relative">
                            <button
                                onClick={() => setShowNotifications(!showNotifications)}
                                className={`p-2.5 rounded-xl transition-all relative ${showNotifications ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-50 text-slate-400 hover:text-slate-600'}`}
                            >
                                <Bell size={20} />
                                {unreadCount > 0 && (
                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#EE4B6A] text-white text-[10px] font-black rounded-full flex items-center justify-center ring-2 ring-white">
                                        {unreadCount > 9 ? '9+' : unreadCount}
                                    </span>
                                )}
                            </button>

                            <AnimatePresence>
                                {showNotifications && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-40"
                                            onClick={() => setShowNotifications(false)}
                                        ></div>
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            className="absolute right-0 mt-3 w-[360px] bg-white rounded-3xl shadow-2xl border border-slate-100 z-50 overflow-hidden"
                                        >
                                            <div className="p-5 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Real-time Alerts</h3>
                                                <button
                                                    onClick={markAllAsRead}
                                                    className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline"
                                                >
                                                    Clear All
                                                </button>
                                            </div>

                                            <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                                                {notifications.length === 0 ? (
                                                    <div className="py-12 text-center">
                                                        <Activity size={32} className="mx-auto text-slate-200 mb-3" />
                                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">In-box empty</p>
                                                    </div>
                                                ) : (
                                                    <div className="divide-y divide-slate-50">
                                                        {notifications.map((notif) => (
                                                            <div
                                                                key={notif.id}
                                                                className={`p-4 hover:bg-slate-50/50 transition-colors flex gap-3 cursor-pointer ${!notif.read ? 'bg-indigo-50/20' : ''}`}
                                                                onClick={() => markAsRead(notif.id)}
                                                            >
                                                                <div className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center ${notif.type === 'new_member' ? 'bg-emerald-50' :
                                                                    notif.type === 'membership_request' ? 'bg-amber-50' : 'bg-slate-50'
                                                                    }`}>
                                                                    {getNotificationIcon(notif.type)}
                                                                </div>
                                                                <div className="flex-1 space-y-0.5">
                                                                    <div className="flex justify-between items-start">
                                                                        <p className={`text-xs font-black ${!notif.read ? 'text-slate-900' : 'text-slate-600'}`}>{notif.title}</p>
                                                                        <span className="text-[9px] font-bold text-slate-400 uppercase">{new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                                    </div>
                                                                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed line-clamp-2">{notif.message}</p>
                                                                    {!notif.read && (
                                                                        <div className="pt-2">
                                                                            <span className="px-2 py-0.5 bg-indigo-600 text-white text-[8px] font-black uppercase rounded-full">New Alert</span>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
                                                <button
                                                    onClick={() => { setShowNotifications(false); navigate('/admin/notifications'); }}
                                                    className="text-[10px] font-black text-slate-400 hover:text-indigo-600 uppercase tracking-widest"
                                                >
                                                    View All Intelligence →
                                                </button>
                                            </div>
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>

                        <Link to="/admin/profile" className="flex items-center gap-3 pl-6 border-l border-slate-100 group">
                            <div>
                                <p className="text-right text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1 group-hover:text-indigo-600 transition-colors">Authenticated</p>
                                <p className="text-xs font-black text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">{user?.firstName} {user?.lastName}</p>
                            </div>
                            <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-sm font-black shadow-lg shadow-indigo-100 group-hover:scale-105 transition-transform">
                                {user?.firstName?.[0]}{user?.lastName?.[0]}
                            </div>
                        </Link>
                    </div>
                </header>

                <main className="flex-1 overflow-x-hidden overflow-y-auto p-8 bg-slate-50/30">
                    <div className="max-w-[1600px] mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;

