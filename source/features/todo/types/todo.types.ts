export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

export interface DummyJsonTodosResponse {
  todos: Todo[];
  total: number;
  skip: number;
  limit: number;
}

export interface CreateTodoDTO {
  todo: string;
  completed: boolean;
  userId: number;
}

export interface UpdateTodoDTO {
  todo?: string;
  completed?: boolean;
}
