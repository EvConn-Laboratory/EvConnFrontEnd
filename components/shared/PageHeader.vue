<script setup lang="ts">
import { Button } from '@/components/ui/button'

defineProps<{
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
}>()
</script>

<template>
  <div class="flex justify-between items-center mb-6">
    <div>
      <h1 class="text-2xl font-semibold tracking-tight">{{ title }}</h1>
      <p v-if="description" class="text-sm text-muted-foreground">
        {{ description }}
      </p>
    </div>
    <Button v-if="action" @click="action.onClick">
      {{ action.label }}
    </Button>
  </div>
</template>