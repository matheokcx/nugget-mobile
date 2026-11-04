import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Screen from '@/components/Screen';
import { Input, InputField } from '@/components/ui/input';
import { Button, ButtonText } from '@/components/ui/button';
import { FormControl, FormControlLabel, FormControlLabelText } from '@/components/ui/form-control';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Spinner } from '@/components/ui/spinner';
import { Link } from 'expo-router';
import { Divider } from '@/components/ui/divider';
import { Image } from 'expo-image';
import { config } from '@/components/ui/gluestack-ui-provider/config';
import { useColorScheme } from 'react-native';

const SignUpPage = () => {
    const { signUp } = useAuth();
    const isDarkMode: boolean = useColorScheme() === 'dark';

    const [fullName, setFullName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const canSubmit: boolean =
        !isLoading &&
        fullName.trim().length > 0 &&
        email.trim().length > 0 &&
        password.trim().length > 0;

    const handleSubmit = async (): Promise<void> => {
        if (isLoading) {
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            signUp({
                fullName: fullName,
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
                    Pas encore de compte chez nous ?
                </Heading>
            </VStack>
            <VStack space="lg">
                <FormControl isRequired isDisabled={isLoading}>
                    <FormControlLabel>
                        <FormControlLabelText>Ton nom</FormControlLabelText>
                    </FormControlLabel>
                    <Input>
                        <InputField
                            accessibilityLabel="Ton nom complet"
                            placeholder="Alex kane"
                            autoCapitalize="sentences"
                            autoCorrect={false}
                            value={fullName}
                            onChangeText={setFullName}
                        />
                    </Input>
                </FormControl>
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
                            onSubmitEditing={handleSubmit}
                            value={password}
                            onChangeText={setPassword}
                        />
                    </Input>
                </FormControl>
                {error && (
                    <Text size="sm" className="text-destructive" accessibilityRole="alert">
                        {error}
                    </Text>
                )}
                <Button onPress={handleSubmit} isDisabled={!canSubmit}>
                    <ButtonText>
                        {isLoading ? <Spinner size="large" color="grey" /> : "S'inscrire"}
                    </ButtonText>
                </Button>
                <Divider />
                <Text className="text-center">
                    Vous êtes déjà inscrit ?{' '}
                    <Link href="/login" className="text-primary">
                        connectez-vous
                    </Link>
                </Text>
            </VStack>
        </Screen>
    );
};

export default SignUpPage;
