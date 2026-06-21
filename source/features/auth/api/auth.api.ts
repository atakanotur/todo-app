import { apiClient } from '@/source/services/api'
import { LoginResponse, User } from '../types/auth.types'

export const AuthApi = {
  test: async () => {
    const response = await apiClient.get('/test')
    return response.data
  },
  login: async (username: string, password: string) => {
    const response = await apiClient.post<LoginResponse>('/auth/login', {
      username,
      password,
      expiresInMins: 60,
    })
    return response.data
  },
  me: async () => {
    const response = await apiClient.post<User>('/auth/me')
    return response.data
  },
}
