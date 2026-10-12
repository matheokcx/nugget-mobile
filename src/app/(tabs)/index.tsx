import { Text } from 'react-native';
import { useAuth } from '@/hooks/useAuth';
import { Button, ButtonText } from '@/components/ui/button';
import { VStack } from '@/components/ui/vstack';

const HomePage = () => {
    const { signOut } = useAuth();

    return (
        <VStack>
            <Text>izdidzqv</Text>
            <Button onPress={signOut}>
                <ButtonText>Se déconnecter</ButtonText>
            </Button>
        </VStack>
    );
};

export default HomePage;
