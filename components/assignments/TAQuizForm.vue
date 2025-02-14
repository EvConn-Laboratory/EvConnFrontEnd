<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

interface Question {
  id: number
  text: string
  options: string[]
  answer: string | null
}

const questions = ref<Question[]>([])
const currentQuestion = ref(0)
const loading = ref(false)

const handleAnswer = (answer: string) => {
  if (questions.value[currentQuestion.value]) {
    questions.value[currentQuestion.value].answer = answer
  }
}

async function onSubmit() {
  try {
    loading.value = true
    // Submit quiz answers logic here
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <Card>
    <CardHeader>
      <h3 class="text-lg font-semibold">Take Assessment</h3>
      <p class="text-sm text-muted-foreground">
        Question {{ currentQuestion + 1 }} of {{ questions.length }}
      </p>
    </CardHeader>
    <CardContent>
      <div v-if="questions.length">
        <p class="mb-4">{{ questions[currentQuestion].text }}</p>
        <RadioGroup 
          :value="questions[currentQuestion].answer"
          @update:value="handleAnswer"
          class="space-y-2"
        >
          <div v-for="option in questions[currentQuestion].options" :key="option">
            <FormField>
              <FormItem>
                <FormControl>
                  <RadioGroupItem :value="option" />
                </FormControl>
                <FormLabel>{{ option }}</FormLabel>
              </FormItem>
            </FormField>
          </div>
        </RadioGroup>
      </div>
    </CardContent>
    <CardFooter class="flex justify-between">
      <Button 
        variant="outline" 
        @click="currentQuestion--"
        :disabled="currentQuestion === 0"
      >
        Previous
      </Button>
      <Button 
        v-if="currentQuestion < questions.length - 1"
        @click="currentQuestion++"
      >
        Next
      </Button>
      <Button 
        v-else
        type="submit"
        :disabled="loading"
        @click="onSubmit"
      >
        {{ loading ? 'Submitting...' : 'Submit Quiz' }}
      </Button>
    </CardFooter>
  </Card>
</template>