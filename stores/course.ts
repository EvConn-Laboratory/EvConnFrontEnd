import { defineStore } from 'pinia'
import type { Course } from '@/types/course'

export const useCourseStore = defineStore('course', {
  state: () => ({
    courses: [] as Course[],
    currentCourse: null as Course | null,
    loading: false,
    error: null as string | null
  }),

  getters: {
    activeCourses: (state) => state.courses.filter(course => course.isActive),
    getCourseById: (state) => (id: number) => 
      state.courses.find(course => course.id === id)
  },

  actions: {
    async fetchCourses() {
      this.loading = true
      this.error = null

      try {
        const response = await fetch('http://localhost:5000/api/courses', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })

        const data = await response.json()
        if (!response.ok) throw new Error(data.message)

        this.courses = data
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async createCourse(courseData: Partial<Course>) {
      this.loading = true
      this.error = null

      try {
        const response = await fetch('http://localhost:5000/api/courses', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(courseData)
        })

        const data = await response.json()
        if (!response.ok) throw new Error(data.message)

        this.courses.push(data)
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