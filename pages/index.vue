<script setup lang="ts">
import MainNav from '~/components/landing/MainNav.vue'
import PageFooter from '~/components/landing/PageFooter.vue'
import HeroSection from '~/components/landing/HeroSection.vue'
import AboutSection from '~/components/landing/AboutSection.vue'
import BackgroundPattern from '~/components/landing/BackgroundPattern.vue'
import TeamSection from '~/components/landing/TeamSection.vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

// Check if user is already authenticated
const checkAuth = async () => {
  if (auth.isAuthenticated) {
    await navigateTo('/dashboard')
  }
}

// Only check auth status, don't force initialization
onMounted(() => {
  checkAuth()
})

definePageMeta({
  layout: false,
  auth: false // Explicitly mark as public route
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-[#2C4E65] to-[#3FABB3] relative">
    <!-- Background Pattern -->
    <div class="absolute inset-0 bg-cover bg-heropattern opacity-70"></div>
    <!-- Main Content -->
    <div class="relative z-10">
      <MainNav />
      <!-- Hero Section -->
      <HeroSection />
      <!-- Background Pattern SVG -->
      <BackgroundPattern />
      <!-- About Section -->
      <AboutSection />
      <!-- Team Section -->
      <TeamSection />
      <PageFooter />
    </div>
  </div>
</template>