import { AppTheme } from '@/source/features/theme/types/theme.types'

export const LightTheme: AppTheme = {
  colors: {
    background: '#FFFFFF',
    card: '#F8F9FA',
    text: '#1C1C1E',
    primary: '#007AFF',
    border: '#C7C7CC',
    notification: '#FF3B30',
  },
  spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 },
  typography: {
    fontSize: { small: 12, medium: 16, large: 20 },
  },
}

export const DarkTheme: AppTheme = {
  colors: {
    background: '#000000',
    card: '#1C1C1E',
    text: '#FFFFFF',
    primary: '#0A84FF',
    border: '#38383A',
    notification: '#FF453A',
  },
  spacing: { ...LightTheme.spacing },
  typography: { ...LightTheme.typography },
}
