import { create } from 'zustand'
import { tokenManager } from '@/source/services/tokenManager'
import { secureStorage } from '@/source/services/secureStorage'

interface AuthState {
  accessToken: string | null
  isAuthenticated: boolean
  signIn: (tokens: { accessToken: string; refreshToken: string; expiresIn: number; rememberMe?: boolean; email?: string }) => Promise<void>
  signOut: () => Promise<void>
  hydrate: () => Promise<string | null>
  updateAccessToken: (newAccessToken: string) => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,

  signIn: async ({ accessToken, refreshToken, expiresIn, rememberMe = true, email }) => {
    tokenManager.setAccessToken(accessToken, expiresIn)
    await tokenManager.setRefreshToken(refreshToken, rememberMe)
    
    if (rememberMe && email) {
      await secureStorage.storeRememberedEmail(email)
    } else if (!rememberMe) {
      await secureStorage.removeRememberedEmail()
    }
    set({ accessToken, isAuthenticated: true })
  },

  signOut: async () => {
    await tokenManager.clearAllTokens()
    set({ accessToken: null, isAuthenticated: false })
  },

  hydrate: async () => {
    try {
      const accessToken = tokenManager.getAccessToken();
      const refreshToken = await tokenManager.getRefreshToken()

      if (refreshToken) {
        set({ accessToken, isAuthenticated: true })
        return refreshToken
      }
    } catch (error) {
      console.error('Hydration error', error)
    }
    set({ accessToken: null, isAuthenticated: false })
    return null
  },

  updateAccessToken: async (newAccessToken: string) => {
    //expiresIn güncelle
    tokenManager.setAccessToken(newAccessToken, 30000)
    set({ accessToken: newAccessToken })
  },
}))
