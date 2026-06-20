import React, { memo } from 'react';
import { View, ViewProps, Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '@/source/features/theme/hooks/useTheme';
import { createStyles } from './Card.styles';

export interface CardProps extends ViewProps {
  children: React.ReactNode;
  /**
   * Shadow intensity based on UI constants. Default is 'none' for a flat UI.
   * @default 'none'
   */
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  /**
   * If provided, the card will be interactive (Pressable)
   */
  onPress?: PressableProps['onPress'];
  /**
   * Disables the interaction and adds opacity
   */
  disabled?: boolean;
}

export const Card = memo<CardProps>(({
  children,
  style,
  shadow = 'none',
  onPress,
  disabled = false,
  ...rest
}) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const shadowKey = shadow !== 'none' ? `shadow${shadow.charAt(0).toUpperCase() + shadow.slice(1)}` : null;

  const cardStyle: StyleProp<ViewStyle> = [
    styles.card,
    shadowKey && styles[shadowKey as keyof typeof styles],
    disabled && { opacity: 0.6 },
    style,
  ];

  if (onPress) {
    return (
      <Pressable 
        style={({ pressed }) => [
          cardStyle, 
          pressed && !disabled && { opacity: 0.8 }
        ]} 
        onPress={onPress}
        disabled={disabled}
        accessibilityRole="button"
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View style={cardStyle} {...rest}>
      {children}
    </View>
  );
});

Card.displayName = 'Card';
