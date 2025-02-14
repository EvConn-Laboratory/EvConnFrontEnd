<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()

const navigation = [
  {
    title: 'Overview',
    href: '/dashboard',
    icon: 'HomeIcon'
  },
  {
    title: 'Courses',
    href: '/dashboard/courses',
    icon: 'BookOpenIcon'
  },
  {
    title: 'Grades',
    href: '/dashboard/grades',
    icon: 'ChartBarIcon'
  }
]

const handleLogout = () => {
  auth.logout()
  router.push('/auth/login')
}
</script>

<template>
  <div class="min-h-screen bg-background">
    <!-- Sidebar -->
    <aside class="fixed inset-y-0 left-0 w-64 border-r bg-card">
      <div class="flex h-16 items-center border-b px-6">
        <span class="text-lg font-bold">EvConn</span>
      </div>
      <nav class="space-y-1 p-4">
        <NuxtLink
          v-for="item in navigation"
          :key="item.href"
          :to="item.href"
          class="flex items-center gap-x-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
          :class="{ 'bg-accent': $route.path === item.href }"
        >
          <component :is="item.icon" class="h-5 w-5" />
          {{ item.title }}
        </NuxtLink>
      </nav>
    </aside>

    <!-- Main Content -->
    <div class="pl-64">
      <!-- Header -->
      <header class="sticky top-0 z-40 border-b bg-background">
        <div class="flex h-16 items-center justify-between px-6">
          <h1 class="text-lg font-medium">
            {{ $route.meta.title || 'Dashboard' }}
          </h1>
          
          <!-- User Menu -->
          <div class="flex items-center gap-4">
            <span class="text-sm">{{ auth.user?.name }}</span>
            <Button variant="outline" size="sm" @click="handleLogout">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="p-6">
        <slot />
      </main>
    </div>
  </div>
</template>