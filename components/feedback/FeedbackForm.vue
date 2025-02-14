<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Rating } from '@/components/ui/rating'

const form = ref({
  rating: 0,
  comment: '',
  moduleId: ''
})

const loading = ref(false)

async function onSubmit() {
  try {
    loading.value = true
    // Submit feedback logic here
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <Card>
    <CardHeader>
      <h3 class="text-lg font-semibold">Submit Feedback</h3>
    </CardHeader>
    <CardContent>
      <Form @submit="onSubmit" class="space-y-4">
        <FormField name="rating">
          <FormItem>
            <FormLabel>Rating</FormLabel>
            <FormControl>
              <Rating v-model="form.rating" :max="5" />
            </FormControl>
          </FormItem>
        </FormField>

        <FormField name="comment">
          <FormItem>
            <FormLabel>Comment</FormLabel>
            <FormControl>
              <Textarea 
                v-model="form.comment"
                placeholder="Share your thoughts about this module..."
                required
              />
            </FormControl>
          </FormItem>
        </FormField>
      </Form>
    </CardContent>
    <CardFooter class="flex justify-end space-x-2">
      <Button variant="outline" @click="$router.back()">Cancel</Button>
      <Button type="submit" :disabled="loading">
        {{ loading ? 'Submitting...' : 'Submit Feedback' }}
      </Button>
    </CardFooter>
  </Card>
</template>