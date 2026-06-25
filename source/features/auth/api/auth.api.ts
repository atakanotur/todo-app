import { apiClient } from '@/source/services/api'
import {
  LoginCredentials,
  LoginResponse,
  RegisterCredentials,
  User,
} from '../types/auth.types'

export const AuthApi = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>(
      '/auth/login',
      credentials
    )
    return response.data
  },
  register: async (credentials: RegisterCredentials): Promise<User> => {
    const response = await apiClient.post<User>('/auth/register', credentials)
    return response.data
  },
}
