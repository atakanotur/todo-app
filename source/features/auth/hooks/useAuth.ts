import { useMutation } from '@tanstack/react-query'
import { login } from '../api'
import { useAuthStore } from '../store/auth.store'

export const useAuth = () => {
  const signIn = useAuthStore((state) => state.signIn)

  const loginMutation = useMutation({
    mutationFn: async (credentials: { username: string; password: string }) => {
      const response = await login(credentials.username, credentials.password)
      return response
    },
    onSuccess: (data) => {
      if (data && data.accessToken) {
        signIn({ accessToken: data.accessToken, expiresIn: 60 * 60 * 1000 })
      }
    },
    onError: (error) => {
      console.error('Login failed', error)
    },
  })

  return {
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    error: loginMutation.error,
  }
}
