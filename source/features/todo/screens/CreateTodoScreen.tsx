import React from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'expo-router';
import { useCreateTodo } from '../queries/todo.queries';
import { Button, Text, ControlledInput } from '@/source/shared/components/ui';
import { useTheme } from '@/source/features/theme/hooks/useTheme';
import { UI } from '@/source/shared/constants/ui';

const createTodoSchema = z.object({
  todo: z.string().min(1, 'Görev metni zorunludur').max(150, 'Çok uzun bir metin'),
});

type CreateTodoFormValues = z.infer<typeof createTodoSchema>;

export const CreateTodoScreen = () => {
  const { colors } = useTheme();
  const router = useRouter();
  const createTodo = useCreateTodo();

  const { control, handleSubmit } = useForm<CreateTodoFormValues>({
    resolver: zodResolver(createTodoSchema),
    defaultValues: {
      todo: '',
    }
  });

  const onSubmit = (data: CreateTodoFormValues) => {
    createTodo.mutate({
      todo: data.todo,
      completed: false,
      userId: 5, // DummyJSON typically expects a userId
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
          <Text variant="displaySm" weight="bold">Yeni Görev</Text>
          <Text variant="md" color="#8E8E93">Planlamak başarının yarısıdır.</Text>
        </View>

        <View style={styles.form}>
          <ControlledInput
            control={control}
            name="todo"
            label="Görev"
            placeholder="Ne yapman gerekiyor?"
            autoCapitalize="sentences"
            multiline
            numberOfLines={3}
            style={styles.textAreaInput}
          />
        </View>

      </ScrollView>

      <View style={[styles.footer, { borderTopColor: colors.border }]}>
        <Button
          label="Görevi Oluştur"
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
