import { apiClient } from '@/source/services/api';
import { Todo, CreateTodoDTO, UpdateTodoDTO } from '../types/todo.types';

export const TodoAPI = {
  getTodos: async (): Promise<Todo[]> => {
    const response = await apiClient.get<Todo[]>('/todos');
    console.log("todo response : ", response.data);
    return response.data;
  },
  
  getTodoById: async (id: string): Promise<Todo> => {
    const response = await apiClient.get<Todo>(`/todos/${id}`);
    return response.data;
  },

  createTodo: async (data: CreateTodoDTO): Promise<Todo> => {
    // DummyJSON uses /todos/add for creating new items
    const response = await apiClient.post<Todo>('/todos', data);
    console.log(response.data);
    return response.data;
  },

  updateTodo: async (id: string, data: UpdateTodoDTO): Promise<Todo> => {
    const response = await apiClient.put<Todo>(`/todos/${id}`, data);
    return response.data;
  },

  deleteTodo: async (id: string): Promise<void> => {
    await apiClient.delete(`/todos/${id}`);
  }
}
