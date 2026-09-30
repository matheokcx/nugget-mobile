import { View } from 'react-native';
import AppTabs from '@/components/app-tabs';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const TabLayout = () => {
    return (
        <View style={{ width: '100%', height: '100%' }}>
            <AppTabs />
        </View>
    );
};

export default TabLayout;
