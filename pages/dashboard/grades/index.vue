<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

definePageMeta({
  layout: 'dashboard'
})

const loading = ref(true)
const grades = ref([])

const averageGrade = computed(() => {
  if (!grades.value.length) return 0
  const sum = grades.value.reduce((acc, grade) => acc + grade.score, 0)
  return Math.round(sum / grades.value.length)
})

onMounted(async () => {
  try {
    // Fetch grades here
  } finally {
    loading.value = false
  }
})

const getGradeColor = (score: number) => {
  if (score >= 80) return 'text-green-500'
  if (score >= 60) return 'text-yellow-500'
  return 'text-red-500'
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-2xl font-bold tracking-tight">Your Grades</h2>
      <p class="text-muted-foreground">Track your academic progress</p>
    </div>

    <!-- Grade Overview -->
    <Card>
      <CardHeader>
        <h3 class="text-lg font-semibold">Overall Performance</h3>
      </CardHeader>
      <CardContent>
        <div class="flex items-center gap-4">
          <div class="text-3xl font-bold" :class="getGradeColor(averageGrade)">
            {{ averageGrade }}%
          </div>
          <Progress :value="averageGrade" class="flex-1" />
        </div>
      </CardContent>
    </Card>

    <!-- Grade List -->
    <div v-if="loading" class="grid gap-4">
      <Card v-for="n in 3" :key="n">
        <CardContent class="h-24 animate-pulse bg-muted" />
      </Card>
    </div>

    <div v-else-if="grades.length" class="grid gap-4">
      <Card v-for="grade in grades" :key="grade.id">
        <CardContent class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <h4 class="font-semibold">{{ grade.title }}</h4>
              <p class="text-sm text-muted-foreground">
                {{ grade.type }} - {{ grade.moduleName }}
              </p>
            </div>
            <div class="text-xl font-bold" :class="getGradeColor(grade.score)">
              {{ grade.score }}%
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <div v-else class="text-center py-12">
      <p class="text-muted-foreground">No grades available yet</p>
    </div>
  </div>
</template>