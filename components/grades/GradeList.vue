<script setup lang="ts">
import { ref } from 'vue'
import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import GradeCard from './GradeCard.vue'

interface Grade {
  id: number
  moduleTitle: string
  score: number
  maxScore: number
  type: 'TP' | 'TA' | 'Jurnal'
  submittedAt: string
}

const grades = ref<Grade[]>([])
const loading = ref(true)
const filter = ref('all')

const filteredGrades = computed(() => {
  if (filter.value === 'all') return grades.value
  return grades.value.filter(grade => grade.type.toLowerCase() === filter.value)
})

const averageScore = computed(() => {
  if (!grades.value.length) return 0
  const total = grades.value.reduce((sum, grade) => 
    sum + (grade.score / grade.maxScore) * 100, 0
  )
  return Math.round(total / grades.value.length)
})

onMounted(async () => {
  try {
    // Fetch grades logic here using your backend API
    const response = await fetch('http://localhost:5000/api/grades', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    grades.value = await response.json()
  } catch (error) {
    console.error('Failed to fetch grades:', error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div>
        <h2 class="text-2xl font-bold">Your Grades</h2>
        <p class="text-muted-foreground">
          Average Score: {{ averageScore }}%
        </p>
      </div>
      
      <Select v-model="filter">
        <SelectTrigger class="w-[180px]">
          <SelectValue placeholder="Filter by type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Assignments</SelectItem>
          <SelectItem value="tp">TP</SelectItem>
          <SelectItem value="ta">TA</SelectItem>
          <SelectItem value="jurnal">Jurnal</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div v-if="loading" class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card v-for="n in 6" :key="n" class="h-[120px] animate-pulse bg-muted" />
    </div>

    <div v-else-if="filteredGrades.length" class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <GradeCard 
        v-for="grade in filteredGrades" 
        :key="grade.id" 
        :grade="grade" 
      />
    </div>

    <div v-else class="text-center py-8 text-muted-foreground">
      No grades found for selected filter
    </div>
  </div>
</template>