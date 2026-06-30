import { apiClient } from './client'

export interface User {
  _id: string
  email: string
  name: string
  role: 'user' | 'admin'
  isActive: boolean
  createdAt: string
}

export interface Analytics {
  totalUsers: number
  totalChats: number
  totalMessages: number
  timestamp: string
}

export interface TrainingData {
  _id: string
  adminId: string
  name: string
  description: string
  fileUrl: string
  fileSize: number
  dataType: 'prompt' | 'dataset' | 'feedback'
  status: 'pending' | 'processing' | 'completed' | 'failed'
  progress: number
  result?: Record<string, any>
  error?: string
  createdAt: string
}

export interface PromptTemplate {
  _id: string
  name: string
  description: string
  content: string
  category: string
  variables: string[]
  tags: string[]
  author: string
  isPublic: boolean
  usage: number
  createdAt: string
}

export const adminAPI = {
  // ユーザー管理
  getUsers: () =>
    apiClient.get<{ data: User[] }>('/admin/users'),
  
  updateUserRole: (id: string, role: 'user' | 'admin') =>
    apiClient.put<{ data: User }>(`/admin/users/${id}/role`, { role }),
  
  deleteUser: (id: string) =>
    apiClient.delete(`/admin/users/${id}`),
  
  // 分析
  getAnalytics: () =>
    apiClient.get<{ data: Analytics }>('/admin/analytics'),
  
  getDailyAnalytics: () =>
    apiClient.get<{ data: any[] }>('/admin/analytics/daily'),
  
  // トレーニングデータ
  getTrainingData: () =>
    apiClient.get<{ data: TrainingData[] }>('/admin/training'),
  
  uploadTrainingData: (data: FormData) =>
    apiClient.post<{ data: TrainingData }>('/admin/training', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  
  getTrainingDataById: (id: string) =>
    apiClient.get<{ data: TrainingData }>(`/admin/training/${id}`),
  
  deleteTrainingData: (id: string) =>
    apiClient.delete(`/admin/training/${id}`),
  
  // プロンプトテンプレート
  getPromptTemplates: () =>
    apiClient.get<{ data: PromptTemplate[] }>('/admin/prompts'),
  
  createPromptTemplate: (data: Partial<PromptTemplate>) =>
    apiClient.post<{ data: PromptTemplate }>('/admin/prompts', data),
  
  updatePromptTemplate: (id: string, data: Partial<PromptTemplate>) =>
    apiClient.put<{ data: PromptTemplate }>(`/admin/prompts/${id}`, data),
  
  deletePromptTemplate: (id: string) =>
    apiClient.delete(`/admin/prompts/${id}`),
  
  // 設定
  getSettings: () =>
    apiClient.get<{ data: any }>('/admin/settings'),
  
  updateSettings: (data: any) =>
    apiClient.put<{ data: any }>('/admin/settings', data),
}
