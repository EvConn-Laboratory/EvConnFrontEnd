<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Rating } from '@/components/ui/rating'

interface Feedback {
  id: number
  userId: number
  userName: string
  rating: number
  comment: string
  createdAt: string
}

const feedbacks = ref<Feedback[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    // Fetch feedbacks logic here
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="space-y-4">
    <div v-if="loading" class="space-y-4">
      <Card v-for="n in 3" :key="n">
        <CardContent class="animate-pulse p-4">
          <div class="h-20 bg-muted rounded" />
        </CardContent>
      </Card>
    </div>

    <div v-else-if="feedbacks.length" class="space-y-4">
      <Card v-for="feedback in feedbacks" :key="feedback.id">
        <CardContent class="p-4">
          <div class="flex items-start space-x-4">
            <Avatar>
              <AvatarImage :src="`https://avatar.vercel.sh/${feedback.userId}`" />
              <AvatarFallback>{{ feedback.userName[0] }}</AvatarFallback>
            </Avatar>
            <div class="flex-1">
              <div class="flex items-center justify-between">
                <h4 class="font-semibold">{{ feedback.userName }}</h4>
                <Rating :value="feedback.rating" readonly />
              </div>
              <p class="text-sm text-muted-foreground mt-1">
                {{ feedback.comment }}
              </p>
              <time class="text-xs text-muted-foreground mt-2">
                {{ new Date(feedback.createdAt).toLocaleDateString() }}
              </time>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <div v-else class="text-center py-8 text-muted-foreground">
      No feedback yet
    </div>
  </div>
</template>