'use client'

import { useState } from 'react'
import AddTodoForm from '@/components/AddTodoForm'
import type { Todo } from '@/types/todo'
import { addTodo, removeTodo, toggleDone } from '@/lib/calculations'

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
      <ul className="mt-6 w-full max-w-md">
        {todos.length === 0 && (
          <p className="text-black text-center">ยังไม่มีงานใด ๆ</p>
        )}
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center bg-white rounded-lg p-2 mb-2 border"
          >
            <button
              onClick={() => handleToggle(todo.id)}
              className={`flex-1 text-left cursor-pointer bg-transparent border-0 p-0 ${todo.done ? 'line-through text-gray-600 opacity-80' : 'text-gray-900 hover:text-blue-600'
                }`}
            >
              {todo.text}
            </button>
            <button
              aria-label={`remove-${todo.id}`}
              className="text-red-500 hover:text-red-700 ml-2"
              onClick={() => handleRemove(todo.id)}
            >
              ✖
            </button>
          </li>
        ))}
      </ul>
    </main>
  )
}
