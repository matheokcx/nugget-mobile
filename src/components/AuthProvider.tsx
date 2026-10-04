import { AuthContext } from '@/hooks/useAuth';
import { PropsWithChildren, useEffect, useState } from 'react';
import { AuthService, LoginDto } from '@/services/authService';
import { storage } from '@/lib/storage';

const AuthProvider = ({ children }: PropsWithChildren) => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const func = async () => {
            const token = await storage.getItem('token');
            setToken(token);
        };
        func();
    });

    return (
        <AuthContext.Provider
            value={{
                signIn: async (dto: LoginDto) => await AuthService.login(dto),
                signOut: async () => await AuthService.logout(),
                token: token,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
