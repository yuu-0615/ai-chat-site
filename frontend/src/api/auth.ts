import { apiClient } from './client'

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  email: string
  password: string
  name: string
}

export interface AuthResponse {
  token: string
  refreshToken: string
  user: {
    id: string
    email: string
    name: string
    role: 'user' | 'admin'
  }
}

export const authAPI = {
  login: (payload: LoginPayload) =>
    apiClient.post<AuthResponse>('/auth/login', payload),
  
  register: (payload: RegisterPayload) =>
    apiClient.post<AuthResponse>('/auth/register', payload),
  
  refreshToken: (refreshToken: string) =>
    apiClient.post<AuthResponse>('/auth/refresh', { refreshToken }),
}
