import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { apiClient } from '@/source/services/api'
import { tokenManager } from '@/source/services/tokenManager'
import { tokenRefreshService } from '@/source/services/tokenRefreshService'
import { tokenExpirationHandler } from '@/source/services/tokenExpirationHandler'
import { silentAuthService } from '@/source/services/silentAuthService'
import { useAuthStore } from '../store/auth.store'

export interface UserProfile {
  id: string
  email: string
  name: string
}

export interface LoginCredentials {
  email: string
  password: string
}

interface LoginResponse {
  accessToken: string
  refreshToken: string
  expiresIn: number
  user: UserProfile
}

export const authQueryKeys = {
  all: ['auth'] as const,
  session: () => [...authQueryKeys.all, 'session'] as const,
  me: () => [...authQueryKeys.all, 'me'] as const,
} as const

export const sessionQueryOptions = queryOptions({
  queryKey: authQueryKeys.session(),
  queryFn: async (): Promise<UserProfile | null> => {
    const authState = await silentAuthService.attemptSilentAuth()
    if (authState.isAuthenticated && authState.user) {
      return authState.user as UserProfile
    }
    return null
  },
  staleTime: Infinity,
  gcTime: Infinity,
})

export function useSession() {
  const queryClient = useQueryClient()

  const cachedUser = queryClient.getQueryData<UserProfile | null>(
    authQueryKeys.session()
  )

  return { user: cachedUser ?? null }
}

export function useLoginMutation() {
  const queryClient = useQueryClient()
  const signIn = useAuthStore((state) => state.signIn)

  return useMutation({
    mutationFn: async ({ email, password }: LoginCredentials) => {
      const response = await apiClient.post<LoginResponse>('/auth/login', {
        email,
        password,
      })
      const { accessToken, expiresIn, user } = response.data
      await signIn({ accessToken, expiresIn })
      return user
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
