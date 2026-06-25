//source/services/tokenManager.ts

import { secureStorage } from './secureStorage'

interface TokenState {
  accessToken: string | null
  accessTokenExpiry: number | null
  refreshToken: string | null
  rememberMe: boolean
}

class TokenManager {
  private state: TokenState = {
    accessToken: null,
    accessTokenExpiry: null,
    refreshToken: null,
    rememberMe: true,
  }

  setAccessToken(token: string, expiresIn: number): void {
    this.state = {
      ...this.state,
      accessToken: token,
      accessTokenExpiry: Date.now() + expiresIn * 1000,
    }
  }

  getAccessToken(): string | null {
    if (this.isAccessTokenExpired()) return null
    return this.state.accessToken
  }

  isAccessTokenExpired(): boolean {
    if (!this.state.accessTokenExpiry) return true
    return Date.now() >= this.state.accessTokenExpiry - 30000
  }

  getTimeUntilExpiry(): number {
    if (!this.state.accessTokenExpiry) return 0
    return Math.max(
      0,
      Math.floor((this.state.accessTokenExpiry - Date.now()) / 1000)
    )
  }

  clearAccessToken(): void {
    this.state.accessToken = null
    this.state.accessTokenExpiry = null
  }

  async setRefreshToken(token: string, rememberMe?: boolean): Promise<boolean> {
    if (rememberMe !== undefined) {
      this.state.rememberMe = rememberMe
    }
    this.state.refreshToken = token

    if (this.state.rememberMe) {
      return secureStorage.storeRefreshToken(token)
    } else {
      await secureStorage.removeRefreshToken()
      return true
    }
  }

  async getRefreshToken(): Promise<string | null> {
    if (this.state.refreshToken) return this.state.refreshToken
    const storedToken = await secureStorage.getRefreshToken()
    if (storedToken) {
      this.state.refreshToken = storedToken
      return storedToken
    }
    return null
  }

  async clearAllTokens(): Promise<void> {
    this.clearAccessToken()
    this.state.refreshToken = null
    return secureStorage.clearAllTokens()
  }
}

export const tokenManager = new TokenManager()
