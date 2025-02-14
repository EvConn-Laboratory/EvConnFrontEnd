<template>
  <div class="min-h-screen bg-background">
    <!-- Header -->
    <header class="border-b">
      <div class="container flex h-16 items-center px-4">
        <NuxtLink to="/" class="flex items-center space-x-2">
          <span class="font-bold">EvConn</span>
        </NuxtLink>

        <!-- Navigation -->
        <nav v-if="auth.isAuthenticated" class="ml-auto flex items-center space-x-4">
          <NuxtLink 
            v-if="auth.isTeacher" 
            to="/dashboard/courses" 
            class="text-sm font-medium transition-colors hover:text-primary"
          >
            Courses
          </NuxtLink>
          <NuxtLink 
            to="/dashboard/assignments" 
            class="text-sm font-medium transition-colors hover:text-primary"
          >
            Assignments
          </NuxtLink>
          <NuxtLink 
            to="/dashboard/grades" 
            class="text-sm font-medium transition-colors hover:text-primary"
          >
            Grades
          </NuxtLink>
          
          <!-- User Menu -->
          <Dialog>
            <button class="text-sm font-medium hover:text-primary">
              {{ auth.user?.name }}
            </button>
            <button 
              @click="handleLogout"
              class="text-sm font-medium text-destructive hover:text-destructive/90"
            >
              Logout
            </button>
          </Dialog>
        </nav>

        <!-- Auth Links -->
        <div v-else class="ml-auto">
          <NuxtLink 
            to="/auth/login"
            class="text-sm font-medium transition-colors hover:text-primary"
          >
            Login
          </NuxtLink>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto py-6 px-4">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { Dialog } from '@/components/ui/dialog'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()

onMounted(() => {
  if (localStorage.getItem('token')) {
    auth.fetchUser()
  }
})

const handleLogout = () => {
  auth.logout()
  router.push('/auth/login')
}
</script>