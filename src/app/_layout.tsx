import '../global.css';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import AuthProvider from '@/components/AuthProvider';
import { Stack } from 'expo-router';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import Purchases, { LOG_LEVEL } from 'react-native-purchases';
import { Platform } from 'react-native';

SplashScreen.preventAutoHideAsync();

const TabLayout = () => {
    const [loaded, error] = useFonts({
        'BricolageGrotesque-ExtraLight': require('../../assets/fonts/bricolage-grotesque/BricolageGrotesque-ExtraLight.ttf'),
        'BricolageGrotesque-Light': require('../../assets/fonts/bricolage-grotesque/BricolageGrotesque-Light.ttf'),
        'BricolageGrotesque-Regular': require('../../assets/fonts/bricolage-grotesque/BricolageGrotesque-Regular.ttf'),
        'BricolageGrotesque-Medium': require('../../assets/fonts/bricolage-grotesque/BricolageGrotesque-Medium.ttf'),
        'BricolageGrotesque-SemiBold': require('../../assets/fonts/bricolage-grotesque/BricolageGrotesque-SemiBold.ttf'),
        'BricolageGrotesque-Bold': require('../../assets/fonts/bricolage-grotesque/BricolageGrotesque-Bold.ttf'),
        'BricolageGrotesque-ExtraBold': require('../../assets/fonts/bricolage-grotesque/BricolageGrotesque-ExtraBold.ttf'),
        'Figtree-Light': require('../../assets/fonts/figtree/Figtree-Light.ttf'),
        'Figtree-LightItalic': require('../../assets/fonts/figtree/Figtree-LightItalic.ttf'),
        'Figtree-Regular': require('../../assets/fonts/figtree/Figtree-Regular.ttf'),
        'Figtree-Italic': require('../../assets/fonts/figtree/Figtree-Italic.ttf'),
        'Figtree-Medium': require('../../assets/fonts/figtree/Figtree-Medium.ttf'),
        'Figtree-MediumItalic': require('../../assets/fonts/figtree/Figtree-MediumItalic.ttf'),
        'Figtree-SemiBold': require('../../assets/fonts/figtree/Figtree-SemiBold.ttf'),
        'Figtree-SemiBoldItalic': require('../../assets/fonts/figtree/Figtree-SemiBoldItalic.ttf'),
        'Figtree-Bold': require('../../assets/fonts/figtree/Figtree-Bold.ttf'),
        'Figtree-BoldItalic': require('../../assets/fonts/figtree/Figtree-BoldItalic.ttf'),
        'Figtree-ExtraBold': require('../../assets/fonts/figtree/Figtree-ExtraBold.ttf'),
        'Figtree-ExtraBoldItalic': require('../../assets/fonts/figtree/Figtree-ExtraBoldItalic.ttf'),
        'Figtree-Black': require('../../assets/fonts/figtree/Figtree-Black.ttf'),
        'Figtree-BlackItalic': require('../../assets/fonts/figtree/Figtree-BlackItalic.ttf'),
    });

    // Chargement des polices d'écritures en asynchrone pour le dev
    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    useEffect(() => {
        Purchases.setLogLevel(LOG_LEVEL.VERBOSE);

        const iosApiKey: string = process.env.EXPO_PUBLIC_IOS_API_KEY ?? '';
        const androidApiKey: string = process.env.EXPO_PUBLIC_ANDROID_API_KEY ?? '';

        if (Platform.OS === 'ios') {
            Purchases.configure({ apiKey: iosApiKey });
        } else if (Platform.OS === 'android') {
            Purchases.configure({ apiKey: androidApiKey });
        }
    }, []);

    if (!loaded && !error) {
        return null;
    }

    return (
        <GluestackUIProvider>
            <AuthProvider>
                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="(tabs)" />
                    <Stack.Screen name="login" />
                    <Stack.Screen name="sign-up" />
                </Stack>
            </AuthProvider>
        </GluestackUIProvider>
    );
};

export default TabLayout;
