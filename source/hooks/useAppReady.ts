import { useEffect, useState } from 'react'
import * as SplashScreen from 'expo-splash-screen'
import { useAuthStore } from '@/source/features/auth/store/auth.store'
import { sessionQueryOptions } from '@/source/features/auth/queries/auth.queries'
import { queryClient } from '../lib/queryClient'

SplashScreen.preventAutoHideAsync()

export function useAppReady() {
  const [isReady, setIsReady] = useState<boolean>(false)
  const hydrate = useAuthStore((state) => state.hydrate)

  useEffect(() => {
    async function prepare() {
      try {
        const token = await hydrate()
        if (token) await queryClient.fetchQuery(sessionQueryOptions)
      } catch (error) {
        console.error('Hydration error : ', error)
      } finally {
        setIsReady(true)
        await SplashScreen.hideAsync()
      }
    }

    prepare()
  }, [hydrate])

  return { isReady }
}
