import {
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { apiClient } from '@/source/services/api'
import { tokenManager } from '@/source/services/tokenManager'
import { tokenRefreshService } from '@/source/services/tokenRefreshService'
import { tokenExpirationHandler } from '@/source/services/tokenExpirationHandler'
import { silentAuthService } from '@/source/services/silentAuthService'
import { useAuthStore } from '../store/auth.store'
import { AuthApi } from '../api/auth.api'
import {
  LoginCredentials,
  RegisterCredentials,
  User,
} from '../types/auth.types'

export const authQueryKeys = {
  all: ['auth'] as const,
  session: () => [...authQueryKeys.all, 'session'] as const,
  me: () => [...authQueryKeys.all, 'me'] as const,
} as const

export const sessionQueryOptions = queryOptions({
  queryKey: authQueryKeys.session(),
  queryFn: async (): Promise<User | null> => {
    const authState = await silentAuthService.attemptSilentAuth()
    if (authState.isAuthenticated && authState.user) {
      return authState.user as User
    }
    return null
  },
  staleTime: Infinity,
  gcTime: Infinity,
})

export function useSession() {
  const queryClient = useQueryClient()

  const cachedUser = queryClient.getQueryData<User | null>(
    authQueryKeys.session()
  )

  return { user: cachedUser ?? null }
}

export function useLoginMutation() {
  const queryClient = useQueryClient()
  const signIn = useAuthStore((state) => state.signIn)

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await AuthApi.login(credentials)
      const {
        accessToken,
        refreshToken,
        email,
        firstName,
        gender,
        id,
        image,
        lastName,
        username: responseUsername,
      } = response

      await signIn({ accessToken, refreshToken, expiresIn: 60 })

      const user: User = {
        id,
        username: responseUsername,
        email,
        firstName,
        lastName,
        gender,
        image,
      }
      return user
    },
    onSuccess: (user) => {
      queryClient.setQueryData(authQueryKeys.session(), user)
    },
  })
}

export function useRegisterMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (credentials: RegisterCredentials) => {
      const response = await AuthApi.register(credentials)

      console.log("Registered User : ", response);

      return response
    },
    onSuccess: (user) => {
      queryClient.setQueryData(authQueryKeys.session(), user)
    },
  })
}

export function useLogoutMutation() {
  const queryClient = useQueryClient()
  const signOut = useAuthStore((state) => state.signOut)

  return useMutation<void, Error, void>({
    mutationFn: async () => {
      try {
        await apiClient.post('/auth/logout')
      } catch (error) {
        // Intentionally ignored: local session cleanup proceeds regardless
      }
    },
    onSettled: async () => {
      tokenRefreshService.stopAutoResfresh()
      tokenExpirationHandler.cleanup()

      await tokenManager.clearAllTokens()

      queryClient.removeQueries({ queryKey: authQueryKeys.all })
      signOut()
    },
  })
}
