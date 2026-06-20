//source/services/tokenManager.ts

import { secureStorage } from './secureStorage'

interface TokenState {
  accessToken: string | null
  accessTokenExpiry: number | null
}

class TokenManager {
  private state: TokenState = {
    accessToken: null,
    accessTokenExpiry: null,
  }

  setAccessToken(token: string, expiresIn: number): void {
    this.state = {
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

  async setRefreshToken(token: string): Promise<boolean> {
    return secureStorage.storeRefreshToken(token)
  }

  async getRefreshToken(): Promise<string | null> {
    return secureStorage.getRefreshToken()
  }

  async clearAllTokens(): Promise<void> {
    this.clearAccessToken()
    return secureStorage.clearAllTokens()
  }
}

export const tokenManager = new TokenManager()
