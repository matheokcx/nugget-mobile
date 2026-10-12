import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Input, InputField } from '@/components/ui/input';
import { Button, ButtonText } from '@/components/ui/button';
import { FormControl } from '@/components/ui/form-control';
import { VStack } from '@/components/ui/vstack';
import { Center } from '@/components/ui/center';

const LoginPage = () => {
    const { signIn } = useAuth();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const login = (): void => signIn({ email, password });

    return (
        <Center className="h-full bg-background">
            <FormControl isRequired={true}>
                <VStack className="w-full bg-background" space="md">
                    <Input>
                        <InputField
                            placeholder="Ton adresse mail"
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />
                    </Input>
                    <Input>
                        <InputField
                            placeholder="Ton solide mot de passe"
                            type="password"
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                        />
                    </Input>
                    <Button onPress={login}>
                        <ButtonText>Connexion</ButtonText>
                    </Button>
                </VStack>
            </FormControl>
        </Center>
    );
};

export default LoginPage;
