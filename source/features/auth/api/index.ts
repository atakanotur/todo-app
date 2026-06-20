import { apiClient } from '@/source/services/api'

export const test = async () => {
  const response = await apiClient.get('/test')
  return response.data
}

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

export const login = async (username: string, password: string) => {
  console.log(process.env.EXPO_PUBLIC_API_BASE_URL)
  const response = await apiClient.post<LoginResponse>('/auth/login', {
    username,
    password,
    expiresInMins: 60,
  })

  return response.data
}
