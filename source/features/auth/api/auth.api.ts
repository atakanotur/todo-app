import { apiClient } from '@/source/services/api'
import { LoginCredentials, LoginResponse, User } from '../types/auth.types'

export const AuthApi = {
  login: async (credentials: LoginCredentials) => {
    console.log('here')
    const response = await apiClient.post<LoginResponse>(
      '/auth/login',
      credentials
    )
    console.log('login response: ', response)
    return response.data
  },
  register: async (credentials: any) => {
    const response = await apiClient.post<User>('/auth/register', credentials)
    console.log('register response: ', response)
    return response.data
  },
  me: async () => {
    const response = await apiClient.post<User>('/auth/me')
    return response.data
  },
}
