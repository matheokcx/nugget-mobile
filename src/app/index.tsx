import { StyleSheet, View, Text, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const bottomTabInset: number = Platform.select({ ios: 50, android: 80 }) ?? 0;

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <Text style={styles.title}>Welcome to Expo</Text>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    safeArea: {
        flex: 1,
        paddingHorizontal: 24,
        alignItems: 'center',
        gap: 16,
        paddingBottom: bottomTabInset + 16,
        maxWidth: 800,
    },
    title: {
        textAlign: 'center',
    },
});

export default HomeScreen;
