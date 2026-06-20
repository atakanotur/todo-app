import { create } from 'zustand'
import { tokenManager } from '@/source/services/tokenManager'

interface AuthState {
  accessToken: string | null
  isAuthenticated: boolean
  signIn: (tokens: { accessToken: string; expiresIn: number }) => Promise<void>
  signOut: () => Promise<void>
  hydrate: () => Promise<string | null>
  updateAccessToken: (newAccessToken: string) => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,

  signIn: async ({ accessToken, expiresIn }) => {
    tokenManager.setAccessToken(accessToken, expiresIn)
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

      if (accessToken && refreshToken) {
        set({ accessToken, isAuthenticated: true })
        return accessToken
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
