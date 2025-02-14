<script setup lang="ts">
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { CheckCircle } from 'lucide-vue-next'

defineProps<{
  title?: string
  message: string
}>()
</script>

<template>
  <Alert variant="success">
    <CheckCircle class="h-4 w-4" />
    <AlertTitle v-if="title">{{ title }}</AlertTitle>
    <AlertDescription>{{ message }}</AlertDescription>
  </Alert>
</template>