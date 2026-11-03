import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button';
import { FormControl, FormControlLabel, FormControlLabelText } from '@/components/ui/form-control';
import { Input, InputField } from '@/components/ui/input';
import { PasswordResetState } from '@/app/forgot-password';

type EmailStepProps = {
    state: PasswordResetState;
    setState: (newValue: PasswordResetState) => void;
    sendCode: () => void;
};

const EmailStep = ({ state, setState, sendCode }: EmailStepProps) => {
    return (
        <>
            <FormControl isRequired isDisabled={state.isLoading}>
                <FormControlLabel>
                    <FormControlLabelText>Adresse e-mail</FormControlLabelText>
                </FormControlLabel>
                <Input>
                    <InputField
                        accessibilityLabel="Adresse e-mail"
                        placeholder="ton.prenom@gmail.com"
                        keyboardType="email-address"
                        autoCorrect={false}
                        autoComplete="email"
                        returnKeyType="go"
                        onSubmitEditing={sendCode}
                        value={state.email}
                        onChangeText={(newValue: string) => setState({ ...state, email: newValue })}
                    />
                </Input>
            </FormControl>
            <Button onPress={sendCode} isDisabled={state.isLoading || !state.email.trim()}>
                {state.isLoading && <ButtonSpinner />}
                <ButtonText>Recevoir le code</ButtonText>
            </Button>
        </>
    );
};

export default EmailStep;
