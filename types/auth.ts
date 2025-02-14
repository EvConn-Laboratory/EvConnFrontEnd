export interface User {
  id: number
  email: string
  name: string
  role: 'admin' | 'teacher' | 'student'
  createdAt: string
  updatedAt: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData extends LoginCredentials {
  name: string
  role: 'student' | 'teacher'
}