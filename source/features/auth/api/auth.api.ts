import { apiClient } from '@/source/services/api'
import {
  LoginCredentials,
  LoginResponse,
  RegisterCredentials,
  User,
} from '../types/auth.types'

export const AuthApi = {
  test: async () => {
    const response = await apiClient.get('/test')
    return response.data
  },
  login: async ({
    username,
    password,
  }: LoginCredentials): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/auth/login', {
      username,
      password,
      expiresInMins: 60,
    })
    return response.data
  },
  register: async ({
    username,
    firstName,
    lastName,
    email,
    password,
  }: RegisterCredentials): Promise<User> => {
    const response = await apiClient.post<User>('/users/add', {
      username,
      password,
      firstName,
      lastName,
      email,
    })

    return response.data
  },
  me: async () => {
    const response = await apiClient.post<User>('/auth/me')
    return response.data
  },
}
