import axios, { AxiosInstance } from 'axios'
import { useAuthStore } from '../store/auth'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

let apiInstance: AxiosInstance | null = null

export const getApiClient = (): AxiosInstance => {
  if (!apiInstance) {
    apiInstance = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    apiInstance.interceptors.request.use((config) => {
      const { token } = useAuthStore.getState()
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    })

    apiInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true
          const { refreshToken, login, logout } = useAuthStore.getState()
          
          if (refreshToken) {
            try {
              const response = await axios.post(`${API_URL}/auth/refresh`, {
                refreshToken,
              })
              const { token, refreshToken: newRefreshToken, user } = response.data
              login(token, newRefreshToken, user)
              originalRequest.headers.Authorization = `Bearer ${token}`
              return apiInstance!(originalRequest)
            } catch (err) {
              logout()
            }
          }
        }
        return Promise.reject(error)
      }
    )
  }

  return apiInstance
}

export const apiClient = getApiClient()
