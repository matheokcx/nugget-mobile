import { StyleSheet, View, Text, Platform } from 'react-native';
import { tokens } from '@/designTokens';

const HomeScreen = () => {
    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Nugget</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        maxWidth: 800,
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
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
