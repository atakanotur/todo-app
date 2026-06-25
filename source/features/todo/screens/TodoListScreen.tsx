import React, { useCallback } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, RefreshControl, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useTodos, useUpdateTodo, useDeleteTodo } from '../queries/todo.queries';
import { useTodoStore } from '../store/todo.store';
import { TodoItem } from '../components/TodoItem';
import { Todo } from '../types/todo.types';
import { EmptyState, Input, Text } from '@/source/shared/components/ui';
import { useTheme } from '@/source/features/theme/hooks/useTheme';
import { UI } from '@/source/shared/constants/ui';
import { Ionicons } from '@expo/vector-icons';
import { ROUTES } from '@/source/shared/constants/routes';
import { Screen } from '@/source/shared/components/layout';

export const TodoListScreen = () => {
  const { colors } = useTheme();
  const router = useRouter();

  const { data: filteredTodos = [], isLoading, isRefetching, refetch } = useTodos();
  const searchQuery = useTodoStore((state) => state.searchQuery);
  const setSearchQuery = useTodoStore((state) => state.setSearchQuery);

  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();

  const handleToggleComplete = useCallback((id: string, checked: boolean) => {
    updateTodo.mutate({
      id,
      data: { completed: checked },
    });
  }, [updateTodo]);

  const handleDelete = useCallback((id: string) => {
    deleteTodo.mutate(id);
  }, [deleteTodo]);

  const isPending = updateTodo.isPending || deleteTodo.isPending;

  const keyExtractor = useCallback((item: Todo) => item.id.toString(), []);

  const renderItem = useCallback(({ item }: { item: Todo }) => (
    <TodoItem
      todo={item}
      onToggleComplete={handleToggleComplete}
      onDelete={handleDelete}
      disabled={isPending}
    />
  ), [handleToggleComplete, handleDelete, isPending]);

  const getItemLayout = useCallback((_: any, index: number) => ({
    length: 72,
    offset: 72 * index,
    index,
  }), []);

  if (isLoading && !isRefetching) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <Screen style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text variant="displaySm" weight="bold">Görevlerim</Text>

        <Input
          placeholder="Görevlerde ara..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          leftIcon={<Ionicons name="search" size={20} color={colors.border} />}
          containerStyle={{ marginTop: UI.spacing.md }}
        />
      </View>

      <FlatList
        data={filteredTodos}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={true}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            tintColor={colors.primary}
          />
        }
        ListEmptyComponent={
          <EmptyState
            icon="checkmark-done-circle-outline"
            title="Görev Bulunamadı"
            description={
              searchQuery
                ? "Arama kriterlerinize uygun görev yok."
                : "Harika! Şu an için planlanmış bir göreviniz bulunmuyor."
            }
            actionLabel={!searchQuery ? "Yeni Görev Ekle" : undefined}
            onAction={() => router.push(ROUTES.PROTECTED.CREATE_TODO as any)}
          />
        }
      />

      {/* Floating Action Button (FAB) */}
      <Pressable
        style={({ pressed }) => [
          styles.fab,
          { backgroundColor: colors.primary },
          pressed && { opacity: 0.8, transform: [{ scale: 0.95 }] }
        ]}
        onPress={() => router.push(ROUTES.PROTECTED.CREATE_TODO as any)}
        accessibilityRole="button"
        accessibilityLabel="Yeni Görev Ekle"
      >
        <Ionicons name="add" size={32} color="#FFFFFF" />
      </Pressable>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: UI.spacing.lg,
    paddingBottom: UI.spacing.sm,
  },
  listContent: {
    padding: UI.spacing.lg,
    paddingBottom: 100,
    flexGrow: 1,
  },
  fab: {
    position: 'absolute',
    bottom: 32,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  }
});
