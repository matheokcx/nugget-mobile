import { View, TextInput, Button, Platform } from 'react-native';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

const LoginPage = () => {
    const { signIn } = useAuth();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    return (
        <View
            style={{
                maxWidth: 800,
                flex: 1,
                gap: 12,
                justifyContent: 'center',
                flexDirection: 'column',
                paddingHorizontal: 24,
                paddingVertical: (Platform.select({ ios: 50, android: 80 }) ?? 0) + 16,
            }}
        >
            <TextInput
                value={email}
                onChangeText={(newValue: string) => setEmail(newValue)}
                maxLength={150}
                placeholder="Ton adresse mail"
            />
            <TextInput
                value={password}
                onChangeText={(newValue: string) => setPassword(newValue)}
                maxLength={100}
                placeholder="Ton mot de passe"
            />
            <Button title="Connexion" onPress={() => signIn({ email, password })} />
        </View>
    );
};

export default LoginPage;
