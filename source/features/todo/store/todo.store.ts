import { create } from 'zustand';

export type TodoStatusFilter = 'all' | 'completed' | 'pending';

interface TodoState {
  searchQuery: string;
  statusFilter: TodoStatusFilter;
  
  setSearchQuery: (query: string) => void;
  setStatusFilter: (status: TodoStatusFilter) => void;
  resetFilters: () => void;
}

export const useTodoStore = create<TodoState>((set) => ({
  searchQuery: '',
  statusFilter: 'all',

  setSearchQuery: (query) => set({ searchQuery: query }),
  setStatusFilter: (status) => set({ statusFilter: status }),
  resetFilters: () => set({
    searchQuery: '',
    statusFilter: 'all',
  }),
}));
