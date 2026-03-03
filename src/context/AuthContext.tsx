import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

// Protected Route Component
export const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRoles?: string[] }> = ({ children, allowedRoles }) => {
    const { isAuthenticated, user } = useAuthStore();

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        // If user doesn't have the right role, send them to their respective default dashboard
        if (user.role === 'reception') {
            return <Navigate to="/reception/dashboard" replace />;
        }
        return <Navigate to="/admin/dashboard" replace />;
    }

    return <>{children}</>;
};

// Legacy AuthProvider for compatibility (can be removed once all components are migrated)
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <>{children}</>;
};

// Legacy useAuth hook for compatibility
export const useAuth = () => {
    return useAuthStore();
};
