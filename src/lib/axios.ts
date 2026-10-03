import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { storage } from '@/lib/storage';

export const apiClient: AxiosInstance = axios.create({
    baseURL: process.env.API_URL,
    timeout: 10000,
});

apiClient.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
    const token: string | null = await storage.getItem('token');

    if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

apiClient.interceptors.response.use(
    async (response: AxiosResponse) => response,
    async (error) => {
        if (error.response?.status === 401) {
            await storage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    },
);
