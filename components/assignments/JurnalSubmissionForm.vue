<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface JurnalInstruction {
  id: number
  question: string
  answer: string
}

const form = ref({
  title: '',
  instructions: [] as JurnalInstruction[],
  attachments: [] as File[]
})

const loading = ref(false)

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    form.value.attachments = Array.from(target.files)
  }
}

async function onSubmit() {
  try {
    loading.value = true
    const formData = new FormData()
    formData.append('title', form.value.title)
    formData.append('instructions', JSON.stringify(form.value.instructions))
    form.value.attachments.forEach(file => {
      formData.append('attachments', file)
    })
    // Submit jurnal logic here
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <Card>
    <CardHeader>
      <h3 class="text-lg font-semibold">Submit Jurnal</h3>
    </CardHeader>
    <CardContent>
      <Form @submit="onSubmit" class="space-y-6">
        <FormField name="title">
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input v-model="form.title" required />
            </FormControl>
          </FormItem>
        </FormField>

        <div class="space-y-4">
          <h4 class="font-medium">Instructions</h4>
          <div v-for="(instruction, index) in form.instructions" :key="index" class="space-y-4">
            <FormField :name="`instruction-${index}`">
              <FormItem>
                <FormLabel>Question {{ index + 1 }}</FormLabel>
                <FormControl>
                  <Textarea v-model="instruction.answer" required />
                </FormControl>
              </FormItem>
            </FormField>
          </div>
        </div>

        <FormField name="attachments">
          <FormItem>
            <FormLabel>Attachments</FormLabel>
            <FormControl>
              <Input 
                type="file" 
                multiple 
                @change="handleFileUpload"
                accept=".pdf,.doc,.docx,.jpg,.png"
              />
            </FormControl>
          </FormItem>
        </FormField>
      </Form>
    </CardContent>
    <CardFooter class="flex justify-end space-x-2">
      <Button variant="outline" @click="$router.back()">Cancel</Button>
      <Button type="submit" :disabled="loading">
        {{ loading ? 'Submitting...' : 'Submit Jurnal' }}
      </Button>
    </CardFooter>
  </Card>
</template>