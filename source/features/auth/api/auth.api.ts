import { apiClient } from '@/source/services/api'

export type LoginResponse = {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
  accessToken: string
  refreshToken: string
}

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
}
