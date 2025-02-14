<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useCourseStore } from '@/stores/course'
import { useAuthStore } from '@/stores/auth'

definePageMeta({
  layout: 'dashboard'
})

const courseStore = useCourseStore()
const auth = useAuthStore()
const loading = ref(true)

onMounted(async () => {
  try {
    await courseStore.fetchCourses()
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold tracking-tight">Courses</h2>
        <p class="text-muted-foreground">
          Manage your enrolled courses
        </p>
      </div>
      
      <Button v-if="auth.isTeacher" @click="router.push('/dashboard/courses/new')">
        Create Course
      </Button>
    </div>

    <!-- Course Grid -->
    <div v-if="loading" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <Card v-for="n in 6" :key="n">
        <CardContent class="h-[200px] animate-pulse bg-muted" />
      </Card>
    </div>

    <div v-else-if="courseStore.courses.length" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <Card 
        v-for="course in courseStore.courses" 
        :key="course.id"
        class="hover:shadow-md transition-shadow"
      >
        <CardContent class="p-6">
          <h3 class="text-lg font-semibold">{{ course.title }}</h3>
          <p class="mt-2 text-sm text-muted-foreground line-clamp-2">
            {{ course.description }}
          </p>
          
          <div class="mt-4 flex items-center justify-between">
            <span class="text-sm text-muted-foreground">
              {{ course.modules?.length || 0 }} modules
            </span>
            
            <Button 
              variant="outline" 
              size="sm"
              @click="router.push(`/dashboard/courses/${course.id}`)"
            >
              View Course
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>

    <div v-else class="text-center py-12">
      <div class="text-lg font-medium">No courses found</div>
      <p class="text-sm text-muted-foreground mt-2">
        {{ auth.isTeacher ? 'Create your first course' : 'Enroll in a course to get started' }}
      </p>
    </div>
  </div>
</template>