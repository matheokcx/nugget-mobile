import { use, createContext } from 'react';
import { LoginDto } from '@/services/authService';

interface AuthContextType {
    signIn: (dto: LoginDto) => Promise<{ token: string }>;
    signOut: () => Promise<void>;
    token?: string | null;
}
export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    const value = use(AuthContext);

    if (!value) {
        throw new Error('useSession must be wrapped in a <SessionProvider />');
    }

    return value;
};
