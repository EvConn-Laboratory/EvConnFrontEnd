<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const form = ref({
  title: '',
  description: '',
  moduleCount: 0
})

const loading = ref(false)

async function onSubmit() {
  try {
    loading.value = true
    // Submit course creation logic here
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <Card>
    <CardHeader>
      <h3 class="text-lg font-semibold">Create New Course</h3>
    </CardHeader>
    <CardContent>
      <Form @submit="onSubmit" class="space-y-4">
        <FormField name="title">
          <FormItem>
            <FormLabel>Course Title</FormLabel>
            <FormControl>
              <Input v-model="form.title" required />
            </FormControl>
          </FormItem>
        </FormField>

        <FormField name="description">
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea v-model="form.description" required />
            </FormControl>
          </FormItem>
        </FormField>
      </Form>
    </CardContent>
    <CardFooter class="flex justify-end space-x-2">
      <Button variant="outline" @click="$router.back()">
        Cancel
      </Button>
      <Button type="submit" :disabled="loading">
        {{ loading ? 'Creating...' : 'Create Course' }}
      </Button>
    </CardFooter>
  </Card>
</template>