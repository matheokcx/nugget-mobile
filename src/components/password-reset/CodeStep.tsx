import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button';
import { FormControl, FormControlLabel, FormControlLabelText } from '@/components/ui/form-control';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import DigitsCodeInput from '../inputs/DigitsCodeInput';
import { AuthService } from '@/services/authService';
import { PasswordResetState } from '@/app/forgot-password';

type CodeStepProps = {
    state: PasswordResetState;
    setState: (newValue: PasswordResetState) => void;
    sendCode: () => void;
};

const CodeStep = ({ state, setState, sendCode }: CodeStepProps) => {
    const verifyCode = async (): Promise<void> => {
        try {
            await AuthService.confirmReset({ email: state.email, code: state.code });
            setState({
                ...state,
                step: 'password',
                code: state.code,
                isLoading: false,
                error: null,
            });
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
            <FormControl isRequired isDisabled={state.isLoading}>
                <FormControlLabel>
                    <FormControlLabelText>Code de vérification</FormControlLabelText>
                </FormControlLabel>
                <DigitsCodeInput state={state} setState={setState} onSubmit={verifyCode} />
            </FormControl>
            <Button onPress={verifyCode} isDisabled={state.isLoading || state.code.length !== 6}>
                {state.isLoading && <ButtonSpinner />}
                <ButtonText>Vérifier le code</ButtonText>
            </Button>
            <VStack space="sm" className="border-t border-border pt-4">
                <Text size="sm" className="text-center text-muted-foreground">
                    Tu n’as pas reçu le code ?
                </Text>
                <Button variant="outline" onPress={sendCode} isDisabled={state.isLoading}>
                    <ButtonText>Renvoyer un code</ButtonText>
                </Button>
            </VStack>
        </>
    );
};

export default CodeStep;
