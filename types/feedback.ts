export interface Feedback {
  id: number
  moduleId: number
  userId: number
  userName: string
  rating: number
  comment: string
  createdAt: string
  updatedAt: string
}

export interface FeedbackInput {
  moduleId: number
  rating: number
  comment: string
}