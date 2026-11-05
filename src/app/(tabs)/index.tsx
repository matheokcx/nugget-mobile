import { useAuth } from '@/hooks/useAuth';
import Screen from '@/components/Screen';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import PaymentButton from '@/components/buttons/PaymentButton';

const HomePage = () => {
    const { user } = useAuth();

    return (
        <Screen>
            <VStack space="sm">
                <Heading size="2xl">Bienvenue {user?.fullName} !</Heading>
            </VStack>
            <Card>
                <VStack space="sm">
                    <Text size="sm" className="font-subtitle text-muted-foreground">
                        L’essentiel à retenir
                    </Text>
                    <Heading size="xl">Les vidéos passent. Les idées restent.</Heading>
                    <Text className="text-muted-foreground">
                        Nugget transforme les contenus courts en synthèses pour t’aider à
                        comprendre, retenir et apprendre davantage.
                    </Text>
                </VStack>
            </Card>

            <PaymentButton ctaText="Souscrire à l'abonnement" />
        </Screen>
    );
};

export default HomePage;
