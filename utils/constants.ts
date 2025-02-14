export const ROLES = {
  ADMIN: 'admin',
  TEACHER: 'teacher',
  STUDENT: 'student'
} as const

export const ASSIGNMENT_TYPES = {
  TP: 'TP',
  TA: 'TA',
  JURNAL: 'Jurnal'
} as const

export const SUBMISSION_STATUS = {
  PENDING: 'pending',
  SUBMITTED: 'submitted',
  GRADED: 'graded'
} as const

export const FILE_TYPES = {
  DOCUMENTS: ['.pdf', '.doc', '.docx'],
  IMAGES: ['.jpg', '.jpeg', '.png'],
  CODE: ['.js', '.ts', '.go', '.java', '.py']
}

export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB