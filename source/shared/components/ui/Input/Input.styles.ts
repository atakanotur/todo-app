import { StyleSheet } from 'react-native';
import { ColorPalette } from '@/source/features/theme/types/theme.types';
import { UI } from '@/source/shared/constants/ui';

export const createStyles = (colors: ColorPalette) => StyleSheet.create({
  wrapper: {
    gap: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: UI.radius.md,
    backgroundColor: colors.card,
    minHeight: UI.input.height,
  },
  inputFocused: {
    borderColor: colors.primary,
    backgroundColor: colors.background,
  },
  inputError: {
    borderColor: colors.notification,
  },
  inputDisabled: {
    backgroundColor: colors.border,
    opacity: UI.opacity.disabled,
  },
  input: {
    flex: 1,
    fontSize: UI.fontSize.md,
    color: colors.text,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  inputWithLeftIcon: {
    paddingLeft: 8,
  },
  inputWithRightIcon: {
    paddingRight: 8,
  },
  iconLeft: {
    paddingLeft: 12,
  },
  iconRight: {
    paddingRight: 12,
  },
});