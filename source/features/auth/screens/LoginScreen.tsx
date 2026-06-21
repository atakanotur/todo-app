import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Input, Button } from "@/source/shared/components/ui"
import { Screen } from "@/source/shared/components/layout"
import { useLoginMutation } from '../queries/auth.queries'

export const LoginScreen = () => {
  const [username, setUsername] = useState('emilys') // Using emilys as it is one of dummyjson's default users
  const [password, setPassword] = useState('emilyspass')

  const { mutate: login, isPending: isLoggingIn, isError: error } = useLoginMutation()

  const handleLogin = () => {
    login({ username, password })
  }

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>

        <View style={styles.form}>
          <Input
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
          <Input
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {error && <Text style={styles.errorText}>Login failed. Please check your credentials.</Text>}

          <Button
            onPress={handleLogin}
            disabled={isLoggingIn}
            label={isLoggingIn ? "Logging in..." : "Login"}
          />
        </View>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  form: {
    gap: 16,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  }
})