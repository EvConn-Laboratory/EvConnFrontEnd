import { defineStore } from 'pinia'
import type { 
  BaseAssignment, 
  TPAssignment, 
  TAAssignment, 
  JurnalAssignment 
} from '@/types/assignment'

export const useAssignmentStore = defineStore('assignment', {
  state: () => ({
    assignments: [] as BaseAssignment[],
    currentAssignment: null as BaseAssignment | null,
    loading: false,
    error: null as string | null
  }),

  getters: {
    tpAssignments: (state) => 
      state.assignments.filter((a): a is TPAssignment => a.type === 'TP'),
    
    taAssignments: (state) => 
      state.assignments.filter((a): a is TAAssignment => a.type === 'TA'),
    
    jurnalAssignments: (state) => 
      state.assignments.filter((a): a is JurnalAssignment => a.type === 'Jurnal'),
    
    pendingAssignments: (state) => 
      state.assignments.filter(a => a.status === 'pending')
  },

  actions: {
    async fetchAssignments(moduleId: number) {
      this.loading = true
      this.error = null

      try {
        const response = await fetch(`http://localhost:5000/api/modules/${moduleId}/assignments`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })

        const data = await response.json()
        if (!response.ok) throw new Error(data.message)

        this.assignments = data
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})