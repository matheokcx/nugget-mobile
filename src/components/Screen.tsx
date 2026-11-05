import { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';

type ScreenProps = {
    children: ReactNode;
    centered?: boolean;
    keyboardAware?: boolean;
};

/**
 * Composant global pour appliquer un style commun à toutes les pages et éviter la duplication
 */
const Screen = ({ children, centered = false, keyboardAware = false }: ScreenProps) => (
    <Box className="flex-1 bg-background">
        <SafeAreaView
            style={{ flex: 1 }}
            edges={centered ? ['top', 'left', 'right', 'bottom'] : ['top', 'left', 'right']}
        >
            <KeyboardAvoidingView
                className="flex-1"
                enabled={keyboardAware}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    className="flex-1"
                    contentContainerClassName={
                        centered
                            ? 'flex-grow items-center justify-center px-6 py-8'
                            : 'flex-grow items-center px-6 py-8'
                    }
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <VStack className="w-full max-w-xl" space="2xl">
                        {children}
                    </VStack>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    </Box>
);

export default Screen;
