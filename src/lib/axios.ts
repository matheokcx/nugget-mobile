import axios, { AxiosInstance } from 'axios';

export const apiClient: AxiosInstance = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    timeout: 10000,
});
