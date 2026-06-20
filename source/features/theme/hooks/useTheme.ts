import { useColorScheme } from 'react-native'
import { useThemeStore } from '../store/theme.store'
import { LightTheme, DarkTheme } from '../constants/theme.constants'
import { AppTheme } from '../types/theme.types'

export const useTheme = () => {
  const systemColorScheme = useColorScheme()
  const { mode, setMode } = useThemeStore()

  const resolvedThemeName =
    mode === 'system' ? systemColorScheme || 'light' : mode
  const colors =
    resolvedThemeName === 'dark' ? DarkTheme.colors : LightTheme.colors

  const theme: AppTheme = resolvedThemeName === 'dark' ? DarkTheme : LightTheme

  return {
    theme,
    colors: theme.colors,
    isDark: resolvedThemeName === 'dark',
    mode,
    setTheme: setMode,
    toggleTheme: () => setMode(resolvedThemeName === 'dark' ? 'light' : 'dark'),
  }
}
