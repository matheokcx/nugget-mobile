import { AxiosInstance, create } from 'axios';

export const apiClient: AxiosInstance = create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    timeout: 10000,
});

export const setAuthToken = (token: string | null): void => {
    if (token === null) {
        delete apiClient.defaults.headers.common.Authorization;
        return;
    }

    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
};
