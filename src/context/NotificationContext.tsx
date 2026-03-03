/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './AuthContext';
import { api } from '../services/api';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export interface Notification {
    id: string;
    _id?: string;
    type: 'membership_approved' | 'membership_expired' | 'clock_in' | 'clock_out' | 'system' | 'reminder' | 'announcement' | 'new_member' | 'membership_request' | 'expiry_warning' | 'inactivity_reminder';
    title: string;
    message: string;
    data?: any;
    createdAt: string;
    read: boolean;
}

interface NotificationContextType {
    notifications: Notification[];
    unreadCount: number;
    isConnected: boolean;
    markAsRead: (id: string) => Promise<void>;
    markAllAsRead: () => Promise<void>;
    deleteNotification: (id: string) => Promise<void>;
    addLocalNotification: (notif: any) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated, user } = useAuth();
    const queryClient = useQueryClient();
    const [localNotifications, setLocalNotifications] = useState<Notification[]>([]);
    const [isConnected, setIsConnected] = useState(false);
    const [socket, setSocket] = useState<Socket | null>(null);

    const { data: fetchedNotifications } = useQuery({
        queryKey: ['notifications', 'list', { limit: 50 }],
        queryFn: async () => {
            const response = await api.get('/notifications?limit=50');
            return response.data || [];
        },
        enabled: isAuthenticated && !!user,
        staleTime: 1000 * 60 * 5,
    });

    // Merge fetched and local notifications
    const notifications = fetchedNotifications ? [...localNotifications, ...fetchedNotifications] : localNotifications;

    useEffect(() => {
        if (!isAuthenticated || !user) {
            if (socket) {
                socket.disconnect();
                setSocket(null);
            }
            setLocalNotifications([]);
            return;
        }

        const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
        const newSocket = io(BACKEND_URL, {
            query: {
                userId: user.id,
                role: user.role,
                token: localStorage.getItem('adminToken')
            }
        });

        newSocket.on('connect', () => setIsConnected(true));
        newSocket.on('disconnect', () => setIsConnected(false));

        newSocket.on('notification', (notif: Notification) => {
            setLocalNotifications(prev => [notif, ...prev]);
            try {
                const audio = new Audio('/notification-pop.mp3');
                audio.play().catch(() => { });
            } catch (e) { }
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [isAuthenticated, user]);

    const markAsRead = async (id: string) => {
        try {
            const response = await api.put(`/notifications/${id}/read`, {});
            if (response.success) {
                setLocalNotifications(prev => prev.map(n => n._id === id ? { ...n, read: true } : n));
                queryClient.invalidateQueries({ queryKey: ['notifications'] });
            }
        } catch (error) {
            console.error('Failed to mark as read:', error);
        }
    };

    const markAllAsRead = async () => {
        try {
            const response = await api.put('/notifications/read-all', {});
            if (response.success) {
                setLocalNotifications(prev => prev.map(n => ({ ...n, read: true })));
                queryClient.invalidateQueries({ queryKey: ['notifications'] });
            }
        } catch (error) {
            console.error('Failed to mark all as read:', error);
        }
    };

    const deleteNotification = async (id: string) => {
        try {
            const response = await api.delete(`/notifications/${id}`);
            if (response.success) {
                setLocalNotifications(prev => prev.filter(n => n._id !== id));
                queryClient.invalidateQueries({ queryKey: ['notifications'] });
            }
        } catch (error) {
            console.error('Failed to delete notification:', error);
        }
    };

    const addLocalNotification = (notif: any) => {
        setLocalNotifications(prev => [notif, ...prev]);
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <NotificationContext.Provider value={{
            notifications,
            unreadCount,
            isConnected,
            markAsRead,
            markAllAsRead,
            deleteNotification,
            addLocalNotification
        }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotifications must be used within a NotificationProvider');
    }
    return context;
};
