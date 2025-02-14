<script setup lang="ts">
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

interface Grade {
  id: number
  moduleTitle: string
  score: number
  maxScore: number
  type: 'TP' | 'TA' | 'Jurnal'
  submittedAt: string
}

defineProps<{
  grade: Grade
}>()

const getScoreColor = (score: number, maxScore: number) => {
  const percentage = (score / maxScore) * 100
  if (percentage >= 80) return 'text-green-600'
  if (percentage >= 60) return 'text-yellow-600'
  return 'text-red-600'
}
</script>

<template>
  <Card class="hover:shadow-md transition-shadow">
    <CardHeader class="pb-2">
      <div class="flex justify-between items-start">
        <div>
          <h4 class="font-semibold">{{ grade.moduleTitle }}</h4>
          <p class="text-sm text-muted-foreground">{{ grade.type }}</p>
        </div>
        <span :class="getScoreColor(grade.score, grade.maxScore)" class="font-bold">
          {{ grade.score }}/{{ grade.maxScore }}
        </span>
      </div>
    </CardHeader>
    <CardContent>
      <Progress 
        :value="(grade.score / grade.maxScore) * 100" 
        :class="getScoreColor(grade.score, grade.maxScore)"
      />
      <p class="text-xs text-muted-foreground mt-2">
        Submitted on {{ new Date(grade.submittedAt).toLocaleDateString() }}
      </p>
    </CardContent>
  </Card>
</template>