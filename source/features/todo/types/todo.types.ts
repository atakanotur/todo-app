export interface Todo {
  id: string
  title: string
  description: string | null
  completed: boolean
  userId: string
  createdAt: string 
  updatedAt: string
}

export interface CreateTodoDTO {
  todo: string
  completed: boolean
  userId: number
}

export interface UpdateTodoDTO {
  todo?: string
  completed?: boolean
}
