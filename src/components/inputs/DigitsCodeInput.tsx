import { useState } from 'react';
import { TextInput } from 'react-native';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { PasswordResetState } from '@/app/forgot-password';

type CodeInputProps = {
    state: PasswordResetState;
    setState: (newValue: PasswordResetState) => void;
    onSubmit: () => Promise<void>;
};

const DigitsCodeInput = ({ state, setState, onSubmit }: CodeInputProps) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);

    return (
        <Box className={`relative w-full ${state.isLoading ? 'opacity-50' : ''}`}>
            <HStack space="sm" pointerEvents="none">
                {Array.from({ length: 6 }, (_, index: number) => (
                    <Box
                        key={index}
                        className={`h-14 min-w-0 flex-1 items-center justify-center rounded-md border shadow-xs ${
                            isFocused &&
                            !state.isLoading &&
                            index === Math.min(state.code.length, 5)
                                ? 'border-ring'
                                : 'border-border'
                        }`}
                    >
                        <Text size="xl" className="font-subtitle">
                            {state.code[index] ?? ''}
                        </Text>
                    </Box>
                ))}
            </HStack>
            <TextInput
                className="absolute inset-0 text-transparent web:outline-none"
                keyboardType="number-pad"
                autoComplete="one-time-code"
                maxLength={6}
                autoCorrect={false}
                caretHidden
                editable={!state.isLoading}
                value={state.code}
                onChangeText={(newValue: string) => setState({ ...state, code: newValue })}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                returnKeyType="go"
                onSubmitEditing={onSubmit}
            />
        </Box>
    );
};

export default DigitsCodeInput;
