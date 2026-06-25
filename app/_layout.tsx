import React, { useEffect } from 'react';
import { SplashScreen, Stack, useRootNavigationState, useRouter, useSegments } from 'expo-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';

import { queryClient } from '@/source/lib/queryClient';
import { useAuthStore } from '@/source/features/auth/store/auth.store';
import { useAppReady } from '@/source/hooks/useAppReady';
import { ROUTES } from '@/source/shared/constants/routes';

function RootLayoutNav() {
    const { isReady } = useAppReady();
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const segments = useSegments();
    const router = useRouter();

    const rootNavigationState = useRootNavigationState();

    useEffect(() => {
        if (!isReady) return;

        if (!isReady || !rootNavigationState?.key) return;

        const inAuthGroup = segments[0] === '(auth)';

        if (inAuthGroup && isAuthenticated) {
            router.replace(ROUTES.TABS.HOME);
        } else if (!inAuthGroup && !isAuthenticated) {
            router.replace(ROUTES.AUTH.LOGIN);
        }
    }, [isReady, isAuthenticated, segments, rootNavigationState?.key]);

    if (!isReady) {
        return null;
    }

    return (
        <Stack screenOptions={{ headerShown: false }}>
            {/* Auth grubu: login, register, onboarding */}
            <Stack.Screen name="(auth)" />

            {/* Tab navigasyonu */}
            <Stack.Screen name="(tabs)" />

            {/* Auth gerektiren modal/stack sayfalar */}
            <Stack.Screen
                name="(protected)"
                options={{ presentation: 'modal' }}
            />

            {/* 404 */}
            <Stack.Screen name="+not-found" />
        </Stack>
    );
}

export default function RootLayout() {
    return (
        <QueryClientProvider client={queryClient}>
            <StatusBar style="light" />
            <RootLayoutNav />
        </QueryClientProvider>
    );
}
