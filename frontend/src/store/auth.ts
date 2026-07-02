import { create } from 'zustand'
import { persist, PersistStorage } from 'zustand/middleware'

interface User {
  id: string
  email: string
  name: string
  role: 'user' | 'admin'
}

interface AuthState {
  token: string | null
  refreshToken: string | null
  user: User | null
  login: (token: string, refreshToken: string, user: User) => void
  logout: () => void
  setUser: (user: User) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      refreshToken: null,
      user: null,
      login: (token, refreshToken, user) =>
        set({ token, refreshToken, user }),
      logout: () =>
        set({ token: null, refreshToken: null, user: null }),
      setUser: (user) => set({ user }),
    }),
    {
      name: 'auth-store',
    }
  )
)
