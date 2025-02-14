<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { useCourseStore } from '@/stores/course'

const route = useRoute()
const courseStore = useCourseStore()
const loading = ref(true)

const courseId = Number(route.params.id)
const activeTab = ref('overview')

onMounted(async () => {
  try {
    await courseStore.fetchCourseById(courseId)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div v-if="loading" class="animate-pulse space-y-6">
    <div class="h-8 w-1/3 bg-muted rounded" />
    <div class="h-32 bg-muted rounded" />
  </div>

  <div v-else-if="courseStore.currentCourse" class="space-y-6">
    <!-- Course Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold">{{ courseStore.currentCourse.title }}</h2>
        <p class="text-muted-foreground mt-1">
          {{ courseStore.currentCourse.description }}
        </p>
      </div>
    </div>

    <!-- Course Content -->
    <Tabs v-model="activeTab" class="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="modules">Modules</TabsTrigger>
        <TabsTrigger value="assignments">Assignments</TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <!-- Course Overview Content -->
      </TabsContent>

      <TabsContent value="modules">
        <!-- Course Modules List -->
        <div class="space-y-4">
          <Card v-for="module in courseStore.currentCourse.modules" :key="module.id">
            <CardHeader>
              <h3 class="text-lg font-semibold">{{ module.title }}</h3>
            </CardHeader>
            <CardContent>
              <p class="text-sm text-muted-foreground">
                {{ module.description }}
              </p>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="assignments">
        <!-- Course Assignments List -->
      </TabsContent>
    </Tabs>
  </div>

  <div v-else class="text-center py-12">
    <div class="text-lg font-medium">Course not found</div>
    <Button 
      variant="outline" 
      class="mt-4"
      @click="router.push('/dashboard/courses')"
    >
      Back to Courses
    </Button>
  </div>
</template>