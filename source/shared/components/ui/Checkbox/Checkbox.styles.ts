import { StyleSheet } from 'react-native';
import { ColorPalette } from '@/source/features/theme/types/theme.types';
import { UI } from '@/source/shared/constants/ui';

export const createStyles = (colors: ColorPalette) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: UI.spacing.sm,
  },
  disabled: {
    opacity: UI.opacity.disabled,
  },
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: UI.radius.sm,
  },
  box_sm: {
    width: 20,
    height: 20,
  },
  box_md: {
    width: 24,
    height: 24,
  },
  box_lg: {
    width: 28,
    height: 28,
  },
  boxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  boxUnchecked: {
    backgroundColor: 'transparent',
    borderColor: colors.border,
  },
});
