//source/services/secureStorage.ts

import * as SecureStore from 'expo-secure-store'

export interface TokenPair {
  accessToken: string
  refreshToken: string
}

const ACCESS_TOKEN_KEY = 'access_token'
const REFRESH_TOKEN_KEY = 'refresh_token'

class SecureStorageService {
  async storeRefreshToken(token: string) {
    try {
      await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, token)
      return true
    } catch (error) {
      console.error('Failed to store refresh token:', error)
      return false
    }
  }

  async getRefreshToken(): Promise<string | null> {
    try {
      const credentials = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY)
      if (credentials) return credentials
      return null
    } catch (error) {
      console.error('Failed to retrieve refresh token:', error)
      return null
    }
  }

  async removeRefreshToken(): Promise<boolean> {
    try {
      await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY)
      return true
    } catch (error) {
      console.error('Failed to remove refresh token:', error)
      return false
    }
  }

  async clearAllTokens(): Promise<void> {
    await this.removeRefreshToken()
  }
}

export const secureStorage = new SecureStorageService()
