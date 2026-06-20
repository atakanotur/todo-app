//source/services/tokenRefreshService.ts

import { tokenManager } from './tokenManager'
import {apiClient,RefreshResponse} from './api'

class TokenRefreshService {
  private refreshTimer: NodeJS.Timeout | null = null
  private readonly REFRESH_THRESHOLD = 60 // Refresh 60 seconds before expiry

  startAutoResfresh(): void {
    this.scheduleRefresh()
  }

  stopAutoResfresh(): void {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer)
      this.refreshTimer = null
    }
  }

  private scheduleRefresh(): void {
    this.stopAutoResfresh()

    const timeUntilExpiry = tokenManager.getTimeUntilExpiry()

    if (timeUntilExpiry <= 0) {
      // Token already expired, refresh immediately
      this.performRefresh()
      return
    }

    const refreshDelay = Math.max(
      (timeUntilExpiry - this.REFRESH_THRESHOLD) * 1000,
      0
    )

    this.refreshTimer = setTimeout(() => {
      this.performRefresh()
    }, refreshDelay)
  }

  private async performRefresh(): Promise<void> {
    try {
      const refreshToken = await tokenManager.getRefreshToken()

      if (!refreshToken) throw new Error('No refresh token available')

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

      this.scheduleRefresh()
    } catch (error) {
      console.error('Token, refresh filaed', error)
      //Handle refresh failure- typically logout user
      this.handleRefreshFailuer()
    }
  }

  private async handleRefreshFailuer(): Promise<void> {
    await tokenManager.clearAllTokens()
    this.stopAutoResfresh()
    // Trigger navigation to login screen
    // This depends on your navigation setup
  }
}

export const tokenRefreshService = new TokenRefreshService()
