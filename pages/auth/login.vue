<template>
  <div class="container flex items-center justify-center min-h-screen py-10">
    <Card class="w-full max-w-md">
      <CardHeader>
        <h2 class="text-2xl font-bold text-center">Login to EvConn</h2>
      </CardHeader>
      <CardContent>
        <Form @submit="onSubmit" class="space-y-4">
          <FormField name="nim">
            <FormItem>
              <FormLabel>NIM</FormLabel>
              <Input 
                v-model="form.nim"
                type="text"
                placeholder="Enter your NIM"
                required
              />
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField name="password">
            <FormItem>
              <FormLabel>Password</FormLabel>
              <Input 
                v-model="form.password"
                type="password"
                placeholder="Enter your password"
                required
              />
              <FormMessage />
            </FormItem>
          </FormField>

          <div v-if="error" class="text-sm text-destructive">
            {{ error }}
          </div>

          <Button type="submit" class="w-full" :disabled="loading">
            {{ loading ? 'Logging in...' : 'Login' }}
          </Button>

          <div class="text-center text-sm">
            Don't have an account?
            <NuxtLink 
              to="/auth/register"
              class="text-primary hover:underline"
            >
              Register here
            </NuxtLink>
          </div>
        </Form>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()

const form = ref({
  nim: '',
  password: ''
})

const loading = ref(false)
const error = ref('')

async function onSubmit() {
  try {
    loading.value = true
    error.value = ''

    await auth.login({
      email: form.value.nim, // Using NIM as email
      password: form.value.password
    })

    router.push('/dashboard')
  } catch (err: any) {
    error.value = err.message || 'Login failed'
  } finally {
    loading.value = false
  }
}
</script>