<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useCourseStore } from '@/stores/course'

definePageMeta({
  layout: 'dashboard'
})

const auth = useAuthStore()
const courseStore = useCourseStore()

onMounted(async () => {
  await courseStore.fetchCourses()
})
</script>

<template>
  <div class="space-y-6">
    <!-- Welcome Section -->
    <div class="rounded-lg border bg-card p-6">
      <h2 class="text-2xl font-bold tracking-tight">
        Welcome back, {{ auth.user?.name }}!
      </h2>
      <p class="text-muted-foreground">
        Here's an overview of your learning progress
      </p>
    </div>

    <!-- Stats Grid -->
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <div class="rounded-lg border bg-card p-6">
        <div class="text-sm font-medium text-muted-foreground">
          Enrolled Courses
        </div>
        <div class="mt-2 text-2xl font-bold">
          {{ courseStore.courses.length }}
        </div>
      </div>
      
      <!-- Add more stat cards as needed -->
    </div>

    <!-- Recent Activity -->
    <div class="rounded-lg border bg-card">
      <div class="p-6">
        <h3 class="text-lg font-medium">Recent Activity</h3>
      </div>
      <!-- Add recent activity list here -->
    </div>
  </div>
</template>