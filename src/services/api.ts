/* eslint-disable @typescript-eslint/no-explicit-any */

// API URL
const BASE_URL = 'https://shankmul-gym-backend.tecobit.cloud/api';

interface ApiResponse<T = any> {
    success: boolean;
    data: T;
    message?: string;
}

export const api = {
    get: async <T = any>(endpoint: string): Promise<ApiResponse<T>> => {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        return response.json();
    },
    post: async <T = any>(endpoint: string, data: any): Promise<ApiResponse<T>> => {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `API error: ${response.status}`);
        }
        return response.json();
    },
    put: async <T = any>(endpoint: string, data: any): Promise<ApiResponse<T>> => {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'PUT',
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `API error: ${response.status}`);
        }
        return response.json();
    },
    patch: async <T = any>(endpoint: string, data: any): Promise<ApiResponse<T>> => {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'PATCH',
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `API error: ${response.status}`);
        }
        return response.json();
    },
    delete: async <T = any>(endpoint: string): Promise<ApiResponse<T>> => {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'DELETE',
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `API error: ${response.status}`);
        }
        return response.json();
    }
};
