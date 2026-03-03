/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';

// Queries
export const useDashboardSummary = () => {
    return useQuery({
        queryKey: ['dashboard', 'summary'],
        queryFn: async () => {
            const response = await api.get('/dashboard/summary');
            return response.data;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

export const useTodayAttendance = () => {
    return useQuery({
        queryKey: ['attendance', 'today'],
        queryFn: async () => {
            const response = await api.get('/attendance/admin/today');
            return response.data || [];
        },
        staleTime: 1000 * 60 * 2, // 2 minutes for attendance
    });
};

export const useAbsentMembers = () => {
    return useQuery({
        queryKey: ['attendance', 'absent'],
        queryFn: async () => {
            const response = await api.get('/attendance/admin/absent');
            return response.data || [];
        },
        staleTime: 1000 * 60 * 5,
    });
};

export const useUsers = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const response = await api.get('/auth/users');
            return response.data || [];
        },
    });
};

export const useWeeklyStats = (range: string = '7d') => {
    return useQuery({
        queryKey: ['dashboard', 'stats', range],
        queryFn: async () => {
            const response = await api.get(`/finance/stats?range=${range}`);
            return Array.isArray(response.data) ? response.data : (response.data?.chartData || []);
        },
        staleTime: 1000 * 60 * 10, // Stats can be cached longer (10 mins)
    });
};



export const useMemberAttendanceHistory = (userId: string) => {
    return useQuery({
        queryKey: ['attendance', 'history', userId],
        queryFn: async () => {
            const response = await api.get(`/attendance/admin/history/${userId}`);
            return response.data || [];
        },
        enabled: !!userId,
    });
};

export const useFinancialStats = () => {
    return useQuery({
        queryKey: ['finance', 'stats'],
        queryFn: async () => {
            const response = await api.get('/finance/stats');
            return response.data;
        },
    });
};

export const useDailyStats = () => {
    return useQuery({
        queryKey: ['finance', 'daily'],
        queryFn: async () => {
            const response = await api.get('/finance/stats/daily');
            return response.data || [];
        },
    });
};

export const useTransactions = (limit = 50) => {
    return useQuery({
        queryKey: ['finance', 'transactions', { limit }],
        queryFn: async () => {
            const response = await api.get(`/finance/transactions?limit=${limit}`);
            return response.data || [];
        },
    });
};



export const useNotifications = (limit = 50) => {
    return useQuery({
        queryKey: ['notifications', 'list', { limit }],
        queryFn: async () => {
            const response = await api.get(`/notifications?limit=${limit}`);
            return response.data || [];
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

export const useProfile = () => {
    return useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            const response = await api.get('/auth/me');
            return response.data;
        },
    });
};

export const useGymSettings = () => {
    return useQuery({
        queryKey: ['gym-settings'],
        queryFn: async () => {
            const response = await api.get('/gym-settings');
            return response.data;
        }
    });
};

export const useGymStatus = () => {
    return useQuery({
        queryKey: ['gym-status'],
        queryFn: async () => {
            const response = await api.get('/gym-settings/status');
            return response.data;
        },
        refetchInterval: 60000,
    });
};

// Mutations
export const useApproveMembership = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (userId: string) => api.put(`/auth/membership/approve/${userId}`, {}),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            queryClient.invalidateQueries({ queryKey: ['dashboard', 'summary'] });
        },
    });
};



export const useAddTransaction = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: any) => api.post('/finance/transactions/add', data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['dashboard', 'summary'] });
            queryClient.invalidateQueries({ queryKey: ['finance'] });
        },
    });
};



export const useSendCustomNotification = () => {
    return useMutation({
        mutationFn: (data: { userIds: string[], title: string, message: string }) => api.post('/notifications/selected', data),
    });
};

export const useSendBroadcastNotification = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: { title: string, message: string }) => api.post('/notifications/broadcast', data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notifications'] });
        },
    });
};

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: any) => api.put('/auth/me', data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profile'] });
        },
    });
};

export const useClockIn = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (userId: string) => api.post('/attendance/admin/clock-in', { userId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['attendance'] });
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
        },
    });
};

export const useClockOut = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (userId: string) => api.post('/attendance/admin/clock-out', { userId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['attendance'] });
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
        },
    });
};

export const useToggleUserStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (userId: string) => api.patch(`/admin/user/${userId}/toggle-status`, {}),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (userId: string) => api.delete(`/admin/user/${userId}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
        },
    });
};

export const useDeleteAttendance = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => api.delete(`/attendance/admin/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['attendance'] });
        },
    });
};

export const useUpdateGymSettings = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: any) => api.put('/gym-settings', data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['gym-settings'] });
            queryClient.invalidateQueries({ queryKey: ['gym-status'] });
        },
    });
};

export const useRegisterMember = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: any) => api.post('/auth/register', data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
        },
    });
};
