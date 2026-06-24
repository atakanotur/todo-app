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
  title: string
  description?: string
  completed?: boolean
}

export interface UpdateTodoDTO {
  title?: string
  description?: string
  completed?: boolean
}
