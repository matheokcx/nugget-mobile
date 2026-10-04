import { apiClient } from '@/lib/axios';
import { storage } from '@/lib/storage';

export type LoginDto = {
    email: string;
    password: string;
};

export class AuthService {
    static async login(dto: LoginDto): Promise<{ token: string }> {
        const { data } = await apiClient.post('/login', dto);
        return data;
    }

    static async logout(): Promise<void> {
        await storage.removeItem('token');
    }
}
