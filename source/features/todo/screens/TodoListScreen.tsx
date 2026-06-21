import React, { useMemo } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { useTodos } from '../queries/todo.queries';
import { useTodoStore } from '../store/todo.store';
import { TodoItem } from '../components/TodoItem';
import { EmptyState, Input, Text } from '@/source/shared/components/ui';
import { useTheme } from '@/source/features/theme/hooks/useTheme';
import { UI } from '@/source/shared/constants/ui';
import { Ionicons } from '@expo/vector-icons';
import { ROUTES } from '@/source/shared/constants/routes';
import { Screen } from '@/source/shared/components/layout';

export const TodoListScreen = () => {
  const { colors } = useTheme();
  const router = useRouter();

  const { data: todos = [], isLoading, isRefetching, refetch } = useTodos();
  const { searchQuery, statusFilter, setSearchQuery } = useTodoStore();

  const filteredTodos = useMemo(() => {
    return todos.filter(item => {
      // 1. Search Filter (by todo text)
      const matchesSearch = item.todo.toLowerCase().includes(searchQuery.toLowerCase());

      // 2. Status Filter
      const matchesStatus = statusFilter === 'all'
        ? true
        : statusFilter === 'completed'
          ? item.completed
          : !item.completed;

      return matchesSearch && matchesStatus;
    });
  }, [todos, searchQuery, statusFilter]);

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
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <TodoItem todo={item} />}
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
    flexGrow: 1,
  }
});
