'use client';
import React, { useEffect, useLayoutEffect } from 'react';
import { OverlayProvider } from '@gluestack-ui/core/overlay/creator';
import { ToastProvider } from '@gluestack-ui/core/toast/creator';
import { script } from './script';
import { View, useColorScheme } from 'react-native';
import { VariableContextProvider } from 'nativewind';
import { config } from './config';

export type ModeType = 'light' | 'dark' | 'system';

export const useSafeLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function GluestackUIProvider({
    mode = 'system',
    ...props
}: {
    mode?: ModeType;
    children?: React.ReactNode;
}) {
    const systemMode = useColorScheme();
    const colorMode = mode === 'system' ? (systemMode === 'dark' ? 'dark' : 'light') : mode;
    const handleMediaQuery = React.useCallback((e: MediaQueryListEvent) => {
        script(e.matches ? 'dark' : 'light');
    }, []);

    useSafeLayoutEffect(() => {
        if (mode !== 'system') {
            const documentElement = document.documentElement;
            if (documentElement) {
                documentElement.classList.add(mode);
                documentElement.classList.remove(mode === 'light' ? 'dark' : 'light');
                documentElement.style.colorScheme = mode;
            }
        }
    }, [mode]);

    useSafeLayoutEffect(() => {
        if (mode !== 'system') return;
        const media = window.matchMedia('(prefers-color-scheme: dark)');

        media.addListener(handleMediaQuery);

        return () => media.removeListener(handleMediaQuery);
    }, [handleMediaQuery, mode]);

    return (
        <>
            <script
                suppressHydrationWarning
                dangerouslySetInnerHTML={{
                    __html: `(${script.toString()})('${mode}')`,
                }}
            />
            <VariableContextProvider value={config[colorMode]}>
                <View className="flex-1 h-full w-full bg-background font-body">
                    <OverlayProvider>
                        <ToastProvider>{props.children}</ToastProvider>
                    </OverlayProvider>
                </View>
            </VariableContextProvider>
        </>
    );
}
