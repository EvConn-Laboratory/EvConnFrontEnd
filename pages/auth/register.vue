<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select'
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()
const loading = ref(false)
const error = ref('')

const form = ref({
  nim: '',
  name: '',
  password: '',
  role: ''
})

const majorOptions = [
  { value: 'Jaringan Komputer dan Data', label: 'Jaringan Komputer dan Data' },
  { value: 'Komputasi Awan', label: 'Komputasi Awan' }
]

async function onSubmit() {
  try {
    if (!form.value.nim || !form.value.name || !form.value.password || !form.value.role) {
      error.value = 'All fields are required'
      return
    }

    loading.value = true
    error.value = ''

    // Validate NIM format
    if (!/^\d+$/.test(form.value.nim)) {
      error.value = 'NIM must contain only numbers'
      return
    }

    await auth.register({
      email: form.value.nim,
      name: form.value.name,
      password: form.value.password,
      role: form.value.role // This will be sent directly as role to backend
    })

    await router.push('/dashboard')
  } catch (err: any) {
    error.value = err.message || 'Registration failed'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="container flex items-center justify-center min-h-screen py-10">
    <Card class="w-full max-w-md">
      <CardHeader>
        <h2 class="text-2xl font-bold text-center">Register for EvConn</h2>
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

          <FormField name="name">
            <FormItem>
              <FormLabel>Name</FormLabel>
              <Input 
                v-model="form.name"
                type="text"
                placeholder="Enter your full name"
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

          <FormField name="role">
            <FormItem>
              <FormLabel>Workshop</FormLabel>
              <Select v-model="form.role" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select your workshop" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem 
                    v-for="option in majorOptions"
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.label }}
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          </FormField>

          <div v-if="error" class="text-sm text-destructive">
            {{ error }}
          </div>

          <Button type="submit" class="w-full" :disabled="loading">
            {{ loading ? 'Registering...' : 'Register' }}
          </Button>

          <div class="text-center text-sm">
            Already have an account?
            <NuxtLink 
              to="/auth/login"
              class="text-primary hover:underline"
            >
              Login here
            </NuxtLink>
          </div>
        </Form>
      </CardContent>
    </Card>
  </div>
</template>