import { create } from 'zustand'

interface Chat {
  id: string
  title: string
  model: string
  messageCount: number
  createdAt: string
  updatedAt: string
}

interface ChatState {
  chats: Chat[]
  currentChatId: string | null
  setChats: (chats: Chat[]) => void
  setCurrentChatId: (id: string | null) => void
  addChat: (chat: Chat) => void
  removeChat: (id: string) => void
  updateChat: (id: string, chat: Partial<Chat>) => void
}

export const useChatStore = create<ChatState>((set) => ({
  chats: [],
  currentChatId: null,
  setChats: (chats) => set({ chats }),
  setCurrentChatId: (id) => set({ currentChatId: id }),
  addChat: (chat) =>
    set((state) => ({ chats: [chat, ...state.chats] })),
  removeChat: (id) =>
    set((state) => ({
      chats: state.chats.filter((c) => c.id !== id),
    })),
  updateChat: (id, chat) =>
    set((state) => ({
      chats: state.chats.map((c) => (c.id === id ? { ...c, ...chat } : c)),
    })),
}))
