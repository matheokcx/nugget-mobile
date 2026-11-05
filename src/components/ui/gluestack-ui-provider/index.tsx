import React, { useEffect } from 'react';
import { Appearance, useColorScheme, View, type ViewProps } from 'react-native';
import { OverlayProvider } from '@gluestack-ui/core/overlay/creator';
import { ToastProvider } from '@gluestack-ui/core/toast/creator';
import { VariableContextProvider } from 'nativewind';
import { config } from './config';

export type ModeType = 'light' | 'dark' | 'system';

export function GluestackUIProvider({
    mode = 'system',
    ...props
}: {
    mode?: ModeType;
    children?: React.ReactNode;
    style?: ViewProps['style'];
}) {
    const systemMode = useColorScheme();
    const colorMode = mode === 'system' ? (systemMode === 'dark' ? 'dark' : 'light') : mode;
    useEffect(() => {
        Appearance.setColorScheme(mode === 'system' ? 'unspecified' : mode);
    }, [mode]);

    return (
        <VariableContextProvider value={config[colorMode]}>
            <View
                className="bg-background font-body"
                style={[{ flex: 1, height: '100%', width: '100%' }, props.style]}
            >
                <OverlayProvider>
                    <ToastProvider>{props.children}</ToastProvider>
                </OverlayProvider>
            </View>
        </VariableContextProvider>
    );
}
