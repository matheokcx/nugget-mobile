import { useAuth } from '@/hooks/useAuth';
import Screen from '@/components/Screen';
import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import PaymentButton from '@/components/buttons/PaymentButton';

const ProfilePage = () => {
    const { user, signOut } = useAuth();

    if (!user) {
        return null;
    }

    return (
        <Screen>
            <VStack space="sm">
                <Heading size="2xl">Mon profil</Heading>
            </VStack>
            <Card>
                <Heading size="xl">Mes informations</Heading>
                <VStack space="sm">
                    <Text size="sm" className="font-subtitle text-muted-foreground">
                        Nom complet
                    </Text>
                    <Text selectable>{user.fullName}</Text>
                </VStack>
                <VStack space="sm">
                    <Text size="sm" className="font-subtitle text-muted-foreground">
                        Adresse e-mail
                    </Text>
                    <Text selectable>{user.email}</Text>
                </VStack>
                <VStack space="sm">
                    <Text size="sm" className="font-subtitle text-muted-foreground">
                        Rôle
                    </Text>
                    <Text selectable>{user.role}</Text>
                </VStack>
                <VStack space="sm">
                    <Text size="sm" className="font-subtitle text-muted-foreground">
                        Date de création du compte
                    </Text>
                    <Text selectable>
                        {new Date(user.createdAt).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                        })}
                    </Text>
                </VStack>
            </Card>
            <PaymentButton ctaText="Passer à premium" />
            <Button onPress={signOut} variant="destructive">
                <ButtonText>Déconnexion</ButtonText>
            </Button>
        </Screen>
    );
};

export default ProfilePage;
