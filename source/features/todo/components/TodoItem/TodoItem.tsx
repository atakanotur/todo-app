import React, { memo, useCallback } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Todo } from '../../types/todo.types';
import { Card, Checkbox, Text } from '@/source/shared/components/ui';
import { useTheme } from '@/source/features/theme/hooks/useTheme';

export interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: string, checked: boolean) => void;
  onDelete: (id: string) => void;
  onPress?: (id: string) => void;
  disabled?: boolean;
}

export const TodoItem = memo<TodoItemProps>(({ todo, onToggleComplete, onDelete, onPress, disabled }) => {
  const { colors } = useTheme();

  const handleToggleComplete = useCallback((checked: boolean) => {
    onToggleComplete(todo.id, checked);
  }, [onToggleComplete, todo.id]);

  const handleDelete = useCallback(() => {
    onDelete(todo.id);
  }, [onDelete, todo.id]);

  const handlePress = useCallback(() => {
    if (onPress) {
      onPress(todo.id);
    }
  }, [onPress, todo.id]);

  return (
    <Card
      shadow="sm"
      style={styles.card}
      onPress={onPress ? handlePress : undefined}
      disabled={disabled}
    >
      <View style={styles.content}>
        <Checkbox
          checked={todo.completed}
          onCheckedChange={handleToggleComplete}
          disabled={disabled}
        />

        <View style={styles.textContent}>
          <Text
            variant="md"
            weight="semibold"
            style={todo.completed ? styles.completedText : undefined}
            color={todo.completed ? '#8E8E93' : 'text'}
          >
            {todo.title}
          </Text>
        </View>

        <View style={styles.actions}>
          <Pressable
            onPress={handleDelete}
            hitSlop={8}
            disabled={disabled}
            style={({ pressed }) => [pressed && { opacity: 0.6 }]}
            accessibilityRole="button"
            accessibilityLabel="Görevi Sil"
          >
            <Ionicons name="trash-outline" size={20} color={colors.notification} />
          </Pressable>
        </View>
      </View>
    </Card>
  );
});

TodoItem.displayName = 'TodoItem';

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  textContent: {
    flex: 1,
    gap: 2,
  },
  completedText: {
    textDecorationLine: 'line-through',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});
