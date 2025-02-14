<script setup lang="ts">
import MainButton from '~/components/ui/button/MainButton.vue'
import { ref } from 'vue'

const isLoading = ref(false)

const handleNavigate = async () => {
  try {
    isLoading.value = true
    await navigateTo('/lms/dashboard')
  } catch (error) {
    console.error('Navigation failed:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <main id="hero" class="flex flex-col items-center justify-center min-h-[60vh]">
    <div class="text-center text-white max-w-2xl mx-auto px-4">
      <h1 class="text-5xl font-bold mb-4">EvConn Laboratory</h1>
      <h2 class="text-xl font-semibold mb-8">Everything Connected Laboratory</h2>
      <MainButton 
        variant="primary"
        size="md"
        :loading="isLoading"
        @click="handleNavigate"
      >
        Learning Module System (LMS)
        <Icon name="heroicons:arrow-right" class="ml-2 w-5 h-5" />
      </MainButton>
    </div>
  </main>
</template>