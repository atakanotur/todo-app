import React from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'expo-router';
import { useRegisterMutation } from '../queries/auth.queries';
import { Button, Text, ControlledInput } from '@/source/shared/components/ui';
import { useTheme } from '@/source/features/theme/hooks/useTheme';
import { UI } from '@/source/shared/constants/ui';
import { ROUTES } from '@/source/shared/constants/routes';

const registerSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export const RegisterScreen = () => {
  const { colors } = useTheme();
  const router = useRouter();
  const registerMutation = useRegisterMutation();

  const { control, handleSubmit } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
    }
  });

  const onSubmit = (data: RegisterFormValues) => {
    registerMutation.mutate(data, {
      onSuccess: () => {
        Alert.alert(
          "Registration Successful!", 
          "Your account has been created successfully. Please log in.",
          [{ text: "OK", onPress: () => router.replace(ROUTES.AUTH.LOGIN as any) }]
        );
      },
      onError: (error) => {
         Alert.alert("Registration Failed", "An error occurred, please try again.");
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
          <Text variant="displaySm" weight="bold">Create Account</Text>
          <Text variant="md" color="#8E8E93">Fill the form to join us.</Text>
        </View>

        <View style={styles.form}>
          <ControlledInput
            control={control}
            name="firstName"
            label="First Name"
            placeholder="Your first name"
          />
          <ControlledInput
            control={control}
            name="lastName"
            label="Last Name"
            placeholder="Your last name"
          />
          <ControlledInput
            control={control}
            name="username"
            label="Username"
            placeholder="Your username"
            autoCapitalize="none"
          />
          <ControlledInput
            control={control}
            name="email"
            label="Email"
            placeholder="Your email address"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <ControlledInput
            control={control}
            name="password"
            label="Password"
            placeholder="Your password"
            secureTextEntry
          />
        </View>
        
        <View style={styles.footer}>
          <Button 
            label="Sign Up"
            onPress={handleSubmit(onSubmit)}
            loading={registerMutation.isPending}
            disabled={registerMutation.isPending}
          />
          <Button 
            label="Already have an account? Login"
            variant="ghost"
            onPress={() => router.back()}
            style={styles.loginButton}
          />
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
    marginBottom: UI.spacing.xl,
  },
  footer: {
    gap: UI.spacing.md,
  },
  loginButton: {
    marginTop: UI.spacing.sm,
  }
});
