<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

defineProps<{
  course: {
    id: number
    title: string
    description: string
  }
}>()
</script>

<template>
  <Card class="hover:shadow-md transition-shadow">
    <CardHeader>
      <CardTitle>{{ course.title }}</CardTitle>
      <CardDescription>{{ course.description }}</CardDescription>
    </CardHeader>
    <CardContent class="flex justify-end">
      <Button variant="outline" :to="`/dashboard/courses/${course.id}`">
        View Course
      </Button>
    </CardContent>
  </Card>
</template>