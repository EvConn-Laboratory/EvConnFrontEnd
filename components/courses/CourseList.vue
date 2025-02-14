<script setup lang="ts">
import { ref } from 'vue'
import CourseCard from './CourseCard.vue'
import { Button } from '@/components/ui/button'

interface Course {
  id: number
  title: string
  description: string
}

const courses = ref<Course[]>([])
const loading = ref(true)

// Fetch courses when component mounts
onMounted(async () => {
  try {
    const response = await fetch('http://localhost:5000/api/courses', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    courses.value = await response.json()
  } catch (error) {
    console.error('Failed to fetch courses:', error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold">Your Courses</h2>
      <Button variant="outline" @click="$router.push('/courses/new')">
        Add Course
      </Button>
    </div>

    <div v-if="loading" class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div v-for="n in 3" :key="n" class="h-[200px] rounded-lg animate-pulse bg-muted" />
    </div>

    <div v-else-if="courses.length" class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <CourseCard v-for="course in courses" :key="course.id" :course="course" />
    </div>

    <div v-else class="text-center py-8 text-muted-foreground">
      No courses found. Create your first course!
    </div>
  </div>
</template>