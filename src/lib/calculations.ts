// src/lib/calculations.ts
import type { Todo } from '@/types/todo'

export function addTodo(todos: Todo[], text: string): Todo[] {
  if (!text.trim()) return todos
  return [...todos, { id: Date.now(), text, done: false }]
}

export function removeTodo(todos: Todo[], id: number): Todo[] {
  return todos.filter(t => t.id !== id)
}

export function toggleDone(todos: Todo[], id: number): Todo[] {
  return todos.map(t => (t.id === id ? { ...t, done: !t.done } : t))
}