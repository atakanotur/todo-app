import * as SecureStore from 'expo-secure-store'

export interface TokenPair {
  accessToken: string
  refreshToken: string
}

const ACCESS_TOKEN_KEY = 'access_token'
const REFRESH_TOKEN_KEY = 'refresh_token'
const REMEMBERED_EMAIL_KEY = 'remembered_email'

class SecureStorageService {
  async storeRememberedEmail(email: string): Promise<boolean> {
    try {
      await SecureStore.setItemAsync(REMEMBERED_EMAIL_KEY, email)
      return true
    } catch (error) {
      console.error('Failed to store remembered email:', error)
      return false
    }
  }

  async getRememberedEmail(): Promise<string | null> {
    try {
      const email = await SecureStore.getItemAsync(REMEMBERED_EMAIL_KEY)
      if (email) return email
      return null
    } catch (error) {
      console.error('Failed to retrieve remembered email:', error)
      return null
    }
  }

  async removeRememberedEmail(): Promise<boolean> {
    try {
      await SecureStore.deleteItemAsync(REMEMBERED_EMAIL_KEY)
      return true
    } catch (error) {
      console.error('Failed to remove remembered email:', error)
      return false
    }
  }
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
