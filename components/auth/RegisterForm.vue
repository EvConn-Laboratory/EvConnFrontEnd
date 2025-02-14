<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

const form = ref({
  name: '',
  email: '',
  password: '',
  role: 'student'
})

const loading = ref(false)

async function onSubmit() {
  try {
    loading.value = true
    // Register logic here
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <Card class="w-full max-w-md mx-auto">
    <CardHeader>
      <h2 class="text-2xl font-bold text-center">Register for EvConn</h2>
    </CardHeader>
    <CardContent>
      <Form @submit="onSubmit" class="space-y-4">
        <FormField name="name">
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input v-model="form.name" required />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField name="email">
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" v-model="form.email" required />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField name="password">
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input type="password" v-model="form.password" required />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <Button type="submit" class="w-full" :disabled="loading">
          {{ loading ? 'Registering...' : 'Register' }}
        </Button>
      </Form>
    </CardContent>
  </Card>
</template>