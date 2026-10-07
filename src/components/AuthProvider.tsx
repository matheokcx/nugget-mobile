import { AuthContext } from '@/hooks/useAuth';
import { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { AuthService, LoginDto, SignUpDto } from '@/services/authService';
import { storage } from '@/lib/storage';
import { User } from '@/types';
import { useRouter } from 'expo-router';

const AuthProvider = ({ children }: PropsWithChildren) => {
    const router = useRouter();

    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);

    const signIn = async (dto: LoginDto): Promise<void> => {
        try {
            const { data: loginResponse } = await AuthService.login(dto);
            const { data: user } = await AuthService.getMe(loginResponse.token);

            setToken(loginResponse.token);
            await storage.setItem('token', loginResponse.token);
            setUser(user);

            router.navigate('/home');
        } catch (error: unknown) {
            throw new Error('Problème rencontré au moment de ta connexion');
        }
    };

    const signup = async (dto: SignUpDto): Promise<void> => {
        try {
            await AuthService.signup(dto).then((response) => router.navigate('/login'));
        } catch (error: unknown) {
            throw new Error('Un problème est survenu au moment de ton inscription');
        }
    };

    const getMe = async (token: string): Promise<User> => {
        try {
            const { data: user } = await AuthService.getMe(token);
            setUser(user);
            return user;
        } catch (error: unknown) {
            setToken(null);
            throw new Error('Un problème est survenu au moment de la récupération de tes infos');
        }
    };

    const signOut = useCallback(async (): Promise<void> => {
        setToken(null);
        setUser(null);
        await AuthService.logout();
    }, [setToken, setUser]);

    useEffect(() => {
        const func = async () => {
            const currentToken: string | null = await storage.getItem('token');

            if (currentToken) {
                setToken(currentToken);
                await getMe(currentToken);
                router.navigate('/home');
            }
        };
        func();
    }, [token]);

    return (
        <AuthContext.Provider
            value={{
                signIn: async (dto: LoginDto) => await signIn(dto),
                signUp: async (dto: SignUpDto) => await signup(dto),
                getMe: async (token: string) => await getMe(token),
                signOut: async () => await signOut(),
                token: token,
                user: user,
                isAuthenticated: token !== null,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
