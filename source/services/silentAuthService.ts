//source/services/silentAuthService.ts

import { tokenManager } from './tokenManager'
import { tokenRefreshService } from './tokenRefreshService'
import { apiClient, RefreshResponse } from './api'

interface UserProfile {
  id: number
  email: string
  name: string
}

interface AuthState {
  isAuthenticated: boolean
  isLoading: boolean
  user: UserProfile | null
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

      const userResponse = await apiClient.get<UserProfile>('/auth/me')

      tokenRefreshService.startAutoResfresh()

      return {
        isAuthenticated: true,
        isLoading: false,
        user: userResponse.data,
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
