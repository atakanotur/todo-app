import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    gap: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1C1C1E',
  },
  required: {
    color: '#FF3B30',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E5E5EA',
    borderRadius: 10,
    backgroundColor: '#FAFAFA',
    minHeight: 48,
  },
  inputFocused: {
    borderColor: '#007AFF',
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: '#FF3B30',
    backgroundColor: '#FFF5F5',
  },
  inputDisabled: {
    backgroundColor: '#F2F2F7',
    opacity: 0.6,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#1C1C1E',
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
  helperText: {
    fontSize: 12,
    color: '#8E8E93',
  },
  errorText: {
    color: '#FF3B30',
  },
});