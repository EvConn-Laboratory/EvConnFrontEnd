export interface Course {
  id: number
  title: string
  description: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  modules: Module[]
}

export interface Module {
  id: number
  courseId: number
  title: string
  description: string
  order: number
  startDate: string
  endDate: string
  assignments: Assignment[]
}

export interface Assignment {
  id: number
  moduleId: number
  type: 'TP' | 'TA' | 'Jurnal'
  title: string
  description: string
  dueDate: string
  maxScore: number
}