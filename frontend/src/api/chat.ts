import { apiClient } from './client'

export interface Message {
  role: 'user' | 'assistant'
  content: string
  model: string
  tokens: { input: number; output: number }
  createdAt: string
}

export interface Chat {
  _id: string
  userId: string
  title: string
  messages: Message[]
  model: string
  systemPrompt: string
  context: Record<string, any>
  isPublic: boolean
  tags: string[]
  createdAt: string
  updatedAt: string
}

export interface SendMessagePayload {
  content: string
  model?: string
}

export const chatAPI = {
  getChats: () =>
    apiClient.get<{ data: Chat[] }>('/chats'),
  
  getChat: (id: string) =>
    apiClient.get<{ data: Chat }>(`/chats/${id}`),
  
  createChat: (data: Partial<Chat>) =>
    apiClient.post<{ data: Chat }>('/chats', data),
  
  updateChat: (id: string, data: Partial<Chat>) =>
    apiClient.put<{ data: Chat }>(`/chats/${id}`, data),
  
  deleteChat: (id: string) =>
    apiClient.delete(`/chats/${id}`),
  
  sendMessage: (id: string, payload: SendMessagePayload) =>
    apiClient.post<{ data: any }>(`/chats/${id}/messages`, payload),
  
  exportChat: (id: string, format: 'json' | 'md' | 'txt' = 'json') =>
    apiClient.get(`/chats/${id}/export?format=${format}`),
}
