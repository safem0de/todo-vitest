'use client';

import { Todo } from "@/types/todo";

interface TodoItemProps {
    todo: Todo
    onToggle: (id: number) => void
    onRemove: (id: number) => void
}

export default function TodoItem({ todo, onToggle, onRemove }: Readonly<TodoItemProps>) {
    return (
        <li
            key={todo.id} 
            className="flex justify-between items-center bg-white rounded-lg p-2 mb-2 border"
        >
            <button
                onClick={() => onToggle(todo.id)}
                className={`flex-1 text-left cursor-pointer bg-transparent border-0 p-0 ${todo.done ? 'line-through text-gray-600 opacity-80' : 'text-gray-900 hover:text-blue-600'
                    }`}
            >
                {todo.text}
            </button>
            <button
                aria-label={`remove-${todo.id}`}
                className="text-red-500 hover:text-red-700 ml-2"
                onClick={() => onRemove(todo.id)}
            >
                ✖
            </button>
        </li>
    )
}