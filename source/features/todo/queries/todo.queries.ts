import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { TodoAPI } from '../api/todo.api'
import { CreateTodoDTO, UpdateTodoDTO } from '../types/todo.types'

import { useTodoStore } from '../store/todo.store'

export const TODO_KEYS = {
  all: ['todos'] as const,
  lists: () => [...TODO_KEYS.all, 'list'] as const,
  detail: (id: string) => [...TODO_KEYS.all, 'detail', id] as const,
}

export const useTodos = () => {
  const searchQuery = useTodoStore((state) => state.searchQuery)
  const statusFilter = useTodoStore((state) => state.statusFilter)

  return useQuery({
    queryKey: TODO_KEYS.lists(),
    queryFn: TodoAPI.getTodos,
    select: (todos) => {
      return todos.filter((item) => {
        const matchesSearch = item.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase())

        const matchesStatus =
          statusFilter === 'all'
            ? true
            : statusFilter === 'completed'
            ? item.completed
            : !item.completed

        return matchesSearch && matchesStatus
      })
    },
  })
}

export const useTodo = (id: string) => {
  return useQuery({
    queryKey: TODO_KEYS.detail(id),
    queryFn: () => TodoAPI.getTodoById(id),
    enabled: !!id,
  })
}

export const useCreateTodo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateTodoDTO) => TodoAPI.createTodo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TODO_KEYS.lists() })
    },
  })
}

export const useUpdateTodo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTodoDTO }) =>
      TodoAPI.updateTodo(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: TODO_KEYS.lists() })
      queryClient.invalidateQueries({
        queryKey: TODO_KEYS.detail(variables.id),
      })
    },
  })
}

export const useDeleteTodo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => TodoAPI.deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TODO_KEYS.lists() })
    },
  })
}
