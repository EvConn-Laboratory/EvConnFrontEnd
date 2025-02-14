import { defineStore } from 'pinia'
import type { User, LoginCredentials, RegisterData } from '@/types/auth'

interface RegisterData {
  email: string
  name: string
  password: string
  role: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: null as string | null,
    loading: false,
    error: null as string | null
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.role === 'admin',
    isTeacher: (state) => state.user?.role === 'teacher',
    isStudent: (state) => state.user?.role === 'student'
  },

  actions: {
    async init() {
      const token = localStorage.getItem('token')
      if (token) {
        this.token = token
        await this.fetchUser()
      }
    },

    async login(credentials: { email: string; password: string }) {
      this.loading = true
      this.error = null
      
      try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials)
        })

        const data = await response.json()
        if (!response.ok) throw new Error(data.message)

        this.token = data.token
        localStorage.setItem('token', data.token)
        await this.fetchUser()
      } catch (error: any) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchUser() {
      try {
        const response = await fetch('http://localhost:5000/api/users', {
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        })
        
        const data = await response.json()
        if (!response.ok) throw new Error(data.message)
        
        this.user = data
      } catch (error) {
        this.logout()
        throw error
      }
    },

    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
    },

    async register(data: { email: string; name: string; password: string; role: string }) {
      this.loading = true
      try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: data.email,
            name: data.name,
            password: data.password,
            role: data.role // Send role directly as it's already the workshop value
          })
        })

        const result = await response.json()
        if (!response.ok) {
          throw new Error(result.message)
        }

        return await this.login({
          email: data.email,
          password: data.password
        })
      } catch (error: any) {
        throw new Error(error.message || 'Registration failed')
      } finally {
        this.loading = false
      }
    }
  }
})