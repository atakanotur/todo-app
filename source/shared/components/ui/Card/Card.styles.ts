import { StyleSheet } from 'react-native';
import { ColorPalette } from '@/source/features/theme/types/theme.types';
import { UI } from '@/source/shared/constants/ui';

export const createStyles = (colors: ColorPalette) => StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: UI.card.borderRadius,
    padding: UI.card.padding,
    gap: UI.card.gap,
    borderWidth: UI.borderWidth.hairline,
    borderColor: colors.border,
  },
  shadowSm: UI.shadow.sm,
  shadowMd: UI.shadow.md,
  shadowLg: UI.shadow.lg,
});
