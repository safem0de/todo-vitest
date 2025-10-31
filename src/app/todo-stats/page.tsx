'use client'

import { useEffect, useState } from 'react'
import { useTodoStore } from '@/store/todoStore'
import AddTodoForm from '@/components/AddTodoForm'
import TodoList from '@/components/TodoList'

export default function TodoStatsPage() {
    const todos = useTodoStore((state) => state.todos)
    const [count, setCount] = useState(0)

    const handleAdd = (text: string) => {
        useTodoStore.getState().add(text)
    }

    const handleToggle = (id: number) => {
        useTodoStore.getState().toggle(id)
    }

    const handleRemove = (id: number) => {
        useTodoStore.getState().remove(id)
    }

    // sync local state เมื่อ store เปลี่ยน
    useEffect(() => {
        setCount(todos.length)
        console.log('Todos updated:', todos)
    }, [todos])

    return (
        <main className="flex flex-col items-center justify-start min-h-screen p-8 bg-gray-50">
            <h1 className="text-2xl font-bold mb-4 text-black">📊 Todo Stats</h1>
            <p className="text-black text-lg">จำนวนงานทั้งหมด: {count}</p>

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
