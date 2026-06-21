import { tokenManager } from './tokenManager'
import { tokenRefreshService } from './tokenRefreshService'
import { apiClient, RefreshResponse } from './api'
import { AuthApi } from '../features/auth/api/auth.api'
import { User } from '../features/auth/types/auth.types'

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

      const {
        accessToken,
        expiresIn,
        refreshToken: newRefreshToken,
      } = response.data

      tokenManager.setAccessToken(accessToken, expiresIn)
      await tokenManager.setRefreshToken(newRefreshToken)

      const userResponse = await AuthApi.me()

      tokenRefreshService.startAutoResfresh()

      return {
        isAuthenticated: true,
        isLoading: false,
        user: userResponse,
        error: null,
      }
    } catch (error) {
      await tokenManager.clearAllTokens()

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
