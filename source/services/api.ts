import axios, {
  AxiosInstance,
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import { tokenManager } from './tokenManager'
import { tokenRotationHandler } from '@/source/services/tokenRotationHandler'

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL

interface FailedRequest {
  resolve: (token: string) => void
  reject: (error: Error) => void
}

interface ApiResponse<T> {
  success: boolean
  data: T
}

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
}

export interface RefreshResponse {
  accessToken: string
  refreshToken: string
  expiresIn: number
}

class ApiClient {
  private static instance: ApiClient
  private axiosInstance: AxiosInstance

  private isRefreshing = false
  private failedQueue: FailedRequest[] = []

  private constructor(baseUrl: string | undefined) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.setupInterceptors()
  }

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) ApiClient.instance = new ApiClient(API_BASE_URL)

    return ApiClient.instance
  }

  private setupInterceptors() {
    this.axiosInstance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        const accessToken = tokenManager.getAccessToken()

        if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`

        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as CustomAxiosRequestConfig

        if (
          error.response?.status === 401 &&
          originalRequest &&
          !originalRequest._retry &&
          !originalRequest.url?.includes('/auth/refresh')
        ) {
          if (this.isRefreshing) {
            return new Promise((resolve, reject) => {
              this.failedQueue.push({
                resolve: (token: string) => {
                  originalRequest.headers.Authorization = `Bearer ${token}`
                  resolve(this.axiosInstance(originalRequest))
                },
                reject: (error: Error) => reject(error),
              })
            })
          }

          originalRequest._retry = true
          this.isRefreshing = true

          try {
            const newToken = await this.refreshAccessToken()
            this.processQueue(null, newToken)
            originalRequest.headers.Authorization = `Bearer ${newToken}`
            return this.axiosInstance(originalRequest)
          } catch (refreshError) {
            this.processQueue(refreshError as Error, null)

            await tokenManager.clearAllTokens()

            return
          } finally {
            this.isRefreshing = false
          }
        }

        return Promise.reject(error)
      }
    )
  }

  private processQueue(error: Error | null, token: string | null = null) {
    this.failedQueue.forEach((promise) => {
      if (error) promise.reject(error)
      else if (token) promise.resolve(token)
    })
    this.failedQueue = []
  }

  private async refreshAccessToken(): Promise<string> {
    const refreshToken = await tokenManager.getRefreshToken()

    if (!refreshToken) throw new Error('No refresh token available')

    const response = await axios.post<RefreshResponse>(
      `${API_BASE_URL}/auth/refresh`,
      { refreshToken },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    const accessToken = response.data.accessToken || (response.data as any).token
    const expiresIn = response.data.expiresIn || (response.data as any).expires_in || 3600
    const newRefreshToken = response.data.refreshToken || refreshToken

    tokenRotationHandler.handleRotation({
      accessToken,
      refreshToken: newRefreshToken,
      expiresIn: Number(expiresIn),
    })

    return accessToken
  }

  public async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.get<T>(endpoint)
    return { success: true, data: response.data }
  }

  public async post<T>(
    endpoint: string,
    data?: any,
    contentType: string = 'application/json',
    idempotencyKey?: string
  ): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.post<T>(endpoint, data, {
      headers: {
        'Content-Type': contentType,
        ...(idempotencyKey && { 'Idempotency-Key': idempotencyKey }),
      },
    })
    return { success: true, data: response.data }
  }

  public async put<T>(
    endpoint: string,
    data?: any,
    contentType: string = 'application/json',
    idempotencyKey?: string
  ): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.put<T>(endpoint, data, {
      headers: {
        'Content-Type': contentType,
        ...(idempotencyKey && { 'Idempotency-Key': idempotencyKey }),
      },
    })
    return { success: true, data: response.data }
  }

  public async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.delete<T>(endpoint)
    return { success: true, data: response.data }
  }
}

export const apiClient = ApiClient.getInstance()
