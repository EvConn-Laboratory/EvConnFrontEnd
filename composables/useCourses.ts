import { ref } from 'vue'

interface Course {
  id: number
  title: string
  description: string
  isActive: boolean
  modules: Module[]
}

interface Module {
  id: number
  title: string
  description: string
  startDate: string
  endDate: string
  order: number
}

export function useCourses() {
  const courses = ref<Course[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchCourses = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await fetch('http://localhost:5000/api/courses', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      
      if (!response.ok) throw new Error('Failed to fetch courses')
      
      courses.value = await response.json()
    } catch (e) {
      error.value = e.message
      throw e
    } finally {
      loading.value = false
    }
  }

  const createCourse = async (courseData: Omit<Course, 'id'>) => {
    loading.value = true
    error.value = null

    try {
      const response = await fetch('http://localhost:5000/api/courses', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(courseData)
      })

      if (!response.ok) throw new Error('Failed to create course')

      const newCourse = await response.json()
      courses.value.push(newCourse)
      return newCourse
    } catch (e) {
      error.value = e.message
      throw e
    } finally {
      loading.value = false
    }
  }

  return {
    courses,
    loading,
    error,
    fetchCourses,
    createCourse
  }
}