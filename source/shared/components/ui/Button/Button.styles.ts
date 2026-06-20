import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    gap: 8,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  // Variants
  primary: {
    backgroundColor: '#007AFF',
  },
  secondary: {
    backgroundColor: '#F2F2F7',
    borderColor: '#E5E5EA',
  },
  ghost: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  danger: {
    backgroundColor: '#FF3B30',
  },
  // Sizes
  sm: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 8 },
  md: { paddingVertical: 12, paddingHorizontal: 20 },
  lg: { paddingVertical: 16, paddingHorizontal: 28, borderRadius: 12 },
  // States
  disabled: { opacity: 0.45 },
  pressed: { opacity: 0.75 },
  fullWidth: { width: '100%' },
  // Labels
  label: { fontWeight: '600', letterSpacing: 0.2 },
  primaryLabel: { color: '#fff' },
  secondaryLabel: { color: '#1C1C1E' },
  ghostLabel: { color: '#007AFF' },
  dangerLabel: { color: '#fff' },
  smLabel: { fontSize: 13 },
  mdLabel: { fontSize: 15 },
  lgLabel: { fontSize: 17 },
});