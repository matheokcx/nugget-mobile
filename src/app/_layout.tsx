import { View } from 'react-native';
import AppTabs from '@/components/app-tabs';
import * as SplashScreen from 'expo-splash-screen';
import { AnimatedSplashOverlay } from '@/components/animated-icon';

SplashScreen.preventAutoHideAsync();

const TabLayout = () => {
  return (
    <View>
      <AnimatedSplashOverlay />
      <AppTabs />
    </View>
  );
};

export default TabLayout;
