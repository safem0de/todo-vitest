'use client';

import { Todo } from "@/types/todo";
import TodoItem from "./TodoItem";

interface TodoListProps {
    todos: Readonly<Todo[]>;
    onToggle: (id: number) => void;
    onRemove: (id: number) => void;
}

export default function TodoList({ todos, onToggle, onRemove }: Readonly<TodoListProps>) {
    return (
        <ul className="mt-6 w-full max-w-md">
            {todos.length === 0 && (
                <p className="text-black text-center">ยังไม่มีงานใด ๆ</p>
            )}

            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle}
                    onRemove={onRemove}
                />
            ))}
        </ul>
    )
}