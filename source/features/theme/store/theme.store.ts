import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ThemeMode } from '../types/theme.types'

interface ThemeState {
  mode: ThemeMode
  setMode: (mode: ThemeMode) => void
  hasHydrated: boolean
  setHasHydrated: (state: boolean) => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: 'system',
      hasHydrated: false,
      setMode: (mode) => set({ mode }),
      setHasHydrated: (state) => set({ hasHydrated: state }),
    }),
    {
      name: 'app-theme-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)
