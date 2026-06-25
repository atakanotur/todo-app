import { tokenManager } from './tokenManager'
import { tokenRefreshService } from './tokenRefreshService'
import { apiClient, RefreshResponse } from './api'
import { AuthApi } from '../features/auth/api/auth.api'
import { User } from '../features/auth/types/auth.types'
import { useAuthStore } from '../features/auth/store/auth.store'

interface AuthState {
  isAuthenticated: boolean
  isLoading: boolean
  user: User | null
  error: string | null
}

class SilentAuthService {
  async attemptSilentAuth(): Promise<AuthState> {
    try {
      const refreshToken = await tokenManager.getRefreshToken()

      if (!refreshToken) {
        useAuthStore.setState({ accessToken: null, isAuthenticated: false })
        return {
          isAuthenticated: false,
          isLoading: false,
          user: null,
          error: 'Session expired. Please login again',
        }
      }

      const response = await apiClient.post<RefreshResponse>('/auth/refresh', {
        refreshToken,
      })

      const accessToken =
        response.data.accessToken || (response.data as any).token
      const expiresIn =
        response.data.expiresIn || (response.data as any).expires_in || 3600
      const newRefreshToken = response.data.refreshToken || refreshToken

      tokenManager.setAccessToken(accessToken, Number(expiresIn))
      useAuthStore.setState({ accessToken, isAuthenticated: true })
      await tokenManager.setRefreshToken(newRefreshToken)

      const { data: userResponse } = await apiClient.get<User>('/users/me')

      tokenRefreshService.startAutoResfresh()

      return {
        isAuthenticated: true,
        isLoading: false,
        user: userResponse,
        error: null,
      }
    } catch (error) {
      console.error('Silent auth failed', error)
      await tokenManager.clearAllTokens()
      useAuthStore.setState({ accessToken: null, isAuthenticated: false })

      return {
        isAuthenticated: false,
        isLoading: false,
        user: null,
        error: 'Session expired. Please login again',
      }
    }
  }
}

export const silentAuthService = new SilentAuthService()
