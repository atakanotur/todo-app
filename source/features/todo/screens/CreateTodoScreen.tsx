import React from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'expo-router';
import { useCreateTodo } from '../queries/todo.queries';
import { useSession } from '@/source/features/auth/queries/auth.queries';
import { Button, Text, ControlledInput } from '@/source/shared/components/ui';
import { useTheme } from '@/source/features/theme/hooks/useTheme';
import { UI } from '@/source/shared/constants/ui';

const createTodoSchema = z.object({
  todo: z.string().min(1, 'Task text is required').max(150, 'Text is too long'),
});

type CreateTodoFormValues = z.infer<typeof createTodoSchema>;

export const CreateTodoScreen = () => {
  const { colors } = useTheme();
  const router = useRouter();
  const createTodo = useCreateTodo();
  
  // 2. Adım: useSession hook'undan user objesini çekiyoruz.
  const { user } = useSession();

  const { control, handleSubmit } = useForm<CreateTodoFormValues>({
    resolver: zodResolver(createTodoSchema),
    defaultValues: {
      todo: '',
    }
  });

  const onSubmit = (data: CreateTodoFormValues) => {
    // 3. Adım: Sabit 5 yerine, oturum açmış kullanıcının ID'sini (yoksa fallback 1) gönderiyoruz.
    createTodo.mutate({
      todo: data.todo,
      completed: false,
      userId: user?.id || 1, 
    }, {
      onSuccess: () => {
        if (router.canGoBack()) {
          router.back();
        } else {
          router.replace('/');
        }
      }
    });
  };

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text variant="displaySm" weight="bold">New Task</Text>
          <Text variant="md" color="#8E8E93">What needs to be done?</Text>
        </View>

        <View style={styles.form}>
          <ControlledInput
            control={control}
            name="todo"
            label="Task"
            placeholder="e.g., Buy groceries..."
            autoCapitalize="sentences"
            multiline
            numberOfLines={3}
            style={styles.textAreaInput}
          />
        </View>

      </ScrollView>

      <View style={[styles.footer, { borderTopColor: colors.border }]}>
        <Button 
          label="Create Task"
          onPress={handleSubmit(onSubmit)}
          loading={createTodo.isPending}
          disabled={createTodo.isPending}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: UI.spacing.lg,
    flexGrow: 1,
  },
  header: {
    marginBottom: UI.spacing.xl,
    gap: UI.spacing.xs,
  },
  form: {
    gap: UI.spacing.lg,
  },
  textAreaInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  footer: {
    padding: UI.spacing.lg,
    paddingBottom: Platform.OS === 'ios' ? 32 : UI.spacing.lg,
    borderTopWidth: 1,
  }
});
