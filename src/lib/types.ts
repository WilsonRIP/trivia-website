export interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number // Index of the correct answer in options array
}

export interface Category {
  id: string
  title: string
  description: string
  icon: string
  questions: Question[]
}

export interface QuizResult {
  categoryId: string
  score: number
  totalQuestions: number
  timeSpent: number // in seconds
  date: string
}
