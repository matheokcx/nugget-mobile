import { useState } from 'react';
import { isAxiosError } from 'axios';
import { router } from 'expo-router';
import Screen from '@/components/Screen';
import CodeStep from '@/components/password-reset/CodeStep';
import EmailStep from '@/components/password-reset/EmailStep';
import PasswordStep from '@/components/password-reset/PasswordStep';
import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { AuthService } from '@/services/authService';

export type PasswordResetState = {
    step: 'email' | 'code' | 'password';
    email: string;
    code: string;
    isLoading: boolean;
    error: string | null;
};

const ForgotPasswordPage = () => {
    const [currentState, setCurrentState] = useState<PasswordResetState>({
        step: 'email',
        email: '',
        code: '',
        isLoading: false,
        error: null,
    });

    const sendCode = async (): Promise<void> => {
        try {
            await AuthService.forgotPassword({ email: currentState.email.trim() });
            setCurrentState({
                step: 'code',
                email: currentState.email.trim(),
                code: '',
                isLoading: false,
                error: null,
            });
        } catch (error: any) {
            setCurrentState({
                ...currentState,
                isLoading: false,
                error: error.message,
            });
        }
    };

    return (
        <Screen centered keyboardAware>
            <Card>
                <Heading size="lg" className="text-center">
                    Mot de passe oublié
                </Heading>
                <VStack space="lg">
                    {currentState.error && (
                        <Text size="sm" className="text-destructive">
                            {currentState.error}
                        </Text>
                    )}
                    {currentState.step === 'email' && (
                        <EmailStep
                            state={currentState}
                            setState={setCurrentState}
                            sendCode={sendCode}
                        />
                    )}
                    {currentState.step === 'code' && (
                        <CodeStep
                            state={currentState}
                            setState={setCurrentState}
                            sendCode={sendCode}
                        />
                    )}
                    {currentState.step === 'password' && (
                        <PasswordStep state={currentState} setState={setCurrentState} />
                    )}
                    {currentState.step !== 'code' && (
                        <Button
                            variant="outline"
                            onPress={() => router.replace('/login')}
                            isDisabled={currentState.isLoading}
                        >
                            <ButtonText>Retour à la connexion</ButtonText>
                        </Button>
                    )}
                </VStack>
            </Card>
        </Screen>
    );
};

export default ForgotPasswordPage;
