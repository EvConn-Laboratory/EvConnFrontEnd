import { defineStore } from 'pinia'
import type { Feedback, FeedbackInput } from '@/types/feedback'

export const useFeedbackStore = defineStore('feedback', {
  state: () => ({
    feedbacks: [] as Feedback[],
    loading: false,
    error: null as string | null
  }),

  getters: {
    averageRating: (state) => {
      if (!state.feedbacks.length) return 0
      const sum = state.feedbacks.reduce((acc, f) => acc + f.rating, 0)
      return Math.round((sum / state.feedbacks.length) * 10) / 10
    }
  },

  actions: {
    async submitFeedback(feedback: FeedbackInput) {
      this.loading = true
      this.error = null

      try {
        const response = await fetch('http://localhost:5000/api/feedback', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(feedback)
        })

        const data = await response.json()
        if (!response.ok) throw new Error(data.message)

        this.feedbacks.push(data)
        return data
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})