import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Screen from '@/components/Screen';
import { Input, InputField } from '@/components/ui/input';
import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FormControl, FormControlLabel, FormControlLabelText } from '@/components/ui/form-control';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Spinner } from '@/components/ui/spinner';
import { Link } from 'expo-router';

const SignUpPage = () => {
    const { signUp } = useAuth();

    const [fullName, setFullName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

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
            <Card>
                <VStack space="sm">
                    <Heading size="lg" className="text-center">
                        Inscription
                    </Heading>
                </VStack>
                <VStack space="lg">
                    <FormControl isRequired isDisabled={isLoading}>
                        <FormControlLabel>
                            <FormControlLabelText>Ton nom complet</FormControlLabelText>
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
                    <Text>
                        Vous êtes déjà inscrit ? <Link href="/login">connectez-vous</Link>
                    </Text>
                    <Button onPress={handleSubmit} isDisabled={isLoading}>
                        <ButtonText>
                            {isLoading ? <Spinner size="large" color="grey" /> : 'Se connecter'}
                        </ButtonText>
                    </Button>
                </VStack>
            </Card>
        </Screen>
    );
};

export default SignUpPage;
