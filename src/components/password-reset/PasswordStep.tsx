import { useState } from 'react';
import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button';
import { FormControl, FormControlLabel, FormControlLabelText } from '@/components/ui/form-control';
import { Input, InputField } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { AuthService } from '@/services/authService';
import { PasswordResetState } from '@/app/forgot-password';
import { useRouter } from 'expo-router';

type PasswordStepProps = {
    state: PasswordResetState;
    setState: (newValue: PasswordResetState) => void;
};

const PasswordStep = ({ state, setState }: PasswordStepProps) => {
    const router = useRouter();

    const [form, setForm] = useState({ password: '', confirmation: '' });

    const resetPassword = async (): Promise<void> => {
        if (form.password !== form.confirmation) {
            setState({
                ...state,
                isLoading: false,
                error: 'Les mots de passe ne sont pas les mêmes',
            });

            return;
        }

        try {
            await AuthService.resetPassword({
                email: state.email,
                newPassword: form.password,
            });

            setState({
                ...state,
                code: '',
                isLoading: false,
                error: null,
            });
            router.navigate('/login');
        } catch (error: any) {
            setState({
                ...state,
                isLoading: false,
                error: error.message,
            });
        }
    };

    return (
        <>
            <Text size="sm">
                Choisis un mot de passe d’au moins 12 caractères avec une minuscule, une majuscule,
                un chiffre et un symbole.
            </Text>
            <FormControl isRequired isDisabled={state.isLoading}>
                <FormControlLabel>
                    <FormControlLabelText>Nouveau mot de passe</FormControlLabelText>
                </FormControlLabel>
                <Input>
                    <InputField
                        placeholder="Ton nouveau mot de passe"
                        type="password"
                        autoCorrect={false}
                        autoComplete="new-password"
                        value={form.password}
                        onChangeText={(password: string) =>
                            setForm((previous) => ({ ...previous, password }))
                        }
                    />
                </Input>
            </FormControl>
            <FormControl isRequired isDisabled={state.isLoading}>
                <FormControlLabel>
                    <FormControlLabelText>Confirme le mot de passe</FormControlLabelText>
                </FormControlLabel>
                <Input>
                    <InputField
                        placeholder="Confirme ton nouveau mot de passe"
                        type="password"
                        autoCorrect={false}
                        autoComplete="new-password"
                        returnKeyType="go"
                        value={form.confirmation}
                        onChangeText={(confirmation: string) =>
                            setForm((previous) => ({ ...previous, confirmation }))
                        }
                    />
                </Input>
            </FormControl>
            <Button
                onPress={resetPassword}
                isDisabled={state.isLoading || !form.password || !form.confirmation}
            >
                {state.isLoading && <ButtonSpinner />}
                <ButtonText>Réinitialiser le mot de passe</ButtonText>
            </Button>
        </>
    );
};

export default PasswordStep;
