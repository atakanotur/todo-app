import { StyleSheet } from 'react-native';
import { ColorPalette } from '@/source/features/theme/types/theme.types';
import { UI } from '@/source/shared/constants/ui';

export const createStyles = (colors: ColorPalette) => StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: UI.button.borderRadius,
    gap: UI.spacing.sm,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  // Variants
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.card,
    borderColor: colors.border,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  danger: {
    backgroundColor: colors.notification,
  },
  // Sizes
  sm: { height: UI.button.height.sm, paddingHorizontal: UI.button.paddingHorizontal.sm },
  md: { height: UI.button.height.md, paddingHorizontal: UI.button.paddingHorizontal.md },
  lg: { height: UI.button.height.lg, paddingHorizontal: UI.button.paddingHorizontal.lg },
  
  // States
  disabled: { opacity: UI.opacity.disabled },
  pressed: { opacity: UI.opacity.subtle },
  fullWidth: { width: '100%' },
});