import React, { useEffect } from 'react';
import { Stack, useRootNavigationState, useRouter, useSegments } from 'expo-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';

import { queryClient } from '@/source/lib/queryClient';
import { useAuthStore } from '@/source/features/auth/store/auth.store';
import { useAppReady } from '@/source/hooks/useAppReady';
import { ROUTES } from '@/source/shared/constants/routes';

// Splash screen'i JS yüklenene kadar göster.
// hideAsync() useAppReady hook'u içinde çağrılır.

/**
 * RootLayout
 *
 * Tüm uygulamanın wrapper'ı. Sorumlulukları:
 * 1. Provider'ları kurar (QueryClient)
 * 2. useAppReady ile token kontrolü + splash yönetimi yapar
 * 3. isAuthenticated değişince uygun route grubuna yönlendirir
 *
 * useSegments → mevcut route grubunu verir: ["(auth)"] veya ["(tabs)"] gibi
 * useRouter  → programatik navigasyon
 */
function RootLayoutNav() {
    const { isReady } = useAppReady();
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const segments = useSegments();
    const router = useRouter();

    const rootNavigationState = useRootNavigationState();

    useEffect(() => {
        if (!isReady) return;

        if(!rootNavigationState.key) return;

        const inAuthGroup = segments[0] === '(auth)';

        if (inAuthGroup && isAuthenticated) {
            router.replace(ROUTES.TABS.HOME);
        } else if (!inAuthGroup && !isAuthenticated) {
            router.replace(ROUTES.AUTH.LOGIN);
        }
    }, [isReady, isAuthenticated, segments])

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
