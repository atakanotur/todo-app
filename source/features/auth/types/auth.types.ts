export interface User {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
}

export interface UserProfile {}

export interface LoginCredentials {
  username: string
  password: string
}

export interface RegisterCredentials {
  firstName: string
  lastName: string
  username: string
  email: string
  password: string
}

export interface LoginResponse {
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
