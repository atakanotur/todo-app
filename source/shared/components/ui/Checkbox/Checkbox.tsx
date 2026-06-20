import React, { memo } from 'react';
import { Pressable, PressableProps, View, StyleProp, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/source/features/theme/hooks/useTheme';
import { Text } from '../Text';
import { createStyles } from './Checkbox.styles';

export interface CheckboxProps extends Omit<PressableProps, 'style'> {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const Checkbox = memo<CheckboxProps>(({
  checked,
  onCheckedChange,
  label,
  size = 'md',
  disabled = false,
  style,
  ...rest
}) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const iconSizes = {
    sm: 14,
    md: 18,
    lg: 22,
  };

  return (
    <Pressable
      style={[styles.container, disabled && styles.disabled, style]}
      onPress={() => !disabled && onCheckedChange(!checked)}
      disabled={disabled}
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
      hitSlop={8}
      {...rest}
    >
      <View style={[
        styles.box, 
        styles[`box_${size}`],
        checked ? styles.boxChecked : styles.boxUnchecked
      ]}>
        {checked && (
           <Ionicons name="checkmark" size={iconSizes[size]} color="#FFFFFF" />
        )}
      </View>
      
      {label && (
        <Text 
           variant={size === 'sm' ? 'sm' : size === 'md' ? 'md' : 'lg'}
           color={disabled ? 'border' : 'text'}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
});

Checkbox.displayName = 'Checkbox';
