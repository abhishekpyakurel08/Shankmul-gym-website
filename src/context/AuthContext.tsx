
import React, { createContext, useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';

interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
}

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    login: (token: string, user: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(() => {
        const savedUser = localStorage.getItem('adminUser');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        return !!localStorage.getItem('adminToken');
    });

    const login = (token: string, userData: User) => {
        localStorage.setItem('adminToken', token);
        localStorage.setItem('adminUser', JSON.stringify(userData));
        setUser(userData);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// Protected Route Component
export const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRoles?: string[] }> = ({ children, allowedRoles }) => {
    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        // If user doesn't have the right role, send them to their respective default dashboard
        if (user.role === 'reception') {
            return <Navigate to="/reciption/dashboard" replace />;
        }
        return <Navigate to="/admin/dashboard" replace />;
    }

    return <>{children}</>;
};

