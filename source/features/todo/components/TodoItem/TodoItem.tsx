import React, { memo } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Todo } from '../../types/todo.types';
import { useUpdateTodo, useDeleteTodo } from '../../queries/todo.queries';
import { Card, Checkbox, Text } from '@/source/shared/components/ui';
import { useTheme } from '@/source/features/theme/hooks/useTheme';

export interface TodoItemProps {
  todo: Todo;
  onPress?: () => void;
}

export const TodoItem = memo<TodoItemProps>(({ todo, onPress }) => {
  const { colors } = useTheme();
  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();

  const handleToggleComplete = (checked: boolean) => {
    updateTodo.mutate({
      id: todo.id,
      data: {
        completed: checked,
      }
    });
  };

  const handleDelete = () => {
    deleteTodo.mutate(todo.id);
  };

  const isPending = updateTodo.isPending || deleteTodo.isPending;

  return (
    <Card
      shadow="sm"
      style={styles.card}
      onPress={onPress}
      disabled={isPending}
    >
      <View style={styles.content}>
        <Checkbox
          checked={todo.completed}
          onCheckedChange={handleToggleComplete}
          disabled={isPending}
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
            disabled={isPending}
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
