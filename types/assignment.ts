export interface BaseAssignment {
  id: number
  moduleId: number
  type: AssignmentType
  title: string
  description: string
  dueDate: string
  status: SubmissionStatus
}

export type AssignmentType = 'TP' | 'TA' | 'Jurnal'
export type SubmissionStatus = 'pending' | 'submitted' | 'graded'

export interface TPAssignment extends BaseAssignment {
  type: 'TP'
  fileUrl?: string
}

export interface TAAssignment extends BaseAssignment {
  type: 'TA'
  questions: TAQuestion[]
}

export interface JurnalAssignment extends BaseAssignment {
  type: 'Jurnal'
  instructions: JurnalInstruction[]
}

export interface TAQuestion {
  id: number
  text: string
  options: string[]
  correctOption?: string
}

export interface JurnalInstruction {
  id: number
  question: string
  expectedAnswer?: string
}