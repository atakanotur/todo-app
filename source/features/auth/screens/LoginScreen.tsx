import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, Alert, ScrollView } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'expo-router';
import { Text, Button, ControlledInput } from "@/source/shared/components/ui";
import { useLoginMutation } from '../queries/auth.queries';
import { useTheme } from '@/source/features/theme/hooks/useTheme';
import { ROUTES } from '@/source/shared/constants/routes';
import { UI } from '@/source/shared/constants/ui';

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginScreen = () => {
  const { colors } = useTheme();
  const router = useRouter();
  const { mutate: login, isPending: isLoggingIn, isError: error } = useLoginMutation();

  const { control, handleSubmit } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: 'emilys', // DummyJSON default user
      password: 'emilyspass', // DummyJSON default pass
    }
  });

  const onSubmit = (data: LoginFormValues) => {
    login(data, {
      onError: () => {
        Alert.alert("Login Failed", "Invalid username or password.");
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
          <Text variant="displaySm" weight="bold">Welcome Back</Text>
          <Text variant="md" color="#8E8E93">Sign in to continue.</Text>
        </View>

        <View style={styles.form}>
          <ControlledInput
            control={control}
            name="username"
            label="Username"
            placeholder="Your username"
            autoCapitalize="none"
          />
          <ControlledInput
            control={control}
            name="password"
            label="Password"
            placeholder="Your password"
            secureTextEntry
          />

          <View style={styles.footer}>
            <Button
              onPress={handleSubmit(onSubmit)}
              disabled={isLoggingIn}
              loading={isLoggingIn}
              label="Login"
            />
            
            <Button
              onPress={() => router.push(ROUTES.AUTH.REGISTER as any)}
              disabled={isLoggingIn}
              variant="ghost"
              label="Don't have an account? Sign Up"
              style={styles.registerButton}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: UI.spacing.xl,
    flexGrow: 1,
    justifyContent: 'center',
  },
  header: {
    marginBottom: UI.spacing.xl,
    gap: UI.spacing.xs,
  },
  form: {
    gap: UI.spacing.lg,
  },
  footer: {
    marginTop: UI.spacing.md,
    gap: UI.spacing.md,
  },
  registerButton: {
    marginTop: UI.spacing.xs,
  }
});