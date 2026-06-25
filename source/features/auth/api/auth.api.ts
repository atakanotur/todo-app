import { apiClient } from '@/source/services/api'
import { LoginCredentials, LoginResponse, RegisterCredentials, User } from '../types/auth.types'

export const AuthApi = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    console.log('here')
    const response = await apiClient.post<LoginResponse>(
      '/auth/login',
      credentials
    )
    console.log('login response: ', response)
    return response.data
  },
  register: async (credentials: RegisterCredentials): Promise<User> => {
    const response = await apiClient.post<User>('/auth/register', credentials)
    console.log('register response: ', response)
    return response.data
  }
}
