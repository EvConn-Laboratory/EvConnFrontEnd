<script setup lang="ts">
interface NavItem {
  label: string
  href: string
  isNuxtLink?: boolean
  icon?: string
}

import {
  NavigationMenu as NavigationMenuRoot,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'

const navItems: NavItem[] = [
  { 
    label: 'Home', 
    href: '#',
    icon: '/icons/evconnlogobaru_whitetxt.png'
  },
  { label: 'About', href: '#about' },
  { label: 'Teams', href: '#team' },
]
</script>

<template>
  <header class="py-4 flex items-center justify-center">
    <NavigationMenuRoot>
      <NavigationMenuList class="flex items-center space-x-4">
        <NavigationMenuItem v-for="item in navItems" :key="item.label">
          <NuxtLink v-if="item.isNuxtLink" :to="item.href">
            <NavigationMenuLink class="px-2 py-2 text-sm font-semibold transition-colors bg-blue-400 text-white rounded-sm hover:bg-primary">
              {{ item.label }}
            </NavigationMenuLink>
          </NuxtLink>
          <NavigationMenuLink 
            v-else 
            :href="item.href"
            class="px-4 py-1 text-sm font-medium transition-colors text-white hover:text-primary/75 inline-flex items-center gap-2"
          >
            <img 
              v-if="item.icon" 
              :src="item.icon" 
              :alt="`${item.label} icon`"
              class="h-[10cap] mr-4"
            />
            {{ item.label }}
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenuRoot>
  </header>
</template>