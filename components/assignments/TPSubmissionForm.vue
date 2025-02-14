<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { FileInput } from '@/components/ui/file-input'

const form = ref({
  title: '',
  description: '',
  file: null as File | null
})

const loading = ref(false)

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    form.value.file = target.files[0]
  }
}

async function onSubmit() {
  try {
    loading.value = true
    const formData = new FormData()
    formData.append('title', form.value.title)
    formData.append('description', form.value.description)
    if (form.value.file) {
      formData.append('file', form.value.file)
    }
    // Submit logic here
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <Card>
    <CardHeader>
      <h3 class="text-lg font-semibold">Submit TP Assignment</h3>
    </CardHeader>
    <CardContent>
      <Form @submit="onSubmit" class="space-y-4">
        <FormField name="title">
          <FormItem>
            <FormLabel>Title</FormLabel>
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

        <FormField name="file">
          <FormItem>
            <FormLabel>Upload File</FormLabel>
            <FormControl>
              <Input 
                type="file" 
                @change="handleFileChange"
                accept=".pdf,.doc,.docx"
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
        {{ loading ? 'Submitting...' : 'Submit Assignment' }}
      </Button>
    </CardFooter>
  </Card>
</template>