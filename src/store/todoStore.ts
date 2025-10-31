// src/store/todoStore.ts
import { create } from 'zustand'
import { Todo } from '@/types/todo'

interface TodoState {
    todos: Todo[]
    add: (text: string) => void
    toggle: (id: number) => void
    remove: (id: number) => void
}

export const useTodoStore = create<TodoState>((set) => ({
    todos: [],
    add: (text) =>
        set((state) => ({
            todos: [
                ...state.todos,
                { id: Date.now(), text, done: false },
            ],
        })),
    toggle: (id) =>
        set((state) => ({
            todos: state.todos.map((todo) =>
                todo.id === id ? { ...todo, done: !todo.done } : todo
            ),
        })),
    remove: (id) =>
        set((state) =>
        ({
            todos: state.todos.filter((todo) => todo.id !== id),
        })),
}))
