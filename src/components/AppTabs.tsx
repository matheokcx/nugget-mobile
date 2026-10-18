import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { useColorScheme } from 'react-native';
import { tokens } from '@/designTokens';
import { config } from '@/components/ui/gluestack-ui-provider/config';

const AppTabs = () => {
    const systemMode = useColorScheme();
    const mode = systemMode === 'dark' ? 'dark' : 'light';
    const theme = config[mode];

    return (
        <NativeTabs
            tintColor={theme['--foreground']}
            backgroundColor={theme['--background']}
            labelStyle={{ fontFamily: tokens.fonts.text }}
        >
            <NativeTabs.Trigger name="index">
                <NativeTabs.Trigger.Label>Accueil</NativeTabs.Trigger.Label>
                <NativeTabs.Trigger.Icon
                    src={require('@/assets/images/tabIcons/home.png')}
                    renderingMode="template"
                />
            </NativeTabs.Trigger>
        </NativeTabs>
    );
};

export default AppTabs;
