import { apiClient } from '@/source/services/api';
import { Todo, CreateTodoDTO, UpdateTodoDTO, DummyJsonTodosResponse } from '../types/todo.types';

export const TodoAPI = {
  getTodos: async (): Promise<Todo[]> => {
    const response = await apiClient.get<DummyJsonTodosResponse>('/todos');
    return response.data.todos;
  },
  
  getTodoById: async (id: number): Promise<Todo> => {
    const response = await apiClient.get<Todo>(`/todos/${id}`);
    return response.data;
  },

  createTodo: async (data: CreateTodoDTO): Promise<Todo> => {
    // DummyJSON uses /todos/add for creating new items
    const response = await apiClient.post<Todo>('/todos/add', data);
    console.log(response.data);
    return response.data;
  },

  updateTodo: async (id: number, data: UpdateTodoDTO): Promise<Todo> => {
    const response = await apiClient.put<Todo>(`/todos/${id}`, data);
    return response.data;
  },

  deleteTodo: async (id: number): Promise<void> => {
    await apiClient.delete(`/todos/${id}`);
  }
}
