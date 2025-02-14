export const validators = {
  required: (value: any) => !!value || 'This field is required',
  
  email: (value: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return pattern.test(value) || 'Invalid email address'
  },
  
  password: (value: string) => {
    const hasMinLength = value.length >= 8
    const hasUpperCase = /[A-Z]/.test(value)
    const hasLowerCase = /[a-z]/.test(value)
    const hasNumber = /\d/.test(value)
    
    if (!hasMinLength) return 'Password must be at least 8 characters'
    if (!hasUpperCase) return 'Password must contain an uppercase letter'
    if (!hasLowerCase) return 'Password must contain a lowercase letter'
    if (!hasNumber) return 'Password must contain a number'
    
    return true
  },

  fileSize: (maxSize: number) => (file: File) => {
    return file.size <= maxSize || `File size must be less than ${maxSize / 1024 / 1024}MB`
  },

  fileType: (types: string[]) => (file: File) => {
    const extension = file.name.split('.').pop()?.toLowerCase()
    return types.includes(extension || '') || `File type must be ${types.join(', ')}`
  }
}