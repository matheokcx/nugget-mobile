import { createContext, useContext } from 'react';
import { LoginDto, SignUpDto } from '@/services/authService';
import { User } from '@/types';

interface AuthContextType {
    signIn: (dto: LoginDto) => void;
    signUp: (dto: SignUpDto) => void;
    signOut: () => void;
    token: string | null;
    user: User | null;
    isAuthenticated: boolean;
    getMe?: (token: string) => Promise<User>;
}

export const AuthContext = createContext<AuthContextType>({
    signIn: (dto: LoginDto) => {},
    signUp: (dto: SignUpDto) => {},
    signOut: () => {},
    token: null,
    user: null,
    isAuthenticated: false,
});

export const useAuth = () => {
    const context = useContext(AuthContext);
    return { ...context };
};
