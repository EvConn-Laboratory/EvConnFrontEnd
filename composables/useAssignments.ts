import { ref } from 'vue'

interface Assignment {
  id: number
  moduleId: number
  type: 'TP' | 'TA' | 'Jurnal'
  title: string
  description: string
  dueDate: string
  status: 'pending' | 'submitted' | 'graded'
}

interface TPSubmission {
  title: string
  description: string
  file: File
}

interface TASubmission {
  answers: Array<{
    questionId: number
    answer: string
  }>
}

interface JurnalSubmission {
  title: string
  instructions: Array<{
    questionId: number
    answer: string
  }>
  attachments: File[]
}

export function useAssignments() {
  const assignments = ref<Assignment[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const submitTP = async (moduleId: number, submission: TPSubmission) => {
    loading.value = true
    const formData = new FormData()
    formData.append('title', submission.title)
    formData.append('description', submission.description)
    formData.append('file', submission.file)

    try {
      const response = await fetch(`http://localhost:5000/api/tp/submit`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      })

      if (!response.ok) throw new Error('Failed to submit TP')
      return await response.json()
    } catch (e) {
      error.value = e.message
      throw e
    } finally {
      loading.value = false
    }
  }

  const submitTA = async (moduleId: number, submission: TASubmission) => {
    loading.value = true
    try {
      const response = await fetch(`http://localhost:5000/api/ta/submit`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submission)
      })

      if (!response.ok) throw new Error('Failed to submit TA')
      return await response.json()
    } catch (e) {
      error.value = e.message
      throw e
    } finally {
      loading.value = false
    }
  }

  const submitJurnal = async (moduleId: number, submission: JurnalSubmission) => {
    loading.value = true
    const formData = new