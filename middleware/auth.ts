export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore()
  
  // Allow public routes
  if (to.meta.auth === false) {
    return
  }

  // Check authentication for protected routes
  if (!auth.isAuthenticated && !to.path.startsWith('/auth')) {
    return navigateTo('/auth/login')
  }
})