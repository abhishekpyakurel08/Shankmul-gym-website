/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './AuthContext';
import { api } from '../services/api';

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
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isConnected, setIsConnected] = useState(false);
    const [socket, setSocket] = useState<Socket | null>(null);

    const fetchNotifications = useCallback(async () => {
        try {
            const response = await api.get('/notifications');
            if (response.success) {
                setNotifications(response.data);
            }
        } catch (error) {
            console.error('Failed to fetch notifications:', error);
        }
    }, []);

    useEffect(() => {
        if (!isAuthenticated || !user) {
            if (socket) {
                socket.disconnect();
                setSocket(null);
            }
            setNotifications([]);
            return;
        }

        fetchNotifications();

        const BACKEND_URL = 'https://shankmul-gym-backend.tecobit.cloud';
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
            setNotifications(prev => [notif, ...prev]);
            // Play a soft notification sound if desired
            try {
                const audio = new Audio('/notification-pop.mp3');
                audio.play().catch(() => { });
            } catch (e) { }
        });

        // Global admin events that might need global handling
        newSocket.on('user_clock_in', (data: any) => {
            console.log('Global Clock In Event:', data);
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [isAuthenticated, user, fetchNotifications]);

    const markAsRead = async (id: string) => {
        try {
            const response = await api.put(`/notifications/${id}/read`, {});
            if (response.success) {
                setNotifications(prev =>
                    prev.map(n => n._id === id ? { ...n, read: true } : n)
                );
            }
        } catch (error) {
            console.error('Failed to mark as read:', error);
        }
    };

    const markAllAsRead = async () => {
        try {
            const response = await api.put('/notifications/read-all', {});
            if (response.success) {
                setNotifications(prev =>
                    prev.map(n => ({ ...n, read: true }))
                );
            }
        } catch (error) {
            console.error('Failed to mark all as read:', error);
        }
    };

    const deleteNotification = async (id: string) => {
        try {
            const response = await api.delete(`/notifications/${id}`);
            if (response.success) {
                setNotifications(prev => prev.filter(n => n._id !== id));
            }
        } catch (error) {
            console.error('Failed to delete notification:', error);
        }
    };

    const addLocalNotification = (notif: any) => {
        setNotifications(prev => [notif, ...prev]);
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
