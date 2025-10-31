'use client'

import { useState } from 'react'
import AddTodoForm from '@/components/AddTodoForm'
import type { Todo } from '@/types/todo'
import { addTodo, removeTodo, toggleDone } from '@/lib/calculations'
import TodoList from '@/components/TodoList'

export default function HomePage() {
  const [todos, setTodos] = useState<Todo[]>([])

  // 🧩 1️⃣ handler สำหรับเพิ่ม to-do
  const handleAdd = (text: string) => {
    setTodos(prev => addTodo(prev, text))
  }

  // 🧩 2️⃣ handler สำหรับ toggle สถานะ done
  const handleToggle = (id: number) => {
    setTodos(prev => toggleDone(prev, id))
  }

  // 🧩 3️⃣ handler สำหรับลบ to-do
  const handleRemove = (id: number) => {
    setTodos(prev => removeTodo(prev, id))
  }

  return (
    <main className="flex flex-col items-center justify-start min-h-screen p-8 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4 text-black">✅ Todo Playground</h1>

      {/* Add Form */}
      <AddTodoForm onAdd={handleAdd} />

      {/* List */}
      <TodoList
        todos={todos}
        onToggle={handleToggle}
        onRemove={handleRemove}
      />
    </main>
  )
}
