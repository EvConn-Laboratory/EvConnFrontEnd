<script setup lang="ts">
interface Props {
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  to?: string
  disabled?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
  disabled: false,
  loading: false
})

const getVariantClasses = computed(() => {
  const variants = {
    default: 'bg-white text-gray-900 hover:bg-gray-100',
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    outline: 'border-2 border-white text-white hover:bg-white/10',
    ghost: 'text-white hover:bg-white/10'
  }
  return variants[props.variant]
})

const getSizeClasses = computed(() => {
  const sizes = {
    sm: 'text-sm px-4 py-2',
    md: 'text-base px-6 py-2.5',
    lg: 'text-lg px-8 py-3'
  }
  return sizes[props.size]
})
</script>

<template>
  <component
    :is="to ? 'NuxtLink' : 'button'"
    :to="to"
    :disabled="disabled || loading"
    :class="[
      'inline-flex items-center justify-center font-medium transition-colors',
      'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
      'disabled:opacity-50 rounded-full disabled:cursor-not-allowed',
      getVariantClasses,
      getSizeClasses
    ]"
  >
    <!-- Loading Spinner -->
    <Icon
      v-if="loading"
      name="heroicons:arrow-path"
      class="w-5 h-5 mr-2 animate-spin"
    />
    
    <!-- Content -->
    <slot />
  </component>
</template>

<style scoped>
.focus\:ring-offset-2:focus {
  --tw-ring-offset-width: 2px;
}
</style>