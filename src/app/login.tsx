import { useState } from 'react';
import { useColorScheme } from 'react-native';
import { Image } from 'expo-image';
import { useAuth } from '@/hooks/useAuth';
import Screen from '@/components/Screen';
import { Input, InputField } from '@/components/ui/input';
import { Button, ButtonText } from '@/components/ui/button';
import { config } from '@/components/ui/gluestack-ui-provider/config';
import { FormControl, FormControlLabel, FormControlLabelText } from '@/components/ui/form-control';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Spinner } from '@/components/ui/spinner';
import { Link } from 'expo-router';
import { Divider } from '@/components/ui/divider';

const LoginPage = () => {
    const { signIn } = useAuth();
    const isDarkMode: boolean = useColorScheme() === 'dark';

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const login = async (): Promise<void> => {
        if (isLoading || !email.trim() || !password) {
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            signIn({
                email: email,
                password: password,
            });
        } catch {
            setError('Connexion impossible. Vérifie tes identifiants et réessaie.');
        }

        setIsLoading(false);
    };

    return (
        <Screen centered keyboardAware>
            <VStack space="md" className="items-center gap-12">
                <Image
                    source={require('../../assets/images/logo.svg')}
                    style={{ width: 100, height: 100 }}
                    contentFit="contain"
                    tintColor={isDarkMode ? config.dark['--foreground'] : undefined}
                    accessible
                    accessibilityLabel="Nugget"
                />
                <Heading size="xl" className="text-center">
                    Heureux de te revoir !
                </Heading>
            </VStack>
            <VStack space="lg">
                <FormControl isRequired isDisabled={isLoading}>
                    <FormControlLabel>
                        <FormControlLabelText>Adresse e-mail</FormControlLabelText>
                    </FormControlLabel>
                    <Input>
                        <InputField
                            accessibilityLabel="Adresse mail"
                            placeholder="ton.prenom@gmail.com"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            autoComplete="email"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </Input>
                </FormControl>
                <FormControl isRequired isDisabled={isLoading}>
                    <FormControlLabel>
                        <FormControlLabelText>Mot de passe</FormControlLabelText>
                    </FormControlLabel>
                    <Input>
                        <InputField
                            accessibilityLabel="Mot de passe"
                            placeholder="Ton mot de passe"
                            type="password"
                            autoCapitalize="none"
                            autoCorrect={false}
                            autoComplete="current-password"
                            returnKeyType="go"
                            onSubmitEditing={login}
                            value={password}
                            onChangeText={setPassword}
                        />
                    </Input>
                </FormControl>
                <Text size="sm" className="text-right">
                    <Link href="/forgot-password">Mot de passe oublié ?</Link>
                </Text>
                {error && (
                    <Text size="sm" className="text-destructive" accessibilityRole="alert">
                        {error}
                    </Text>
                )}

                <Button onPress={login} isDisabled={isLoading || !email.trim() || !password.trim()}>
                    <ButtonText>
                        {isLoading ? <Spinner size="large" color="grey" /> : 'Se connecter'}
                    </ButtonText>
                </Button>

                <Divider />
                <Text className="text-center">
                    Vous n&apos;êtes pas inscrit ?
                    <Link href="/sign-up" className="text-primary">
                        Inscrivez-vous
                    </Link>
                </Text>
            </VStack>
        </Screen>
    );
};

export default LoginPage;
