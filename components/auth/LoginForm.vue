<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

const form = ref({
  email: '',
  password: ''
})
const loading = ref(false)
const error = ref('')

const onSubmit = async () => {
  try {
    loading.value = true
    // Login logic here
  } catch (err) {
    error.value = 'Login failed'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <Card class="w-full max-w-md mx-auto">
    <CardHeader>
      <h2 class="text-2xl font-bold text-center">Login to EvConn</h2>
    </CardHeader>
    <CardContent>
      <Form @submit="onSubmit">
        <Alert v-if="error" variant="destructive" class="mb-4">
          <AlertDescription>{{ error }}</AlertDescription>
        </Alert>
        
        <div class="space-y-4">
          <FormField name="email">
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input 
                  v-model="form.email"
                  type="email" 
                  placeholder="Enter your email"
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField name="password">
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input 
                  v-model="form.password"
                  type="password" 
                  placeholder="Enter your password"
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <Button type="submit" class="w-full" :disabled="loading">
            {{ loading ? 'Logging in...' : 'Login' }}
          </Button>
        </div>
      </Form>
    </CardContent>
  </Card>
</template>