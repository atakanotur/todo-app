import { tokenManager } from './tokenManager'
import { tokenRefreshService } from './tokenRefreshService'
import { AppState, AppStateStatus } from 'react-native'

class TokenExpirationHandler {
  private appStateSubscription: any = null

  initialize(): void {
    this.setupAppStateListener()
  }

  cleanup(): void {
    if (this.appStateSubscription) this.appStateSubscription.remove()
  }

  private setupAppStateListener(): void {
    this.appStateSubscription = AppState.addEventListener(
      'change',
      this.handleAppStateChange.bind(this)
    )
  }

  private async handleAppStateChange(
    nextAppState: AppStateStatus
  ): Promise<void> {
    if (nextAppState === 'active') await this.checkAndRefreshToken()
  }

  private async checkAndRefreshToken(): Promise<void> {
    const refreshToken = await tokenManager.getRefreshToken()

    if (!refreshToken) return

    if (tokenManager.isAccessTokenExpired())
      tokenRefreshService.startAutoResfresh()
  }
}

export const tokenExpirationHandler = new TokenExpirationHandler()
