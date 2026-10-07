import { StyleSheet, View, Text, Platform, Button } from 'react-native';
import { tokens } from '@/designTokens';
import { useRouter } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';

const HomeScreen = () => {
    const router = useRouter();
    const { user } = useAuth();

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Nugget</Text>
            {user && <Text>{user.email}</Text>}
            <Button title="Se connecter" onPress={() => router.navigate('/login')} />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        maxWidth: 800,
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        paddingHorizontal: 24,
        paddingVertical: (Platform.select({ ios: 50, android: 80 }) ?? 0) + 16,
    },
    title: {
        textAlign: 'center',
        fontSize: 32,
        color: tokens.colors.text.primary,
    },
});

export default HomeScreen;
