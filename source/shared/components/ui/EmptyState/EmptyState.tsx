import React, { memo } from 'react';
import { View, ViewProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '../Text';
import { Button } from '../Button';
import { useTheme } from '@/source/features/theme/hooks/useTheme';
import { styles } from './EmptyState.styles';

export interface EmptyStateProps extends ViewProps {
  /**
   * Ionicons icon name to display
   * @default 'document-text-outline'
   */
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  description?: string;
  /**
   * If provided along with onAction, renders a call-to-action button
   */
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState = memo<EmptyStateProps>(({
  icon = 'document-text-outline',
  title,
  description,
  actionLabel,
  onAction,
  style,
  ...rest
}) => {
  const { colors, isDark } = useTheme();
  
  // Use a subtle color for the icon and description text
  const mutedColor = isDark ? '#8E8E93' : '#8E8E93';

  return (
    <View style={[styles.container, style]} {...rest}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={64} color={mutedColor} />
      </View>
      
      <View style={styles.textContainer}>
        <Text variant="xl" weight="bold" align="center">
          {title}
        </Text>
        {description && (
          <Text variant="md" color={mutedColor} align="center">
            {description}
          </Text>
        )}
      </View>

      {actionLabel && onAction && (
        <View style={styles.buttonContainer}>
          <Button 
            label={actionLabel} 
            onPress={onAction} 
            variant="secondary"
            size="md"
          />
        </View>
      )}
    </View>
  );
});

EmptyState.displayName = 'EmptyState';
