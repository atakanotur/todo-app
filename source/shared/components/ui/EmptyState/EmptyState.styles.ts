import { StyleSheet } from 'react-native';
import { UI } from '@/source/shared/constants/ui';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: UI.spacing.xl,
    gap: UI.spacing.md,
  },
  iconContainer: {
    marginBottom: UI.spacing.sm,
  },
  textContainer: {
    alignItems: 'center',
    gap: UI.spacing.xs,
  },
  buttonContainer: {
    marginTop: UI.spacing.lg,
  },
});
