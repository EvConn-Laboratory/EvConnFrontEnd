import { ref } from 'vue'

interface Feedback {
  id: number
  moduleId: number
  userId: number
  rating: number
  comment: string
  createdAt: string
}

export function useFeedback() {
  const feedbacks = ref<Feedback[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const getFeedbacks = async (moduleId: number) => {
    loading.value = true
    try {
      const response = await fetch(`http://localhost:5000/api/feedback/${moduleId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })

      if (!response.ok) throw new Error('Failed to fetch feedbacks')
      feedbacks.value = await response.json()
    } catch (e) {
      error.value = e.message
      throw e
    } finally {
      loading.value = false
    }
  }

  const submitFeedback = async (moduleId: number, data: { rating: number; comment: string }) => {
    loading.value = true
    try {
      const response = await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ moduleId, ...data })
      })

      if (!response.ok) throw new Error('Failed to submit feedback')
      const newFeedback = await response.json()
      feedbacks.value.push(newFeedback)
      return newFeedback
    } catch (e) {
      error.value = e.message
      throw e
    } finally {
      loading.value = false
    }
  }

  return {
    feedbacks,
    loading,
    error,
    getFeedbacks,
    submitFeedback
  }
}