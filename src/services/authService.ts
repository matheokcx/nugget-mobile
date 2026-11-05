import { apiClient } from '@/lib/axios';
import { User } from '@/types';
import { storage } from '@/lib/storage';
import { AxiosResponse } from 'axios';

export type LoginDto = {
    email: string;
    password: string;
};

export type SignUpDto = {
    fullName: string;
    email: string;
    password: string;
};

export type ForgotPasswordDto = {
    email: string;
};

export type ConfirmResetDto = ForgotPasswordDto & {
    code: string;
};

export type ResetPasswordDto = ForgotPasswordDto & {
    newPassword: string;
};

export class AuthService {
    static async login(dto: LoginDto): Promise<AxiosResponse<{ token: string }>> {
        return await apiClient.post('/auth/login', dto);
    }

    static async signup(dto: SignUpDto): Promise<AxiosResponse<User>> {
        return await apiClient.post<User>('/auth/signup', dto);
    }

    static async getMe(token: string): Promise<AxiosResponse<User>> {
        return await apiClient.get<User>('/auth/profile', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    static async logout(): Promise<void> {
        await storage.removeItem('token');
    }

    static async forgotPassword(dto: ForgotPasswordDto): Promise<AxiosResponse<void>> {
        return await apiClient.post<void>('/auth/forgot-password', dto);
    }

    static async confirmReset(dto: ConfirmResetDto): Promise<AxiosResponse<void>> {
        return await apiClient.post<void>('/auth/confirm-reset', dto);
    }

    static async resetPassword(dto: ResetPasswordDto): Promise<AxiosResponse<void>> {
        return await apiClient.patch<void>('/auth/reset-password', dto);
    }
}
